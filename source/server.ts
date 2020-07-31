#!/usr/bin/env node

import * as libfs from "fs";
import * as libhttp from "http";
import * as libhttps from "https";
import * as libpath from "path";
import * as liburl from "url";
import * as api from "./api";
import * as auth from "./auth";
import * as channels from "./channels";
import * as data from "./data";
import * as subsearch from "./subsearch";
import { FileEntry, CueEntry } from "./database";

let filter_headers = (headers: libhttp.IncomingHttpHeaders, keys: Array<string>): Partial<libhttp.IncomingHttpHeaders> => {
	let out: Partial<libhttp.IncomingHttpHeaders> = {};
	for (let key in headers) {
		if (keys.indexOf(key) >= 0) {
			out[key] = headers[key];
		}
	}
	return out;
};

let send_data = (file_id: string, request: libhttp.IncomingMessage, response: libhttp.ServerResponse): void => {
	if (request.url === undefined) {
		throw new Error();
	}
	let username = "";
	try {
		var url = liburl.parse(request.url, true);
		username = auth.getUsername(url.query.token as string);
	} catch (error) {
		response.writeHead(401, {});
		return response.end();
	}
	let file = data.files_index[file_id] as FileEntry;
	let path = file.path;
	let mime = file.mime;
	let filename = path.join(libpath.sep);
	let fd = libfs.openSync(filename, 'r');
	let size = libfs.fstatSync(fd).size;
	libfs.closeSync(fd);
	let parts2;
	let range = request.headers.range;
	if (range !== undefined && (parts2 = /^bytes\=((?:[0-9])|(?:[1-9][0-9]+))\-((?:[0-9])|(?:[1-9][0-9]+))?$/.exec(range)) != null) {
		let offset = parseInt(parts2[1]);
		let offset2 = parts2[2] ? parseInt(parts2[2]) : null;
		if (offset2 === null) {
			offset2 = size - 1;
		}
		if (offset >= size || offset2 >= size || offset2 < offset) {
			response.writeHead(416);
			response.end();
			return;
		}
		let length = offset2 - offset + 1;
		response.writeHead(206, {
			'Access-Control-Allow-Origin': '*',
			'Accept-Ranges': `bytes`,
			'Content-Range': `bytes ${offset}-${offset2}/${size}`,
			'Content-Type': mime,
			'Content-Length': `${length}`
		});
		var s = libfs.createReadStream(filename, {
			start: offset,
			end: offset2
		});
		s.addListener("close", () => {
			if (offset + s.bytesRead === size) {
				data.addStream(username, file_id);
			}
		});
		s.on('open', function () {
			s.pipe(response);
		});
		s.on('error', function (error) {
			response.end();
		});
	} else {
		var s = libfs.createReadStream(filename);
		s.on('open', function () {
			response.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Accept-Ranges': `bytes`,
				'Content-Type': mime,
				'Content-Length': `${size}`
			});
			s.pipe(response);
		});
		s.on('error', function (error) {
			response.writeHead(404, {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'text/plain'
			});
			response.end();
		});
	}
};

function requestHandler(request: libhttp.IncomingMessage, response: libhttp.ServerResponse): void {
	let host = request.headers["host"] || "";
	let method = request.method || "";
	let path = request.url || "";
	console.log(`${new Date().toUTCString()}:${method}:${path}`, JSON.stringify(filter_headers(request.headers, ['host', 'range']), null, "\t"));
	if (/^[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+(:[0-9]+)?$/.test(host)) {
		console.log('dropped', JSON.stringify(request.headers, null, "\t"));
		response.writeHead(400);
		response.end();
		return;
	}
	let parts: RegExpExecArray | null;
	if (method === 'GET' && path === '/favicon.ico') {
		response.writeHead(404);
		response.end();
		return;
	}
	if (method === 'GET' && (parts = /^[/]files[/]([0-9a-f]{32})[/]/.exec(path)) !== null) {
		let file_id = parts[1];
		return send_data(file_id, request, response);
	}
	if (/^[/]media[/]/.test(path)) {
		if ((parts = /^[/]media[/]gifs[/]([0-9a-f]{32})[/]/.exec(path)) != null) {
			let cue_id = parts[1];
			let cue = data.cues_index[cue_id] as CueEntry;
			let filename = [".", "private", "memes", cue.cue_id];
			if (libfs.existsSync(filename.join("/"))) {
				let stream = libfs.createReadStream(filename.join("/"));
				stream.on("open", () => {
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "image/gif"
					});
					stream.pipe(response);
				});
			} else {
				subsearch.generateMeme(filename, cue, () => {
					if (!libfs.existsSync(filename.join("/"))) {
						response.writeHead(500);
						return response.end();
					}
					let stream = libfs.createReadStream(filename.join("/"));
					stream.on("open", () => {
						response.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "image/gif"
						});
						stream.pipe(response);
					});
				});
			}
			return;
		}
		if (/^[/]media[/]channels[/]/.test(path)) {
			let token = liburl.parse(request.url || "/", true).query.token as string;
			channels.handleRequest(token, request, response);
			return;
		}
	}
	if (/^[/]api[/]/.test(path)) {
		return api.handleRequest(request, response);
	}
	if (method === 'GET') {
		response.writeHead(200);
		response.end(`<!doctype html><html><head><base href="/"/><meta charset="utf-8"/><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" name="viewport"/></head><body><script>${libfs.readFileSync('./build/client.bundle.js')}</script></body></html>`);
		return;
	}
	console.log('unhandled', JSON.stringify(request.headers, null, "\t"));
	response.writeHead(400);
	response.end();
	return;
}

if (!libfs.existsSync("./private/certs/")) {
	libfs.mkdirSync("./private/certs/", { recursive: true });
}

function read(path: string): Buffer | undefined {
	if (libfs.existsSync(path)) {
		return libfs.readFileSync(path);
	}
	return undefined;
}

let full_chain = read("./private/certs/full_chain.pem");
let dhparam = read("./private/certs/dhparam.pem");
let certificate_key = read("./private/certs/certificate_key.pem");

if (full_chain && certificate_key) {
	let server = libhttps.createServer({
		cert: full_chain,
		dhparam: dhparam,
		key: certificate_key
	}, requestHandler);
	server.listen(443, () => {
		console.log("https://localhost:443");
	});
} else {
	let server = libhttp.createServer({}, requestHandler);
	server.listen(80, () => {
		console.log("http://localhost:80");
	});
}