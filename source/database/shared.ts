import * as jsondb from "../jsondb/";
import * as schema from "./schema";

export type Tables = {
	albums: jsondb.RecordIndex<schema.Album>,
	album_artists: jsondb.RecordIndex<schema.AlbumArtist>,
	album_files: jsondb.RecordIndex<schema.AlbumFile>,
	artists: jsondb.RecordIndex<schema.Artist>,
	audio_files: jsondb.RecordIndex<schema.AudioFile>,
	cues: jsondb.RecordIndex<schema.Cue>,
	directories: jsondb.RecordIndex<schema.Directory>,
	discs: jsondb.RecordIndex<schema.Disc>,
	episodes: jsondb.RecordIndex<schema.Episode>,
	episode_files: jsondb.RecordIndex<schema.EpisodeFile>,
	files: jsondb.RecordIndex<schema.File>,
	genres: jsondb.RecordIndex<schema.Genre>,
	image_files: jsondb.RecordIndex<schema.ImageFile>,
	keys: jsondb.RecordIndex<schema.Key>,
	metadata_files: jsondb.RecordIndex<schema.MetadataFile>,
	movies: jsondb.RecordIndex<schema.Movie>,
	movie_files: jsondb.RecordIndex<schema.MovieFile>,
	movie_genres: jsondb.RecordIndex<schema.MovieGenre>,
	movie_persons: jsondb.RecordIndex<schema.MoviePerson>,
	persons: jsondb.RecordIndex<schema.Person>,
	playlists: jsondb.RecordIndex<schema.Playlist>,
	playlist_items: jsondb.RecordIndex<schema.PlaylistItem>,
	seasons: jsondb.RecordIndex<schema.Season>,
	shows: jsondb.RecordIndex<schema.Show>,
	show_files: jsondb.RecordIndex<schema.ShowFile>,
	show_genres: jsondb.RecordIndex<schema.ShowGenre>,
	show_persons: jsondb.RecordIndex<schema.ShowPerson>,
	streams: jsondb.RecordIndex<schema.Stream>,
	subtitles: jsondb.RecordIndex<schema.Subtitle>,
	subtitle_files: jsondb.RecordIndex<schema.SubtitleFile>,
	tokens: jsondb.RecordIndex<schema.Token>,
	tracks: jsondb.RecordIndex<schema.Track>,
	track_artists: jsondb.RecordIndex<schema.TrackArtist>,
	track_files: jsondb.RecordIndex<schema.TrackFile>,
	users: jsondb.RecordIndex<schema.User>,
	video_files: jsondb.RecordIndex<schema.VideoFile>,
	video_subtitles: jsondb.RecordIndex<schema.VideoSubtitle>
};

