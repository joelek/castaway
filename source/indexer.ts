import * as libcrypto from "crypto";
import * as libfs from "fs";
import * as autoguard from "@joelek/ts-autoguard";
import * as databases from "./databases";
import * as indices from "./indices";
import * as is from "./is";
import * as passwords from "./passwords";
import * as probes from "./probes";
import { Directory, File } from "./databases/media";

function wordify(string: string): Array<string> {
	return string
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\|\/\\\_\-]/g, " ")
		.replace(/[^a-z0-9 ]/g, "")
		.trim()
		.split(/[ ]+/g);
}

function makeId(...components: Array<string | undefined>): string {
	components = components
		.map((component) => wordify(component ?? ""))
		.map((words) => {
			return words.join(" ");
		});
	return libcrypto.createHash("sha256")
		.update(components.join("\0"))
		.digest("hex")
		.slice(0, 32);
}

const MEDIA_ROOT = [
	".",
	"private",
	"media"
];

if (!libfs.existsSync(MEDIA_ROOT.join("/"))) {
	libfs.mkdirSync(MEDIA_ROOT.join("/"));
}

const TABLES_ROOT = [
	".",
	"private",
	"tables"
];

if (!libfs.existsSync(TABLES_ROOT.join("/"))) {
	libfs.mkdirSync(TABLES_ROOT.join("/"));
}

function loadIndex<A>(name: string, guard: autoguard.serialization.MessageGuard<A>, getKey: (record: A) => string): indices.RecordIndex<A> {
	let path = [
		...TABLES_ROOT,
		`${name}.json`
	].join("/");
	if (!libfs.existsSync(path)) {
		libfs.writeFileSync(path, JSON.stringify([], null, "\t"));
	}
	let json = JSON.parse(libfs.readFileSync(path, "utf-8"));
	let records = autoguard.guards.Array.of(guard).as(json);
	return indices.RecordIndex.from(records, getKey);
}

function saveIndex<A>(name: string, index: indices.RecordIndex<A>): void {
	let records = Array.from(index);
	let path = [
		...TABLES_ROOT,
		`${name}.json`
	].join("/");
	libfs.writeFileSync(path, JSON.stringify(records, null, "\t"));
}

