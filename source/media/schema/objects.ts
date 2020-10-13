// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type ArtistBase = {
	"artist_id": string,
	"title": string
};

export const ArtistBase = autoguard.Object.of<ArtistBase>({
	"artist_id": autoguard.String,
	"title": autoguard.String
});

export type Artist = ArtistBase & {
	"albums": Album[]
};

export const Artist = autoguard.Intersection.of(
	autoguard.Reference.of<ArtistBase>(() => ArtistBase),
	autoguard.Object.of<{
		"albums": Album[]
	}>({
		"albums": autoguard.Array.of(autoguard.Reference.of<Album>(() => Album))
	})
);

export type AlbumBase = {
	"album_id": string,
	"title": string,
	"year": number,
	"artists": ArtistBase[],
	"artwork"?: ImageFile
};

export const AlbumBase = autoguard.Object.of<AlbumBase>({
	"album_id": autoguard.String,
	"title": autoguard.String,
	"year": autoguard.Number,
	"artists": autoguard.Array.of(autoguard.Reference.of<ArtistBase>(() => ArtistBase)),
	"artwork": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Reference.of<ImageFile>(() => ImageFile)
	)
});

export type Album = AlbumBase & {
	"discs": Disc[]
};

export const Album = autoguard.Intersection.of(
	autoguard.Reference.of<AlbumBase>(() => AlbumBase),
	autoguard.Object.of<{
		"discs": Disc[]
	}>({
		"discs": autoguard.Array.of(autoguard.Reference.of<Disc>(() => Disc))
	})
);

export type DiscBase = {
	"disc_id": string,
	"album": AlbumBase
};

export const DiscBase = autoguard.Object.of<DiscBase>({
	"disc_id": autoguard.String,
	"album": autoguard.Reference.of<AlbumBase>(() => AlbumBase)
});

export type Disc = DiscBase & {
	"tracks": Track[]
};

export const Disc = autoguard.Intersection.of(
	autoguard.Reference.of<DiscBase>(() => DiscBase),
	autoguard.Object.of<{
		"tracks": Track[]
	}>({
		"tracks": autoguard.Array.of(autoguard.Reference.of<Track>(() => Track))
	})
);

export type TrackBase = {
	"track_id": string,
	"title": string,
	"disc": DiscBase,
	"artists": ArtistBase[],
	"file": AudioFile
};

export const TrackBase = autoguard.Object.of<TrackBase>({
	"track_id": autoguard.String,
	"title": autoguard.String,
	"disc": autoguard.Reference.of<DiscBase>(() => DiscBase),
	"artists": autoguard.Array.of(autoguard.Reference.of<ArtistBase>(() => ArtistBase)),
	"file": autoguard.Reference.of<AudioFile>(() => AudioFile)
});

export type Track = TrackBase & {};

export const Track = autoguard.Intersection.of(
	autoguard.Reference.of<TrackBase>(() => TrackBase),
	autoguard.Object.of<{}>({})
);

export type MovieBase = {
	"movie_id": string,
	"title": string,
	"year": number,
	"summary": string,
	"artwork"?: ImageFile,
	"file": VideoFile
};

export const MovieBase = autoguard.Object.of<MovieBase>({
	"movie_id": autoguard.String,
	"title": autoguard.String,
	"year": autoguard.Number,
	"summary": autoguard.String,
	"artwork": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Reference.of<ImageFile>(() => ImageFile)
	),
	"file": autoguard.Reference.of<VideoFile>(() => VideoFile)
});

export type Movie = MovieBase & {};

export const Movie = autoguard.Intersection.of(
	autoguard.Reference.of<MovieBase>(() => MovieBase),
	autoguard.Object.of<{}>({})
);

export type ShowBase = {
	"show_id": string,
	"title": string
};

export const ShowBase = autoguard.Object.of<ShowBase>({
	"show_id": autoguard.String,
	"title": autoguard.String
});

export type Show = ShowBase & {
	"seasons": Season[]
};

export const Show = autoguard.Intersection.of(
	autoguard.Reference.of<ShowBase>(() => ShowBase),
	autoguard.Object.of<{
		"seasons": Season[]
	}>({
		"seasons": autoguard.Array.of(autoguard.Reference.of<Season>(() => Season))
	})
);

export type SeasonBase = {
	"season_id": string,
	"number": number,
	"show": ShowBase
};