export type Indices = {
	getDirectoriesFromDirectory: jsondb.CollectionIndex<schema.Directory>,
	getFilesFromDirectory: jsondb.CollectionIndex<schema.File>,
	getAudioFiles: jsondb.CollectionIndex<schema.AudioFile>,
	getImageFilesFromFile: jsondb.CollectionIndex<schema.ImageFile>,
	getMetadataFilesFromFile: jsondb.CollectionIndex<schema.MetadataFile>,
	getSubtitleFilesFromFile: jsondb.CollectionIndex<schema.SubtitleFile>,
	getVideoFilesFromFile: jsondb.CollectionIndex<schema.VideoFile>,
	getSubtitleFilesFromVideoFile: jsondb.CollectionIndex<schema.VideoSubtitle>,
	getVideoFilesFromSubtitleFile: jsondb.CollectionIndex<schema.VideoSubtitle>,
	getAlbumsFromFile: jsondb.CollectionIndex<schema.AlbumFile>,
	getFilesFromAlbum: jsondb.CollectionIndex<schema.AlbumFile>,
	getDiscsFromAlbum: jsondb.CollectionIndex<schema.Disc>,
	getTracksFromDisc: jsondb.CollectionIndex<schema.Track>,
	getTracksFromFile: jsondb.CollectionIndex<schema.TrackFile>,
	getFilesFromTrack: jsondb.CollectionIndex<schema.TrackFile>,
	getArtistsFromAlbum: jsondb.CollectionIndex<schema.AlbumArtist>,
	getAlbumsFromArtist: jsondb.CollectionIndex<schema.AlbumArtist>,
	getArtistsFromTrack: jsondb.CollectionIndex<schema.TrackArtist>,
	getTracksFromArtist: jsondb.CollectionIndex<schema.TrackArtist>,
	getShowsFromFile: jsondb.CollectionIndex<schema.ShowFile>,
	getFilesFromShow: jsondb.CollectionIndex<schema.ShowFile>,
	getSeasonsFromShow: jsondb.CollectionIndex<schema.Season>,
	getEpisodesFromSeason: jsondb.CollectionIndex<schema.Episode>,
	getEpisodesFromFile: jsondb.CollectionIndex<schema.EpisodeFile>,
	getFilesFromEpisode: jsondb.CollectionIndex<schema.EpisodeFile>,
	getMoviesFromFile: jsondb.CollectionIndex<schema.MovieFile>,
	getFilesFromMovie: jsondb.CollectionIndex<schema.MovieFile>,
	getMoviesFromPerson: jsondb.CollectionIndex<schema.MoviePerson>,
	getPersonsFromMovie: jsondb.CollectionIndex<schema.MoviePerson>,
	getShowsFromPerson: jsondb.CollectionIndex<schema.ShowPerson>,
	getPersonsFromShow: jsondb.CollectionIndex<schema.ShowPerson>,
	getMoviesFromGenre: jsondb.CollectionIndex<schema.MovieGenre>,
	getGenresFromMovie: jsondb.CollectionIndex<schema.MovieGenre>,
	getShowsFromGenre: jsondb.CollectionIndex<schema.ShowGenre>,
	getGenresFromShow: jsondb.CollectionIndex<schema.ShowGenre>,
	getCuesFromSubtitle: jsondb.CollectionIndex<schema.Cue>,
	getUsersFromUsername: jsondb.CollectionIndex<schema.User>,
	getKeysFromUser: jsondb.CollectionIndex<schema.Key>,
	getTokensFromUser: jsondb.CollectionIndex<schema.Token>,
	getStreamsFromUser: jsondb.CollectionIndex<schema.Stream>,
	getStreamsFromFile: jsondb.CollectionIndex<schema.Stream>,
	getPlaylistsFromUser: jsondb.CollectionIndex<schema.Playlist>,
	getPlaylistsItemsFromPlaylist: jsondb.CollectionIndex<schema.PlaylistItem>,
	getPlaylistItemsFromTrack: jsondb.CollectionIndex<schema.PlaylistItem>
};

