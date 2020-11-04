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
	"mime": string,
	"parent_directory_id"?: string,
	"index_timestamp"?: number
};

export const File = autoguard.Object.of<File>({
	"file_id": autoguard.String,
	"name": autoguard.String,
	"mime": autoguard.String,
	"parent_directory_id": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"index_timestamp": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	)
});

export type AudioStream = {
	"audio_stream_id": string,
	"file_id": string,
	"stream_index": number,
	"duration_ms": number
};

export const AudioStream = autoguard.Object.of<AudioStream>({
	"audio_stream_id": autoguard.String,
	"file_id": autoguard.String,
	"stream_index": autoguard.Number,
	"duration_ms": autoguard.Number
});

export type ImageStream = {
	"image_stream_id": string,
	"file_id": string,
	"stream_index": number,
	"width": number,
	"height": number
};

export const ImageStream = autoguard.Object.of<ImageStream>({
	"image_stream_id": autoguard.String,
	"file_id": autoguard.String,
	"stream_index": autoguard.Number,
	"width": autoguard.Number,
	"height": autoguard.Number
});

export type SubtitleStream = {
	"subtitle_stream_id": string,
	"file_id": string,
	"stream_index": number,
	"duration_ms": number
};

export const SubtitleStream = autoguard.Object.of<SubtitleStream>({
	"subtitle_stream_id": autoguard.String,
	"file_id": autoguard.String,
	"stream_index": autoguard.Number,
	"duration_ms": autoguard.Number
});

export type VideoStream = {
	"video_stream_id": string,
	"file_id": string,
	"stream_index": number,
	"duration_ms": number,
	"width": number,
	"height": number
};

export const VideoStream = autoguard.Object.of<VideoStream>({
	"video_stream_id": autoguard.String,
	"file_id": autoguard.String,
	"stream_index": autoguard.Number,
	"duration_ms": autoguard.Number,
	"width": autoguard.Number,
	"height": autoguard.Number
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

export type Person = {
	"person_id": string,
	"name": string
};

export const Person = autoguard.Object.of<Person>({
	"person_id": autoguard.String,
	"name": autoguard.String
});

export type MoviePerson = {
	"movie_id": string,
	"person_id": string,
	"order": number
};

export const MoviePerson = autoguard.Object.of<MoviePerson>({
	"movie_id": autoguard.String,
	"person_id": autoguard.String,
	"order": autoguard.Number
});

export type ShowPerson = {
	"show_id": string,
	"person_id": string,
	"order": number
};

export const ShowPerson = autoguard.Object.of<ShowPerson>({
	"show_id": autoguard.String,
	"person_id": autoguard.String,
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

export type Autoguard = {
	"Directory": Directory,
	"File": File,
	"AudioStream": AudioStream,
	"ImageStream": ImageStream,
	"SubtitleStream": SubtitleStream,
	"VideoStream": VideoStream,
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
	"Person": Person,
	"MoviePerson": MoviePerson,
	"ShowPerson": ShowPerson,
	"Genre": Genre,
	"MovieGenre": MovieGenre,
	"ShowGenre": ShowGenre
};

export const Autoguard = {
	"Directory": Directory,
	"File": File,
	"AudioStream": AudioStream,
	"ImageStream": ImageStream,
	"SubtitleStream": SubtitleStream,
	"VideoStream": VideoStream,
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
	"Person": Person,
	"MoviePerson": MoviePerson,
	"ShowPerson": ShowPerson,
	"Genre": Genre,
	"MovieGenre": MovieGenre,
	"ShowGenre": ShowGenre
};