export const SeasonBase = autoguard.Object.of<SeasonBase>({
	"season_id": autoguard.String,
	"number": autoguard.Number,
	"show": autoguard.Reference.of<ShowBase>(() => ShowBase)
});

export type Season = SeasonBase & {
	"episodes": Episode[]
};

export const Season = autoguard.Intersection.of(
	autoguard.Reference.of<SeasonBase>(() => SeasonBase),
	autoguard.Object.of<{
		"episodes": Episode[]
	}>({
		"episodes": autoguard.Array.of(autoguard.Reference.of<Episode>(() => Episode))
	})
);

export type EpisodeBase = {
	"episode_id": string,
	"title": string,
	"summary": string,
	"number": number,
	"file": VideoFile,
	"subtitles": SubtitleFile[],
	"season": SeasonBase
};

export const EpisodeBase = autoguard.Object.of<EpisodeBase>({
	"episode_id": autoguard.String,
	"title": autoguard.String,
	"summary": autoguard.String,
	"number": autoguard.Number,
	"file": autoguard.Reference.of<VideoFile>(() => VideoFile),
	"subtitles": autoguard.Array.of(autoguard.Reference.of<SubtitleFile>(() => SubtitleFile)),
	"season": autoguard.Reference.of<SeasonBase>(() => SeasonBase)
});

export type Episode = EpisodeBase & {};

export const Episode = autoguard.Intersection.of(
	autoguard.Reference.of<EpisodeBase>(() => EpisodeBase),
	autoguard.Object.of<{}>({})
);

export type File = {
	"file_id": string,
	"mime": string
};

export const File = autoguard.Object.of<File>({
	"file_id": autoguard.String,
	"mime": autoguard.String
});

export type AudioFile = File & {
	"duration_ms": number
};

export const AudioFile = autoguard.Intersection.of(
	autoguard.Reference.of<File>(() => File),
	autoguard.Object.of<{
		"duration_ms": number
	}>({
		"duration_ms": autoguard.Number
	})
);

export type ImageFile = File & {};

export const ImageFile = autoguard.Intersection.of(
	autoguard.Reference.of<File>(() => File),
	autoguard.Object.of<{}>({})
);

export type SubtitleFile = File & {
	"language"?: string
};

export const SubtitleFile = autoguard.Intersection.of(
	autoguard.Reference.of<File>(() => File),
	autoguard.Object.of<{
		"language"?: string
	}>({
		"language": autoguard.Union.of(
			autoguard.Undefined,
			autoguard.String
		)
	})
);

export type VideoFile = File & {
	"duration_ms": number
};

export const VideoFile = autoguard.Intersection.of(
	autoguard.Reference.of<File>(() => File),
	autoguard.Object.of<{
		"duration_ms": number
	}>({
		"duration_ms": autoguard.Number
	})
);

export type Autoguard = {
	"ArtistBase": ArtistBase,
	"Artist": Artist,
	"AlbumBase": AlbumBase,
	"Album": Album,
	"DiscBase": DiscBase,
	"Disc": Disc,
	"TrackBase": TrackBase,
	"Track": Track,
	"MovieBase": MovieBase,
	"Movie": Movie,
	"ShowBase": ShowBase,
	"Show": Show,
	"SeasonBase": SeasonBase,
	"Season": Season,
	"EpisodeBase": EpisodeBase,
	"Episode": Episode,
	"File": File,
	"AudioFile": AudioFile,
	"ImageFile": ImageFile,
	"SubtitleFile": SubtitleFile,
	"VideoFile": VideoFile
};

export const Autoguard = {
	"ArtistBase": ArtistBase,
	"Artist": Artist,
	"AlbumBase": AlbumBase,
	"Album": Album,
	"DiscBase": DiscBase,
	"Disc": Disc,
	"TrackBase": TrackBase,
	"Track": Track,
	"MovieBase": MovieBase,
	"Movie": Movie,
	"ShowBase": ShowBase,
	"Show": Show,
	"SeasonBase": SeasonBase,
	"Season": Season,
	"EpisodeBase": EpisodeBase,
	"Episode": Episode,
	"File": File,
	"AudioFile": AudioFile,
	"ImageFile": ImageFile,
	"SubtitleFile": SubtitleFile,
	"VideoFile": VideoFile
};