export const directories = loadIndex("directories", databases.media.Directory, (record) => record.directory_id);
export const getDirectoriesFromDirectory = indices.CollectionIndex.fromIndex(directories, directories, (record) => record.directory_id, (record) => record.parent_directory_id);
export const files = loadIndex("files", databases.media.File, (record) => record.file_id);
export const getFilesFromDirectory = indices.CollectionIndex.fromIndex(directories, files, (record) => record.directory_id, (record) => record.parent_directory_id);
export const audio_streams = loadIndex("audio_streams", databases.media.AudioStream, (record) => record.audio_stream_id);
export const getAudioStreamsFromFile = indices.CollectionIndex.fromIndex(files, audio_streams, (record) => record.file_id, (record) => record.file_id);
export const image_streams = loadIndex("image_streams", databases.media.ImageStream, (record) => record.image_stream_id);
export const getImageStreamsFromFile = indices.CollectionIndex.fromIndex(files, image_streams, (record) => record.file_id, (record) => record.file_id);
export const subtitle_streams = loadIndex("subtitle_streams", databases.media.SubtitleStream, (record) => record.subtitle_stream_id);
export const getSubtitleStreamsFromFile = indices.CollectionIndex.fromIndex(files, subtitle_streams, (record) => record.file_id, (record) => record.file_id);
export const video_streams = loadIndex("video_streams", databases.media.VideoStream, (record) => record.video_stream_id);
export const getVideoStreamsFromFile = indices.CollectionIndex.fromIndex(files, video_streams, (record) => record.file_id, (record) => record.file_id);
export const artists = loadIndex("artists", databases.media.Artist, (record) => record.artist_id);
export const albums = loadIndex("albums", databases.media.Album, (record) => record.album_id);
export const album_files = loadIndex("album_files", databases.media.AlbumFile, (record) => [record.album_id, record.file_id].join("\0"));
export const getFilesFromAlbum = indices.CollectionIndex.fromIndex(files, album_files, (record) => record.file_id, (record) => record.file_id);
export const getAlbumsFromFile = indices.CollectionIndex.fromIndex(albums, album_files, (record) => record.album_id, (record) => record.album_id);
export const discs = loadIndex("discs", databases.media.Disc, (record) => record.disc_id);
export const getDiscsFromAlbum = indices.CollectionIndex.fromIndex(albums, discs, (record) => record.album_id, (record) => record.album_id);
export const tracks = loadIndex("tracks", databases.media.Track, (record) => record.track_id);
export const getTracksFromDisc = indices.CollectionIndex.fromIndex(discs, tracks, (record) => record.disc_id, (record) => record.disc_id);
export const track_files = loadIndex("track_files", databases.media.TrackFile, (record) => [record.track_id, record.file_id].join("\0"));
export const getTracksFromFile = indices.CollectionIndex.fromIndex(files, track_files, (record) => record.file_id, (record) => record.file_id);
export const getFilesFromTrack = indices.CollectionIndex.fromIndex(tracks, track_files, (record) => record.track_id, (record) => record.track_id);
export const album_artists = loadIndex("album_artists", databases.media.AlbumArtist, (record) => [record.album_id, record.artist_id].join("\0"));
export const getArtistsFromAlbum = indices.CollectionIndex.fromIndex(albums, album_artists, (record) => record.album_id, (record) => record.album_id);
export const getAlbumsFromArtist = indices.CollectionIndex.fromIndex(artists, album_artists, (record) => record.artist_id, (record) => record.artist_id);
export const track_artists = loadIndex("track_artists", databases.media.TrackArtist, (record) => [record.track_id, record.artist_id].join("\0"));
export const getArtistsFromTrack = indices.CollectionIndex.fromIndex(tracks, track_artists, (record) => record.track_id, (record) => record.track_id);
export const getTrackFromArtist = indices.CollectionIndex.fromIndex(artists, track_artists, (record) => record.artist_id, (record) => record.artist_id);
export const shows = loadIndex("shows", databases.media.Show, (record) => record.show_id);
export const show_files = loadIndex("show_files", databases.media.ShowFile, (record) => [record.show_id, record.file_id].join("\0"));
export const getShowsFromFile = indices.CollectionIndex.fromIndex(files, show_files, (record) => record.file_id, (record) => record.file_id);
export const getFilesFromShow = indices.CollectionIndex.fromIndex(shows, show_files, (record) => record.show_id, (record) => record.show_id);
export const seasons = loadIndex("seasons", databases.media.Season, (record) => record.season_id);
export const getSeasonsFromShow = indices.CollectionIndex.fromIndex(shows, seasons, (record) => record.show_id, (record) => record.show_id);
export const episodes = loadIndex("episodes", databases.media.Episode, (record) => record.episode_id);
export const getEpisodesFromSeason = indices.CollectionIndex.fromIndex(seasons, episodes, (record) => record.season_id, (record) => record.season_id);
export const episode_files = loadIndex("episode_files", databases.media.EpisodeFile, (record) => [record.episode_id, record.file_id].join("\0"));
export const getEpisodesFromFile = indices.CollectionIndex.fromIndex(files, episode_files, (record) => record.file_id, (record) => record.file_id);
export const getFilesFromEpisode = indices.CollectionIndex.fromIndex(episodes, episode_files, (record) => record.episode_id, (record) => record.episode_id);
export const movies = loadIndex("movies", databases.media.Movie, (record) => record.movie_id);
export const movie_files = loadIndex("movie_files", databases.media.MovieFile, (record) => [record.movie_id, record.file_id].join("\0"));
export const getMoviesFromFile = indices.CollectionIndex.fromIndex(files, movie_files, (record) => record.file_id, (record) => record.file_id);
export const getFilesFromMovie = indices.CollectionIndex.fromIndex(movies, movie_files, (record) => record.movie_id, (record) => record.movie_id);
export const persons = loadIndex("persons", databases.media.Person, (record) => record.person_id);
export const movie_persons = loadIndex("movie_persons", databases.media.MoviePerson, (record) => [record.movie_id, record.person_id].join("\0"));
export const getMoviesFromPerson = indices.CollectionIndex.fromIndex(persons, movie_persons, (record) => record.person_id, (record) => record.person_id);
export const getPersonsFromMovie = indices.CollectionIndex.fromIndex(movies, movie_persons, (record) => record.movie_id, (record) => record.movie_id);
export const show_persons = loadIndex("show_persons", databases.media.ShowPerson, (record) => [record.show_id, record.person_id].join("\0"));
export const getShowsFromPerson = indices.CollectionIndex.fromIndex(persons, show_persons, (record) => record.person_id, (record) => record.person_id);
export const getPersonsFromShow = indices.CollectionIndex.fromIndex(shows, show_persons, (record) => record.show_id, (record) => record.show_id);
export const genres = loadIndex("genres", databases.media.Genre, (record) => record.genre_id);
export const movie_genres = loadIndex("movie_genres", databases.media.MovieGenre, (record) => [record.movie_id, record.genre_id].join("\0"));
export const getMoviesFromGenre = indices.CollectionIndex.fromIndex(genres, movie_genres, (record) => record.genre_id, (record) => record.genre_id);
export const getGenresFromMovie = indices.CollectionIndex.fromIndex(movies, movie_genres, (record) => record.movie_id, (record) => record.movie_id);
export const show_genres = loadIndex("show_genres", databases.media.ShowGenre, (record) => [record.show_id, record.genre_id].join("\0"));
export const getShowsFromGenre = indices.CollectionIndex.fromIndex(genres, show_genres, (record) => record.genre_id, (record) => record.genre_id);
export const getGenresFromShow = indices.CollectionIndex.fromIndex(shows, show_genres, (record) => record.show_id, (record) => record.show_id);
export const cues = loadIndex("cues", databases.media.Cue, (record) => record.cue_id);
export const getCuesFromSubtitleStream = indices.CollectionIndex.fromIndex(subtitle_streams, cues, (record) => record.subtitle_stream_id, (record) => record.subtitle_stream_id);
export const users = loadIndex("users", databases.media.User, (record) => record.user_id);
export const tokens = loadIndex("tokens", databases.media.Token, (record) => record.token_id);
export const getTokensFromUser = indices.CollectionIndex.fromIndex(users, tokens, (record) => record.user_id, (record) => record.user_id);
export const streams = loadIndex("streams", databases.media.Stream, (record) => record.stream_id);
export const getStreamsFromUser = indices.CollectionIndex.fromIndex(users, streams, (record) => record.user_id, (record) => record.user_id);
export const getStreamsFromFile = indices.CollectionIndex.fromIndex(files, streams, (record) => record.file_id, (record) => record.file_id);
export const playlists = loadIndex("playlists", databases.media.Playlist, (record) => record.playlist_id);
export const getPlaylistsFromUser = indices.CollectionIndex.fromIndex(users, playlists, (record) => record.user_id, (record) => record.user_id);
export const playlist_items = loadIndex("playlist_items", databases.media.PlaylistItem, (record) => record.playlist_item_id);
export const getPlaylistsItemsFromPlaylist = indices.CollectionIndex.fromIndex(playlists, playlist_items, (record) => record.playlist_id, (record) => record.playlist_id);
export const getPlaylistItemsFromTrack = indices.CollectionIndex.fromIndex(tracks, playlist_items, (record) => record.track_id, (record) => record.track_id);

