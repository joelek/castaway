// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type Directory = {
	"directory_id": string,
	"name": string,
	"parent_directory_id"?: string
};

export const Directory = autoguard.Object.of<Directory>({
	"directory_id": autoguard.String,
	"name": autoguard.String,
	"parent_directory_id": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type File = {
	"file_id": string,
	"name": string,
	"parent_directory_id"?: string,
	"index_timestamp"?: number
};

export const File = autoguard.Object.of<File>({
	"file_id": autoguard.String,
	"name": autoguard.String,
	"parent_directory_id": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"index_timestamp": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	)
});

export type AudioFile = {
	"file_id": string,
	"mime": "audio/mp4" | "audio/mp3",
	"duration_ms": number
};

export const AudioFile = autoguard.Object.of<AudioFile>({
	"file_id": autoguard.String,
	"mime": autoguard.Union.of(
		autoguard.StringLiteral.of("audio/mp4"),
		autoguard.StringLiteral.of("audio/mp3")
	),
	"duration_ms": autoguard.Number
});

export type ImageFile = {
	"file_id": string,
	"mime": "image/jpeg",
	"width": number,
	"height": number
};

export const ImageFile = autoguard.Object.of<ImageFile>({
	"file_id": autoguard.String,
	"mime": autoguard.StringLiteral.of("image/jpeg"),
	"width": autoguard.Number,
	"height": autoguard.Number
});

export type MetadataFile = {
	"file_id": string,
	"mime": "application/json"
};

export const MetadataFile = autoguard.Object.of<MetadataFile>({
	"file_id": autoguard.String,
	"mime": autoguard.StringLiteral.of("application/json")
});

export type SubtitleFile = {
	"file_id": string,
	"mime": "text/vtt",
	"duration_ms": number,
	"language"?: string
};

export const SubtitleFile = autoguard.Object.of<SubtitleFile>({
	"file_id": autoguard.String,
	"mime": autoguard.StringLiteral.of("text/vtt"),
	"duration_ms": autoguard.Number,
	"language": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type VideoFile = {
	"file_id": string,
	"mime": "video/mp4",
	"duration_ms": number,
	"width": number,
	"height": number
};

export const VideoFile = autoguard.Object.of<VideoFile>({
	"file_id": autoguard.String,
	"mime": autoguard.StringLiteral.of("video/mp4"),
	"duration_ms": autoguard.Number,
	"width": autoguard.Number,
	"height": autoguard.Number
});

export type VideoSubtitle = {
	"video_file_id": string,
	"subtitle_file_id": string
};

export const VideoSubtitle = autoguard.Object.of<VideoSubtitle>({
	"video_file_id": autoguard.String,
	"subtitle_file_id": autoguard.String
});

export type Artist = {
	"artist_id": string,
	"name": string
};

export const Artist = autoguard.Object.of<Artist>({
	"artist_id": autoguard.String,
	"name": autoguard.String
});

export type Album = {
	"album_id": string,
	"title": string,
	"year"?: number
};

export const Album = autoguard.Object.of<Album>({
	"album_id": autoguard.String,
	"title": autoguard.String,
	"year": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	)
});

export type AlbumFile = {
	"album_id": string,
	"file_id": string
};

export const AlbumFile = autoguard.Object.of<AlbumFile>({
	"album_id": autoguard.String,
	"file_id": autoguard.String
});

export type Disc = {
	"disc_id": string,
	"album_id": string,
	"number": number
};

export const Disc = autoguard.Object.of<Disc>({
	"disc_id": autoguard.String,
	"album_id": autoguard.String,
	"number": autoguard.Number
});

export type Track = {
	"track_id": string,
	"disc_id": string,
	"title": string,
	"number": number
};

export const Track = autoguard.Object.of<Track>({
	"track_id": autoguard.String,
	"disc_id": autoguard.String,
	"title": autoguard.String,
	"number": autoguard.Number
});

export type TrackFile = {
	"track_id": string,
	"file_id": string
};

export const TrackFile = autoguard.Object.of<TrackFile>({
	"track_id": autoguard.String,
	"file_id": autoguard.String
});

export type AlbumArtist = {
	"album_id": string,
	"artist_id": string,
	"order": number
};

export const AlbumArtist = autoguard.Object.of<AlbumArtist>({
	"album_id": autoguard.String,
	"artist_id": autoguard.String,
	"order": autoguard.Number
});

export type TrackArtist = {
	"track_id": string,
	"artist_id": string,
	"order": number
};

export const TrackArtist = autoguard.Object.of<TrackArtist>({
	"track_id": autoguard.String,
	"artist_id": autoguard.String,
	"order": autoguard.Number
});

export type Show = {
	"show_id": string,
	"name": string,
	"summary"?: string
};

export const Show = autoguard.Object.of<Show>({
	"show_id": autoguard.String,
	"name": autoguard.String,
	"summary": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type ShowFile = {
	"show_id": string,
	"file_id": string
};

export const ShowFile = autoguard.Object.of<ShowFile>({
	"show_id": autoguard.String,
	"file_id": autoguard.String
});

export type Season = {
	"season_id": string,
	"show_id": string,
	"number": number
};

export const Season = autoguard.Object.of<Season>({
	"season_id": autoguard.String,
	"show_id": autoguard.String,
	"number": autoguard.Number
});

export type Episode = {
	"episode_id": string,
	"season_id": string,
	"title": string,
	"number": number,
	"year"?: number,
	"summary"?: string
};

export const Episode = autoguard.Object.of<Episode>({
	"episode_id": autoguard.String,
	"season_id": autoguard.String,
	"title": autoguard.String,
	"number": autoguard.Number,
	"year": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"summary": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type EpisodeFile = {
	"episode_id": string,
	"file_id": string
};

export const EpisodeFile = autoguard.Object.of<EpisodeFile>({
	"episode_id": autoguard.String,
	"file_id": autoguard.String
});

export type Movie = {
	"movie_id": string,
	"title": string,
	"year"?: number,
	"summary"?: string
};

export const Movie = autoguard.Object.of<Movie>({
	"movie_id": autoguard.String,
	"title": autoguard.String,
	"year": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"summary": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type MovieFile = {
	"movie_id": string,
	"file_id": string
};

export const MovieFile = autoguard.Object.of<MovieFile>({
	"movie_id": autoguard.String,
	"file_id": autoguard.String
});

export type Actor = {
	"actor_id": string,
	"name": string
};

export const Actor = autoguard.Object.of<Actor>({
	"actor_id": autoguard.String,
	"name": autoguard.String
});

export type MovieActor = {
	"movie_id": string,
	"actor_id": string,
	"order": number
};

export const MovieActor = autoguard.Object.of<MovieActor>({
	"movie_id": autoguard.String,
	"actor_id": autoguard.String,
	"order": autoguard.Number
});

export type ShowActor = {
	"show_id": string,
	"actor_id": string,
	"order": number
};

export const ShowActor = autoguard.Object.of<ShowActor>({
	"show_id": autoguard.String,
	"actor_id": autoguard.String,
	"order": autoguard.Number
});

export type Genre = {
	"genre_id": string,
	"name": string
};

export const Genre = autoguard.Object.of<Genre>({
	"genre_id": autoguard.String,
	"name": autoguard.String
});

export type MovieGenre = {
	"movie_id": string,
	"genre_id": string,
	"order": number
};

export const MovieGenre = autoguard.Object.of<MovieGenre>({
	"movie_id": autoguard.String,
	"genre_id": autoguard.String,
	"order": autoguard.Number
});

export type ShowGenre = {
	"show_id": string,
	"genre_id": string,
	"order": number
};

export const ShowGenre = autoguard.Object.of<ShowGenre>({
	"show_id": autoguard.String,
	"genre_id": autoguard.String,
	"order": autoguard.Number
});

export type Subtitle = {
	"subtitle_id": string,
	"file_id": string
};

export const Subtitle = autoguard.Object.of<Subtitle>({
	"subtitle_id": autoguard.String,
	"file_id": autoguard.String
});

export type Cue = {
	"cue_id": string,
	"subtitle_id": string,
	"start_ms": number,
	"duration_ms": number,
	"lines": string
};

export const Cue = autoguard.Object.of<Cue>({
	"cue_id": autoguard.String,
	"subtitle_id": autoguard.String,
	"start_ms": autoguard.Number,
	"duration_ms": autoguard.Number,
	"lines": autoguard.String
});

export type User = {
	"user_id": string,
	"name": string,
	"username": string,
	"password": string
};

export const User = autoguard.Object.of<User>({
	"user_id": autoguard.String,
	"name": autoguard.String,
	"username": autoguard.String,
	"password": autoguard.String
});

export type Key = {
	"key_id": string,
	"user_id"?: string
};

export const Key = autoguard.Object.of<Key>({
	"key_id": autoguard.String,
	"user_id": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type Token = {
	"token_id": string,
	"user_id": string,
	"hash": string,
	"expires_ms": number
};

export const Token = autoguard.Object.of<Token>({
	"token_id": autoguard.String,
	"user_id": autoguard.String,
	"hash": autoguard.String,
	"expires_ms": autoguard.Number
});

export type Stream = {
	"stream_id": string,
	"user_id": string,
	"file_id": string,
	"timestamp_ms": number
};

export const Stream = autoguard.Object.of<Stream>({
	"stream_id": autoguard.String,
	"user_id": autoguard.String,
	"file_id": autoguard.String,
	"timestamp_ms": autoguard.Number
});

export type Playlist = {
	"playlist_id": string,
	"title": string,
	"description": string,
	"user_id": string
};

export const Playlist = autoguard.Object.of<Playlist>({
	"playlist_id": autoguard.String,
	"title": autoguard.String,
	"description": autoguard.String,
	"user_id": autoguard.String
});

export type PlaylistItem = {
	"playlist_item_id": string,
	"playlist_id": string,
	"track_id": string,
	"number": number,
	"added_ms": number
};

export const PlaylistItem = autoguard.Object.of<PlaylistItem>({
	"playlist_item_id": autoguard.String,
	"playlist_id": autoguard.String,
	"track_id": autoguard.String,
	"number": autoguard.Number,
	"added_ms": autoguard.Number
});

export type Year = {
	"year_id": string,
	"year": number
};

export const Year = autoguard.Object.of<Year>({
	"year_id": autoguard.String,
	"year": autoguard.Number
});

export type Autoguard = {
	"Directory": Directory,
	"File": File,
	"AudioFile": AudioFile,
	"ImageFile": ImageFile,
	"MetadataFile": MetadataFile,
	"SubtitleFile": SubtitleFile,
	"VideoFile": VideoFile,
	"VideoSubtitle": VideoSubtitle,
	"Artist": Artist,
	"Album": Album,
	"AlbumFile": AlbumFile,
	"Disc": Disc,
	"Track": Track,
	"TrackFile": TrackFile,
	"AlbumArtist": AlbumArtist,
	"TrackArtist": TrackArtist,
	"Show": Show,
	"ShowFile": ShowFile,
	"Season": Season,
	"Episode": Episode,
	"EpisodeFile": EpisodeFile,
	"Movie": Movie,
	"MovieFile": MovieFile,
	"Actor": Actor,
	"MovieActor": MovieActor,
	"ShowActor": ShowActor,
	"Genre": Genre,
	"MovieGenre": MovieGenre,
	"ShowGenre": ShowGenre,
	"Subtitle": Subtitle,
	"Cue": Cue,
	"User": User,
	"Key": Key,
	"Token": Token,
	"Stream": Stream,
	"Playlist": Playlist,
	"PlaylistItem": PlaylistItem,
	"Year": Year
};

export const Autoguard = {
	"Directory": Directory,
	"File": File,
	"AudioFile": AudioFile,
	"ImageFile": ImageFile,
	"MetadataFile": MetadataFile,
	"SubtitleFile": SubtitleFile,
	"VideoFile": VideoFile,
	"VideoSubtitle": VideoSubtitle,
	"Artist": Artist,
	"Album": Album,
	"AlbumFile": AlbumFile,
	"Disc": Disc,
	"Track": Track,
	"TrackFile": TrackFile,
	"AlbumArtist": AlbumArtist,
	"TrackArtist": TrackArtist,
	"Show": Show,
	"ShowFile": ShowFile,
	"Season": Season,
	"Episode": Episode,
	"EpisodeFile": EpisodeFile,
	"Movie": Movie,
	"MovieFile": MovieFile,
	"Actor": Actor,
	"MovieActor": MovieActor,
	"ShowActor": ShowActor,
	"Genre": Genre,
	"MovieGenre": MovieGenre,
	"ShowGenre": ShowGenre,
	"Subtitle": Subtitle,
	"Cue": Cue,
	"User": User,
	"Key": Key,
	"Token": Token,
	"Stream": Stream,
	"Playlist": Playlist,
	"PlaylistItem": PlaylistItem,
	"Year": Year
};