export function makeIndices(tables: Tables): Indices {
	return {
		getDirectoriesFromDirectory: jsondb.CollectionIndex.fromIndex(tables.directories, tables.directories, (record) => record.directory_id, (record) => record.parent_directory_id),
		getFilesFromDirectory: jsondb.CollectionIndex.fromIndex(tables.directories, tables.files, (record) => record.directory_id, (record) => record.parent_directory_id),
		getAudioFiles: jsondb.CollectionIndex.fromIndex(tables.files, tables.audio_files, (record) => record.file_id, (record) => record.file_id),
		getImageFilesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.image_files, (record) => record.file_id, (record) => record.file_id),
		getMetadataFilesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.metadata_files, (record) => record.file_id, (record) => record.file_id),
		getSubtitleFilesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.subtitle_files, (record) => record.file_id, (record) => record.file_id),
		getVideoFilesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.video_files, (record) => record.file_id, (record) => record.file_id),
		getSubtitleFilesFromVideoFile: jsondb.CollectionIndex.fromIndex(tables.video_files, tables.video_subtitles, (record) => record.file_id, (record) => record.video_file_id),
		getVideoFilesFromSubtitleFile: jsondb.CollectionIndex.fromIndex(tables.subtitle_files, tables.video_subtitles, (record) => record.file_id, (record) => record.subtitle_file_id),
		getAlbumsFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.album_files, (record) => record.file_id, (record) => record.file_id),
		getFilesFromAlbum: jsondb.CollectionIndex.fromIndex(tables.albums, tables.album_files, (record) => record.album_id, (record) => record.album_id),
		getDiscsFromAlbum: jsondb.CollectionIndex.fromIndex(tables.albums, tables.discs, (record) => record.album_id, (record) => record.album_id),
		getTracksFromDisc: jsondb.CollectionIndex.fromIndex(tables.discs, tables.tracks, (record) => record.disc_id, (record) => record.disc_id),
		getTracksFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.track_files, (record) => record.file_id, (record) => record.file_id),
		getFilesFromTrack: jsondb.CollectionIndex.fromIndex(tables.tracks, tables.track_files, (record) => record.track_id, (record) => record.track_id),
		getArtistsFromAlbum: jsondb.CollectionIndex.fromIndex(tables.albums, tables.album_artists, (record) => record.album_id, (record) => record.album_id),
		getAlbumsFromArtist: jsondb.CollectionIndex.fromIndex(tables.artists, tables.album_artists, (record) => record.artist_id, (record) => record.artist_id),
		getArtistsFromTrack: jsondb.CollectionIndex.fromIndex(tables.tracks, tables.track_artists, (record) => record.track_id, (record) => record.track_id),
		getTracksFromArtist: jsondb.CollectionIndex.fromIndex(tables.artists, tables.track_artists, (record) => record.artist_id, (record) => record.artist_id),
		getShowsFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.show_files, (record) => record.file_id, (record) => record.file_id),
		getFilesFromShow: jsondb.CollectionIndex.fromIndex(tables.shows, tables.show_files, (record) => record.show_id, (record) => record.show_id),
		getSeasonsFromShow: jsondb.CollectionIndex.fromIndex(tables.shows, tables.seasons, (record) => record.show_id, (record) => record.show_id),
		getEpisodesFromSeason: jsondb.CollectionIndex.fromIndex(tables.seasons, tables.episodes, (record) => record.season_id, (record) => record.season_id),
		getEpisodesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.episode_files, (record) => record.file_id, (record) => record.file_id),
		getFilesFromEpisode: jsondb.CollectionIndex.fromIndex(tables.episodes, tables.episode_files, (record) => record.episode_id, (record) => record.episode_id),
		getMoviesFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.movie_files, (record) => record.file_id, (record) => record.file_id),
		getFilesFromMovie: jsondb.CollectionIndex.fromIndex(tables.movies, tables.movie_files, (record) => record.movie_id, (record) => record.movie_id),
		getMoviesFromPerson: jsondb.CollectionIndex.fromIndex(tables.persons, tables.movie_persons, (record) => record.person_id, (record) => record.person_id),
		getPersonsFromMovie: jsondb.CollectionIndex.fromIndex(tables.movies, tables.movie_persons, (record) => record.movie_id, (record) => record.movie_id),
		getShowsFromPerson: jsondb.CollectionIndex.fromIndex(tables.persons, tables.show_persons, (record) => record.person_id, (record) => record.person_id),
		getPersonsFromShow: jsondb.CollectionIndex.fromIndex(tables.shows, tables.show_persons, (record) => record.show_id, (record) => record.show_id),
		getMoviesFromGenre: jsondb.CollectionIndex.fromIndex(tables.genres, tables.movie_genres, (record) => record.genre_id, (record) => record.genre_id),
		getGenresFromMovie: jsondb.CollectionIndex.fromIndex(tables.movies, tables.movie_genres, (record) => record.movie_id, (record) => record.movie_id),
		getShowsFromGenre: jsondb.CollectionIndex.fromIndex(tables.genres, tables.show_genres, (record) => record.genre_id, (record) => record.genre_id),
		getGenresFromShow: jsondb.CollectionIndex.fromIndex(tables.shows, tables.show_genres, (record) => record.show_id, (record) => record.show_id),
		getCuesFromSubtitle: jsondb.CollectionIndex.fromIndex(tables.subtitles, tables.cues, (record) => record.subtitle_id, (record) => record.subtitle_id),
		getUsersFromUsername: jsondb.CollectionIndex.fromIndex(tables.users, tables.users, (record) => record.user_id, (record) => record.username),
		getKeysFromUser: jsondb.CollectionIndex.fromIndex(tables.users, tables.keys, (record) => record.user_id, (record) => record.user_id),
		getTokensFromUser: jsondb.CollectionIndex.fromIndex(tables.users, tables.tokens, (record) => record.user_id, (record) => record.user_id),
		getStreamsFromUser: jsondb.CollectionIndex.fromIndex(tables.users, tables.streams, (record) => record.user_id, (record) => record.user_id),
		getStreamsFromFile: jsondb.CollectionIndex.fromIndex(tables.files, tables.streams, (record) => record.file_id, (record) => record.file_id),
		getPlaylistsFromUser: jsondb.CollectionIndex.fromIndex(tables.users, tables.playlists, (record) => record.user_id, (record) => record.user_id),
		getPlaylistsItemsFromPlaylist: jsondb.CollectionIndex.fromIndex(tables.playlists, tables.playlist_items, (record) => record.playlist_id, (record) => record.playlist_id),
		getPlaylistItemsFromTrack: jsondb.CollectionIndex.fromIndex(tables.tracks, tables.playlist_items, (record) => record.track_id, (record) => record.track_id)
	};
};