users.on("*", () => {
	saveIndex("users", users);
});

tokens.on("*", () => {
	saveIndex("tokens", tokens);
});

streams.on("*", () => {
	saveIndex("streams", streams);
});

playlists.on("*", () => {
	saveIndex("playlists", playlists);
});

playlist_items.on("*", () => {
	saveIndex("playlist_items", playlist_items);
});

if (users.length() === 0) {
	users.insert({
		user_id: makeId("user", libcrypto.randomBytes(16).toString("hex")),
		name: "Test User",
		username: "test",
		password: passwords.generate("test")
	});
}

export const album_search = indices.SearchIndex.fromIndex(albums, (entry) => [entry.title]);
export const artist_search = indices.SearchIndex.fromIndex(artists, (entry) => [entry.name]);
export const cue_search = indices.SearchIndex.fromIndex(cues, (entry) => entry.lines);
export const episode_search = indices.SearchIndex.fromIndex(episodes, (entry) => [entry.title]);
export const genre_search = indices.SearchIndex.fromIndex(genres, (entry) => [entry.name]);
export const movie_search = indices.SearchIndex.fromIndex(movies, (entry) => [entry.title]);
export const person_search = indices.SearchIndex.fromIndex(persons, (entry) => [entry.name]);
export const playlist_search = indices.SearchIndex.fromIndex(playlists, (entry) => [entry.title]);
export const shows_search = indices.SearchIndex.fromIndex(shows, (entry) => [entry.name]);
export const track_search = indices.SearchIndex.fromIndex(tracks, (entry) => [entry.title]);
export const user_search = indices.SearchIndex.fromIndex(users, (entry) => [entry.name, entry.username]);

