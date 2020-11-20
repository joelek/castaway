import * as libhttp from "http";
import * as auth from "../server/auth";
import * as is from "../is";
import * as messages from "./messages";
import * as shared from "./shared";
import * as indexer from "./indexer";
import * as typesockets from "../typesockets/";

export function makeServerDatabase(): shared.Tables {
	return {
		albums: indexer.albums,
		album_artists: indexer.album_artists,
		album_files: indexer.album_files,
		audio_files: indexer.audio_files,
		artists: indexer.artists,
		cues: indexer.cues,
		directories: indexer.directories,
		discs: indexer.discs,
		episodes: indexer.episodes,
		episode_files: indexer.episode_files,
		genres: indexer.genres,
		files: indexer.files,
		image_files: indexer.image_files,
		keys: indexer.keys,
		metadata_files: indexer.metadata_files,
		movies: indexer.movies,
		movie_files: indexer.movie_files,
		movie_genres: indexer.movie_genres,
		movie_persons: indexer.movie_persons,
		persons: indexer.persons,
		playlists: indexer.playlists,
		playlist_items: indexer.playlist_items,
		seasons: indexer.seasons,
		shows: indexer.shows,
		show_files: indexer.show_files,
		show_genres: indexer.show_genres,
		show_persons: indexer.show_persons,
		streams: indexer.streams,
		subtitles: indexer.subtitles,
		subtitle_files: indexer.subtitle_files,
		tokens: indexer.tokens,
		tracks: indexer.tracks,
		track_artists: indexer.track_artists,
		track_files: indexer.track_files,
		users: indexer.users,
		video_files: indexer.video_files,
		video_subtitles: indexer.video_subtitles
	};
};

type Session = {
	connections: Set<string>
};

export class DatabaseServer {
	private tables: shared.Tables;
	private tss: typesockets.TypeSocketServer<messages.Autoguard>;
	private tokens = new Map<string, string>();
	private sessions = new Map<string, Session>();

	private getOrCreateSession(user_id: string): Session {
		let session = this.sessions.get(user_id);
		if (is.present(session)) {
			return session;
		}
		session = {
			connections: new Set<string>()
		};
		this.sessions.set(user_id, session);
		return session;
	}

	private revokeAuthentication(connection_id: string): void {
		let token = this.tokens.get(connection_id);
		this.tokens.delete(connection_id);
		if (is.present(token)) {
			let user_id = auth.getUserId(token);
			let session = this.sessions.get(user_id);
			if (is.present(session)) {
				let connections = session.connections;
				connections.delete(connection_id);
			}
		}
	}

	constructor() {
		this.tables = makeServerDatabase();
		this.tss = new typesockets.TypeSocketServer(messages.Autoguard);
		this.tss.addEventListener("sys", "connect", (message) => {
		});
		this.tss.addEventListener("sys", "disconnect", (message) => {
			this.revokeAuthentication(message.connection_id);
		});
		this.tss.addEventListener("app", "SetToken", (message) => {
			this.revokeAuthentication(message.connection_id);
			let token = message.data.token;
			if (is.present(token)) {
				let user_id = auth.getUserId(token);
				this.tokens.set(message.connection_id, token);
				let session = this.getOrCreateSession(user_id);
				session.connections.add(message.connection_id);
			}
		});
		this.tss.addEventListener("app", "PlaylistRequest", (message) => {
			let token = this.tokens.get(message.connection_id);
			if (is.present(token)) {
				let user_id = auth.getUserId(token);
				this.tss.respond(message, "PlaylistResponse", this.tables.playlists.lookup(message.data));
			}
		});
		this.tss.addEventListener("app", "PlaylistItemRequest", (message) => {
			let token = this.tokens.get(message.connection_id);
			if (is.present(token)) {
				let user_id = auth.getUserId(token);
				this.tss.respond(message, "PlaylistItemResponse", this.tables.playlist_items.lookup(message.data));
			}
		});
	}

	getRequestHandler(): libhttp.RequestListener {
		return this.tss.getRequestHandler();
	}
};