export interface LookupHandler {
	lookupAlbum(album_id: string): Promise<schema.Album>;
	lookupArtist(artist_id: string): Promise<schema.Artist>;
	lookupCue(cue_id: string): Promise<schema.Cue>;
	lookupDisc(disc_id: string): Promise<schema.Disc>;
	lookupEpisode(episode_id: string): Promise<schema.Episode>;
	lookupGenre(genre_id: string): Promise<schema.Genre>;
	lookupMovie(movie_id: string): Promise<schema.Movie>;
	lookupPerson(person_id: string): Promise<schema.Person>;
	lookupPlaylist(playlist_id: string): Promise<schema.Playlist>;
	lookupPlaylistItem(playlist_item_id: string): Promise<schema.PlaylistItem>;
	lookupSeason(season_id: string): Promise<schema.Season>;
	lookupShow(show_id: string): Promise<schema.Show>;
	lookupSubtitle(subtitle_id: string): Promise<schema.Subtitle>;
	lookupTrack(track_id: string): Promise<schema.Track>;
	lookupUser(user_id: string): Promise<schema.User>;
};

export class TablesLookupHandler implements LookupHandler {
	private tables: Tables;
	private fallbackLookupHandler?: LookupHandler;

	constructor(tables: Tables, fallbackLookupHandler?: LookupHandler) {
		this.tables = tables;
	}

	async lookupAlbum(album_id: string): Promise<schema.Album> {
		return this.tables.albums.lookup(album_id);
	}

	async lookupArtist(artist_id: string): Promise<schema.Artist> {
		return this.tables.artists.lookup(artist_id);
	}

	async lookupCue(cue_id: string): Promise<schema.Cue> {
		return this.tables.cues.lookup(cue_id);
	}

	async lookupDisc(disc_id: string): Promise<schema.Disc> {
		return this.tables.discs.lookup(disc_id);
	}

	async lookupEpisode(episode_id: string): Promise<schema.Episode> {
		return this.tables.episodes.lookup(episode_id);
	}

	async lookupGenre(genre_id: string): Promise<schema.Genre> {
		return this.tables.genres.lookup(genre_id);
	}

	async lookupMovie(movie_id: string): Promise<schema.Movie> {
		return this.tables.movies.lookup(movie_id);
	}

	async lookupPerson(person_id: string): Promise<schema.Person> {
		return this.tables.persons.lookup(person_id);
	}

	async lookupPlaylist(playlist_id: string): Promise<schema.Playlist> {
		return this.tables.playlists.lookup(playlist_id);
	}

	async lookupPlaylistItem(playlist_item_id: string): Promise<schema.PlaylistItem> {
		return this.tables.playlist_items.lookup(playlist_item_id);
	}

	async lookupSeason(season_id: string): Promise<schema.Season> {
		return this.tables.seasons.lookup(season_id);
	}

	async lookupShow(show_id: string): Promise<schema.Show> {
		return this.tables.shows.lookup(show_id);
	}

	async lookupSubtitle(subtitle_id: string): Promise<schema.Subtitle> {
		return this.tables.subtitles.lookup(subtitle_id);
	}

	async lookupTrack(track_id: string): Promise<schema.Track> {
		return this.tables.tracks.lookup(track_id);
	}

	async lookupUser(user_id: string): Promise<schema.User> {
		return this.tables.users.lookup(user_id);
	}
};