function getPath(entry: Directory | File): Array<string> {
	let path = new Array<string>();
	while (true) {
		path.unshift(entry.name);
		let parent_directory_id = entry.parent_directory_id;
		if (is.absent(parent_directory_id)) {
			break;
		}
		entry = directories.lookup(parent_directory_id);
	}
	return [...MEDIA_ROOT, ...path];
}

function getDirectoryPath(directory: Directory): Array<string> {
	return getPath(directory);
}

function getFilePath(file: File): Array<string> {
	return getPath(file);
}

function checkFile(root: File): void {
	let path = getFilePath(root).join("/");
	if (libfs.existsSync(path)) {
		let stats = libfs.statSync(path);
		if (stats.isFile()) {
			if (stats.mtime.valueOf() === root.index_timestamp) {
				return;
			}
		}
	}
	files.remove(root);
}

function checkDirectory(root: Directory): void {
	let path = getDirectoryPath(root).join("/");
	if (libfs.existsSync(path)) {
		let stats = libfs.statSync(path);
		if (stats.isDirectory()) {
			for (let directory of getDirectoriesFromDirectory.lookup(root.directory_id)) {
				checkDirectory(directory);
			}
			for (let file of getFilesFromDirectory.lookup(root.directory_id)) {
				checkFile(file);
			}
			return;
		}
	}
	directories.remove(root);
}

function visitDirectory(path: Array<string>, parent_directory_id?: string): void {
	let dirents = libfs.readdirSync(path.join("/"), { withFileTypes: true });
	for (let dirent of dirents) {
		let name = dirent.name;
		if (dirent.isDirectory()) {
			let directory_id = makeId("directory", parent_directory_id, name);
			try {
				directories.lookup(directory_id);
			} catch (error) {
				directories.insert({
					directory_id,
					name,
					parent_directory_id
				});
			}
			visitDirectory([...path, dirent.name], directory_id);
		} else if (dirent.isFile()) {
			let file_id = makeId("file", parent_directory_id, name);
			try {
				files.lookup(file_id);
			} catch (error) {
				let mime = "application/octet-stream";
				files.insert({
					file_id,
					name,
					mime,
					parent_directory_id
				});
			}
		}
	}
}

function indexMetadata(probe: probes.schema.Probe, ...file_ids: Array<string>): void {
	let metadata = probe.metadata;
	if (probes.schema.EpisodeMetadata.is(metadata)) {
		let show_id = makeId("show", metadata.show.title);
		shows.insert({
			show_id: show_id,
			name: metadata.show.title,
			summary: metadata.show.summary
		}, "combine");
		let season_id = makeId("season", show_id, `${metadata.season}`);
		seasons.insert({
			season_id: season_id,
			show_id: show_id,
			number: metadata.season
		}, "combine");
		let episode_id = makeId("episode", season_id, `${metadata.episode}`);
		episodes.insert({
			episode_id: episode_id,
			season_id: season_id,
			title: metadata.title,
			number: metadata.episode,
			year: metadata.year,
			summary: metadata.summary
		}, "combine");
		for (let file_id of file_ids) {
			episode_files.insert({
				episode_id: episode_id,
				file_id: file_id
			}, "combine");
		}
		for (let [index, actor] of metadata.show.actors.entries()) {
			let person_id = makeId("person", actor);
			persons.insert({
				person_id: person_id,
				name: actor
			}, "combine");
			show_persons.insert({
				person_id: person_id,
				show_id: show_id,
				order: index
			}, "combine");
		}
		for (let [index, genre] of metadata.show.genres.entries()) {
			let genre_id = makeId("genre", genre);
			genres.insert({
				genre_id: genre_id,
				name: genre
			}, "combine");
			show_genres.insert({
				genre_id: genre_id,
				show_id: show_id,
				order: index
			}, "combine");
		}
	} else if (probes.schema.MovieMetadata.is(metadata)) {
		let movie_id = makeId("movie", metadata.title);
		movies.insert({
			movie_id: movie_id,
			title: metadata.title,
			year: metadata.year,
			summary: metadata.summary
		}, "combine");
		for (let file_id of file_ids) {
			movie_files.insert({
				movie_id: movie_id,
				file_id: file_id
			}, "combine");
		}
		for (let [index, actor] of metadata.actors.entries()) {
			let person_id = makeId("person", actor);
			persons.insert({
				person_id: person_id,
				name: actor
			}, "combine");
			movie_persons.insert({
				person_id: person_id,
				movie_id: movie_id,
				order: index
			}, "combine");
		}
		for (let [index, genre] of metadata.genres.entries()) {
			let genre_id = makeId("genre", genre);
			genres.insert({
				genre_id: genre_id,
				name: genre
			}, "combine");
			movie_genres.insert({
				genre_id: genre_id,
				movie_id: movie_id,
				order: index
			}, "combine");
		}
	} else if (probes.schema.TrackMetadata.is(metadata)) {
		let album_id = makeId("album", metadata.album.title);
		albums.insert({
			album_id: album_id,
			title: metadata.album.title,
			year: metadata.album.year
		}, "combine");
		for (let [index, artist] of metadata.album.artists.entries()) {
			let artist_id = makeId("artist", artist.title);
			artists.insert({
				artist_id: artist_id,
				name: artist.title
			}, "combine");
			album_artists.insert({
				album_id: album_id,
				artist_id: artist_id,
				order: index
			}, "combine");
		}
		let disc_id = makeId("disc", album_id, `${metadata.disc}`);
		discs.insert({
			disc_id: disc_id,
			album_id: album_id,
			number: metadata.disc
		}, "combine");
		let track_id = makeId("track", disc_id, `${metadata.track}`);
		tracks.insert({
			track_id: track_id,
			disc_id: disc_id,
			title: metadata.title,
			number: metadata.track
		}, "combine");
		for (let file_id of file_ids) {
			track_files.insert({
				track_id: track_id,
				file_id: file_id
			}, "combine");
		}
		for (let [index, artist] of metadata.artists.entries()) {
			let artist_id = makeId("artist", artist.title);
			artists.insert({
				artist_id: artist_id,
				name: artist.title
			}, "combine");
			track_artists.insert({
				track_id: track_id,
				artist_id: artist_id,
				order: index
			}, "combine");
		}
	}
}

