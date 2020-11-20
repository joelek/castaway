import * as typesockets from "../typesockets/client";
import * as observers from "../observers/";
import * as jsondb from "../jsondb/";
import * as messages from "./messages";
import * as schema from "./schema";
import * as shared from "./shared";

function makeClientDatabase(): shared.Tables {
	return {
		albums: new jsondb.RecordIndex<schema.Album>((record) => record.album_id),
		album_artists: new jsondb.RecordIndex<schema.AlbumArtist>((record) => [record.album_id, record.artist_id].join("\0")),
		album_files: new jsondb.RecordIndex<schema.AlbumFile>((record) => [record.album_id, record.file_id].join("\0")),
		audio_files: new jsondb.RecordIndex<schema.AudioFile>((record) => record.file_id),
		artists: new jsondb.RecordIndex<schema.Artist>((record) => record.artist_id),
		cues: new jsondb.RecordIndex<schema.Cue>((record) => record.cue_id),
		directories: new jsondb.RecordIndex<schema.Directory>((record) => record.directory_id),
		discs: new jsondb.RecordIndex<schema.Disc>((record) => record.disc_id),
		episodes: new jsondb.RecordIndex<schema.Episode>((record) => record.episode_id),
		episode_files: new jsondb.RecordIndex<schema.EpisodeFile>((record) => [record.episode_id, record.file_id].join("\0")),
		files: new jsondb.RecordIndex<schema.File>((record) => record.file_id),
		genres: new jsondb.RecordIndex<schema.Genre>((record) => record.genre_id),
		image_files: new jsondb.RecordIndex<schema.ImageFile>((record) => record.file_id),
		keys: new jsondb.RecordIndex<schema.Key>((record) => record.key_id),
		metadata_files: new jsondb.RecordIndex<schema.MetadataFile>((record) => record.file_id),
		movies: new jsondb.RecordIndex<schema.Movie>((record) => record.movie_id),
		movie_files: new jsondb.RecordIndex<schema.MovieFile>((record) => [record.movie_id, record.file_id].join("\0")),
		movie_genres: new jsondb.RecordIndex<schema.MovieGenre>((record) => [record.movie_id, record.genre_id].join("\0")),
		movie_persons: new jsondb.RecordIndex<schema.MoviePerson>((record) => [record.movie_id, record.person_id].join("\0")),
		persons: new jsondb.RecordIndex<schema.Person>((record) => record.person_id),
		seasons: new jsondb.RecordIndex<schema.Season>((record) => record.season_id),
		shows: new jsondb.RecordIndex<schema.Show>((record) => record.show_id),
		show_files: new jsondb.RecordIndex<schema.ShowFile>((record) => [record.show_id, record.file_id].join("\0")),
		show_genres: new jsondb.RecordIndex<schema.ShowGenre>((record) => [record.show_id, record.genre_id].join("\0")),
		show_persons: new jsondb.RecordIndex<schema.ShowPerson>((record) => [record.show_id, record.person_id].join("\0")),
		streams: new jsondb.RecordIndex<schema.Stream>((record) => record.stream_id),
		subtitles: new jsondb.RecordIndex<schema.Subtitle>((record) => [record.subtitle_id].join("\0")),
		subtitle_files: new jsondb.RecordIndex<schema.SubtitleFile>((record) => record.file_id),
		tokens: new jsondb.RecordIndex<schema.Token>((record) => record.token_id),
		playlists: new jsondb.RecordIndex<schema.Playlist>((record) => record.playlist_id),
		playlist_items: new jsondb.RecordIndex<schema.PlaylistItem>((record) => record.playlist_item_id),
		tracks: new jsondb.RecordIndex<schema.Track>((record) => record.track_id),
		track_artists: new jsondb.RecordIndex<schema.TrackArtist>((record) => [record.track_id, record.artist_id].join("\0")),
		track_files: new jsondb.RecordIndex<schema.TrackFile>((record) => [record.track_id, record.file_id].join("\0")),
		users: new jsondb.RecordIndex<schema.User>((record) => record.user_id),
		video_files: new jsondb.RecordIndex<schema.VideoFile>((record) => record.file_id),
		video_subtitles: new jsondb.RecordIndex<schema.VideoSubtitle>((record) => [record.video_file_id, record.subtitle_file_id].join("\0"))
	};
};

export class DatabaseClient {
	private tables: shared.Tables;
	private tsc: typesockets.TypeSocketClient<messages.Autoguard>;
	private token = new observers.ObservableClass(undefined as string | undefined);
	private online = new observers.ObservableClass(false);

	private async lookup<A>(table: jsondb.RecordIndex<A>, id: string, refresh: boolean, lookup: () => Promise<A>): Promise<A> {
		if (!refresh) {
			try {
				return table.lookup(id);
			} catch (error) {}
		}
		let record = await lookup();
		table.insert(record);
		return record;
	}

	constructor(url: string, factory: typesockets.WebSocketFactory = (url) => new WebSocket(url)) {
		this.tables = makeClientDatabase();
		this.tsc = new typesockets.TypeSocketClient(url, factory, messages.Autoguard);
		this.tsc.addEventListener("sys", "connect", () => {
			this.online.updateState(true);
		});
		this.tsc.addEventListener("sys", "disconnect", () => {
			this.online.updateState(false);
		});
		observers.computed((isOnline, token) => {
			if (isOnline) {
				this.tsc.send("SetToken", {
					token
				});
			}
		}, this.online, this.token);
		this.tsc.addEventListener("app", "PlaylistInvalidate", async (id) => {
			await this.lookupPlaylist(id, true);
		});
		this.tsc.addEventListener("app", "PlaylistItemInvalidate", async (id) => {
			await this.lookupPlaylistItem(id, true);
		});
	}

	authenticate(token?: string): void {
		this.token.updateState(token);
	}

	close(): void {
		this.tsc.close();
	}

	isOnline(): boolean {
		return this.online.getState();
	}

	async lookupPlaylist(id: string, refresh: boolean = false): Promise<schema.Playlist> {
		return this.lookup(this.tables.playlists, id, refresh, () => this.tsc.request("PlaylistRequest", "PlaylistResponse", id));
	}

	async lookupPlaylistItem(id: string, refresh: boolean = false): Promise<schema.PlaylistItem> {
		return this.lookup(this.tables.playlist_items, id, refresh, () => this.tsc.request("PlaylistItemRequest", "PlaylistItemResponse", id));
	}

	reconnect(): void {
		this.tsc.reconnect();
	}
};