function indexFile(file: File): void {
	let file_id = file.file_id;
	let path = getFilePath(file);
	let fd = libfs.openSync(path.join("/"), "r");
	try {
		let probe: probes.schema.Probe = {
			streams: []
		};
		if (file.name.endsWith(".vtt")) {
			probe = probes.vtt.probe(fd);
			file.mime = "text/vtt";
		} else if (file.name.endsWith(".json")) {
			probe = probes.json.probe(fd);
			file.mime = "application/json";
		} else if (file.name.endsWith(".mp4")) {
			probe = probes.mp4.probe(fd);
			if (probe.streams.find((stream) => stream.type === "video")) {
				file.mime = "video/mp4";
			} else if (probe.streams.find((stream) => stream.type === "audio")) {
				file.mime = "audio/mp4";
			}
		} else if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")) {
			probe = probes.jpeg.probe(fd);
			file.mime = "image/jpeg";
		}
		for (let [index, stream] of probe.streams.entries()) {
			let stream_id = makeId("stream", file.file_id, `${index}`);
			if (stream.type === "audio") {
				audio_streams.insert({
					audio_stream_id: stream_id,
					file_id: file_id,
					stream_index: index,
					duration_ms: stream.duration_ms
				});
			} else if (stream.type === "image") {
				image_streams.insert({
					image_stream_id: stream_id,
					file_id: file_id,
					stream_index: index,
					width: stream.width,
					height: stream.height
				});
			} else if (stream.type === "subtitle") {
				subtitle_streams.insert({
					subtitle_stream_id: stream_id,
					file_id: file_id,
					stream_index: index,
					duration_ms: stream.duration_ms
				});
			} else if (stream.type === "video") {
				video_streams.insert({
					video_stream_id: stream_id,
					file_id: file_id,
					stream_index: index,
					width: stream.width,
					height: stream.height,
					duration_ms: stream.duration_ms
				});
			}
		}
		indexMetadata(probe, file_id);
	} catch (error) {
		console.log(`Indexing failed for "${path.join("/")}"!`);
	}
	libfs.closeSync(fd);
	let stats = libfs.statSync(path.join("/"));
	file.index_timestamp = stats.mtime.valueOf();
}

function indexFiles(): void {
	for (let file of files) {
		if (is.absent(file.index_timestamp)) {
			indexFile(file);
		}
	}
}

function getSiblingFiles(subject: File): Array<File> {
	let candidates_in_directory = getFilesFromDirectory.lookup(subject.parent_directory_id)
		.filter((file) => file.file_id !== subject.file_id)
		.filter((file) => file.mime.startsWith("audio/") || file.mime.startsWith("video/"))
		.sort(indices.LexicalSort.increasing((file) => file.name));
	let basename = subject.name.split(".")[0];
	let candidates_sharing_basename = candidates_in_directory
		.filter((file) => file.name.split(".")[0] === basename);
	if (candidates_sharing_basename.length > 0) {
		return candidates_sharing_basename;
	} else {
		return candidates_in_directory;
	}
}

function associateMetadata(): void {
	for (let file of files) {
		if (file.mime !== "application/json") {
			continue;
		}
		let path = getFilePath(file);
		let fd = libfs.openSync(path.join("/"), "r");
		let probe = probes.json.probe(fd);
		libfs.closeSync(fd);
		let siblings = getSiblingFiles(file);
		indexMetadata(probe, ...siblings.map((file) => file.file_id));
	}
}

function associateImages(): void {
	for (let file of files) {
		if (!file.mime.startsWith("image/")) {
			continue;
		}
		let siblings = getSiblingFiles(file);
		for (let sibling of siblings) {
			let track_files = getTracksFromFile.lookup(sibling.file_id)
				.filter((movie_file) => movie_file.file_id !== file.file_id);
			for (let track_file of track_files) {
				try {
					let track = tracks.lookup(track_file.track_id);
					let disc = discs.lookup(track.disc_id);
					let album = albums.lookup(disc.album_id);
					album_files.insert({
						album_id: album.album_id,
						file_id: file.file_id
					});
				} catch (error) {}
			}
			let movies = getMoviesFromFile.lookup(sibling.file_id)
				.filter((movie_file) => movie_file.file_id !== file.file_id);
			for (let movie of movies) {
				movie_files.insert({
					movie_id: movie.movie_id,
					file_id: file.file_id
				});
			}
			let episode_files = getEpisodesFromFile.lookup(sibling.file_id)
				.filter((movie_file) => movie_file.file_id !== file.file_id);
			for (let episode_file of episode_files) {
				try {
					let episode = episodes.lookup(episode_file.episode_id);
					let season = seasons.lookup(episode.season_id);
					let show = shows.lookup(season.show_id);
					show_files.insert({
						show_id: show.show_id,
						file_id: file.file_id
					});
				} catch (error) {}
			}
		}
	}
}

function associateSubtitles(): void {
	for (let file of files) {
		if (file.mime !== "text/vtt") {
			continue;
		}
		let siblings = getSiblingFiles(file);
		for (let sibling of siblings) {
			let movies = getMoviesFromFile.lookup(sibling.file_id)
				.filter((movie_file) => movie_file.file_id !== file.file_id);
			for (let movie of movies) {
				movie_files.insert({
					movie_id: movie.movie_id,
					file_id: file.file_id
				});
			}
			let episodes = getEpisodesFromFile.lookup(sibling.file_id)
				.filter((movie_file) => movie_file.file_id !== file.file_id);
			for (let episode of episodes) {
				episode_files.insert({
					episode_id: episode.episode_id,
					file_id: file.file_id
				});
			}
		}
	}
}

export function runIndexer(): void {
	for (let directory of getDirectoriesFromDirectory.lookup(undefined)) {
		checkDirectory(directory);
	}
	for (let file of getFilesFromDirectory.lookup(undefined)) {
		checkFile(file);
	}
	visitDirectory(MEDIA_ROOT);
	indexFiles();
	associateMetadata();
	associateImages();
	associateSubtitles();
};

runIndexer();

saveIndex("files", files);
saveIndex("directories", directories);
saveIndex("audio_streams", audio_streams);
saveIndex("image_streams", image_streams);
saveIndex("subtitle_streams", subtitle_streams);
saveIndex("video_streams", video_streams);
saveIndex("artists", artists);
saveIndex("albums", albums);
saveIndex("album_files", album_files);
saveIndex("discs", discs);
saveIndex("tracks", tracks);
saveIndex("track_files", track_files);
saveIndex("album_artists", album_artists);
saveIndex("track_artists", track_artists);
saveIndex("shows", shows);
saveIndex("show_files", show_files);
saveIndex("seasons", seasons);
saveIndex("episodes", episodes);
saveIndex("episode_files", episode_files);
saveIndex("movies", movies);
saveIndex("movie_files", movie_files);
saveIndex("persons", persons);
saveIndex("movie_persons", movie_persons);
saveIndex("show_persons", show_persons);
saveIndex("genres", genres);
saveIndex("movie_genres", movie_genres);
saveIndex("show_genres", show_genres);
saveIndex("cues", cues);