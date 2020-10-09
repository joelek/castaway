// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type Image = {
	"url": string,
	"height"?: number,
	"width"?: number
};

export const Image = autoguard.Object.of<Image>({
	"url": autoguard.String,
	"height": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"width": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	)
});

export type Volume = {
	"level"?: number,
	"muted"?: boolean
};

export const Volume = autoguard.Object.of<Volume>({
	"level": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"muted": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Boolean
	)
});

export type MediaInformation = {
	"contentId": string,
	"streamType": "NONE" | "BUFFERED" | "LIVE",
	"contentType": string,
	"metadata"?: GenericMediaMetadata | MovieMediaMetadata | TvShowMediaMetadata | MusicTrackMediaMetadata | PhotoMediaMetadata,
	"duration"?: number,
	"customData"?: Record<string, undefined | any>
};

export const MediaInformation = autoguard.Object.of<MediaInformation>({
	"contentId": autoguard.String,
	"streamType": autoguard.Union.of(
		autoguard.StringLiteral.of("NONE"),
		autoguard.StringLiteral.of("BUFFERED"),
		autoguard.StringLiteral.of("LIVE")
	),
	"contentType": autoguard.String,
	"metadata": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Union.of(
			autoguard.Reference.of<GenericMediaMetadata>(() => GenericMediaMetadata),
			autoguard.Reference.of<MovieMediaMetadata>(() => MovieMediaMetadata),
			autoguard.Reference.of<TvShowMediaMetadata>(() => TvShowMediaMetadata),
			autoguard.Reference.of<MusicTrackMediaMetadata>(() => MusicTrackMediaMetadata),
			autoguard.Reference.of<PhotoMediaMetadata>(() => PhotoMediaMetadata)
		)
	),
	"duration": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type GenericMediaMetadata = {
	"metadataType": 0,
	"title"?: string,
	"subtitle"?: string,
	"images"?: Image[],
	"releaseDate"?: string
};

export const GenericMediaMetadata = autoguard.Object.of<GenericMediaMetadata>({
	"metadataType": autoguard.NumberLiteral.of(0),
	"title": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"subtitle": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"images": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Array.of(autoguard.Reference.of<Image>(() => Image))
	),
	"releaseDate": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type MovieMediaMetadata = {
	"metadataType": 1,
	"title"?: string,
	"subtitle"?: string,
	"studio"?: string,
	"images"?: Image[],
	"releaseDate"?: string
};

export const MovieMediaMetadata = autoguard.Object.of<MovieMediaMetadata>({
	"metadataType": autoguard.NumberLiteral.of(1),
	"title": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"subtitle": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"studio": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"images": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Array.of(autoguard.Reference.of<Image>(() => Image))
	),
	"releaseDate": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type TvShowMediaMetadata = {
	"metadataType": 2,
	"seriesTitle"?: string,
	"subtitle"?: string,
	"season"?: number,
	"episode"?: number,
	"images"?: Image[],
	"originalAirDate"?: string
};

export const TvShowMediaMetadata = autoguard.Object.of<TvShowMediaMetadata>({
	"metadataType": autoguard.NumberLiteral.of(2),
	"seriesTitle": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"subtitle": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"season": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"episode": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"images": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Array.of(autoguard.Reference.of<Image>(() => Image))
	),
	"originalAirDate": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type MusicTrackMediaMetadata = {
	"metadataType": 3,
	"albumName"?: string,
	"title"?: string,
	"albumArtist"?: string,
	"artist"?: string,
	"composer"?: string,
	"trackNumber"?: number,
	"discNumber"?: number,
	"images"?: Image[],
	"releaseDate"?: string
};

export const MusicTrackMediaMetadata = autoguard.Object.of<MusicTrackMediaMetadata>({
	"metadataType": autoguard.NumberLiteral.of(3),
	"albumName": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"title": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"albumArtist": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"artist": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"composer": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"trackNumber": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"discNumber": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"images": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Array.of(autoguard.Reference.of<Image>(() => Image))
	),
	"releaseDate": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type PhotoMediaMetadata = {
	"metadataType": 4,
	"title"?: string,
	"artist"?: string,
	"location"?: string,
	"latitude"?: number,
	"longitude"?: number,
	"width"?: number,
	"height"?: number,
	"creationDateTime"?: string
};

export const PhotoMediaMetadata = autoguard.Object.of<PhotoMediaMetadata>({
	"metadataType": autoguard.NumberLiteral.of(4),
	"title": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"artist": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"location": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	),
	"latitude": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"longitude": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"width": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"height": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"creationDateTime": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.String
	)
});

export type MediaStatus = {
	"mediaSessionId": number,
	"media"?: MediaInformation,
	"playbackRate": number,
	"playerState": "IDLE" | "PLAYING" | "BUFFERING" | "PAUSED",
	"idleReason"?: "CANCELLED" | "INTERRUPTED" | "FINISHED" | "ERROR",
	"currentTime": number,
	"supportedMediaCommands": number,
	"volume": Volume,
	"customData"?: Record<string, undefined | any>
};

export const MediaStatus = autoguard.Object.of<MediaStatus>({
	"mediaSessionId": autoguard.Number,
	"media": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Reference.of<MediaInformation>(() => MediaInformation)
	),
	"playbackRate": autoguard.Number,
	"playerState": autoguard.Union.of(
		autoguard.StringLiteral.of("IDLE"),
		autoguard.StringLiteral.of("PLAYING"),
		autoguard.StringLiteral.of("BUFFERING"),
		autoguard.StringLiteral.of("PAUSED")
	),
	"idleReason": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Union.of(
			autoguard.StringLiteral.of("CANCELLED"),
			autoguard.StringLiteral.of("INTERRUPTED"),
			autoguard.StringLiteral.of("FINISHED"),
			autoguard.StringLiteral.of("ERROR")
		)
	),
	"currentTime": autoguard.Number,
	"supportedMediaCommands": autoguard.Number,
	"volume": autoguard.Reference.of<Volume>(() => Volume),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Load = {
	"requestId": number,
	"type": "LOAD",
	"media": MediaInformation,
	"autoplay"?: boolean,
	"currentTime"?: number,
	"customData"?: Record<string, undefined | any>
};

export const Load = autoguard.Object.of<Load>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("LOAD"),
	"media": autoguard.Reference.of<MediaInformation>(() => MediaInformation),
	"autoplay": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Boolean
	),
	"currentTime": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Pause = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "PAUSE",
	"customData"?: Record<string, undefined | any>
};

export const Pause = autoguard.Object.of<Pause>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("PAUSE"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Seek = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "SEEK",
	"resumeState"?: "PLAYBACK_START" | "PLAYBACK_PAUSE",
	"currentTime"?: number,
	"customData"?: Record<string, undefined | any>
};

export const Seek = autoguard.Object.of<Seek>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("SEEK"),
	"resumeState": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Union.of(
			autoguard.StringLiteral.of("PLAYBACK_START"),
			autoguard.StringLiteral.of("PLAYBACK_PAUSE")
		)
	),
	"currentTime": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Stop = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "STOP",
	"customData"?: Record<string, undefined | any>
};

export const Stop = autoguard.Object.of<Stop>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("STOP"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Play = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "PLAY",
	"customData"?: Record<string, undefined | any>
};

export const Play = autoguard.Object.of<Play>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("PLAY"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type GetStatus = {
	"mediaSessionId"?: number,
	"requestId": number,
	"type": "GET_STATUS",
	"customData"?: Record<string, undefined | any>
};

export const GetStatus = autoguard.Object.of<GetStatus>({
	"mediaSessionId": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("GET_STATUS"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type SetVolume = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "VOLUME",
	"volume": Volume,
	"customData"?: Record<string, undefined | any>
};

export const SetVolume = autoguard.Object.of<SetVolume>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("VOLUME"),
	"volume": autoguard.Reference.of<Volume>(() => Volume),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type InvalidPlayerState = {
	"requestId": number,
	"type": "INVALID_PLAYER_STATE",
	"customData"?: Record<string, undefined | any>
};

export const InvalidPlayerState = autoguard.Object.of<InvalidPlayerState>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("INVALID_PLAYER_STATE"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type LoadFailed = {
	"requestId": number,
	"type": "LOAD_FAILED",
	"customData"?: Record<string, undefined | any>
};

export const LoadFailed = autoguard.Object.of<LoadFailed>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("LOAD_FAILED"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type LoadCancelled = {
	"requestId": number,
	"type": "LOAD_CANCELLED",
	"customData"?: Record<string, undefined | any>
};

export const LoadCancelled = autoguard.Object.of<LoadCancelled>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("LOAD_CANCELLED"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type InvalidRequest = {
	"requestId": number,
	"type": "INVALID_REQUEST",
	"reason": "INVALID_COMMAND" | "DUPLICATE_REQUESTID",
	"customData"?: Record<string, undefined | any>
};

export const InvalidRequest = autoguard.Object.of<InvalidRequest>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("INVALID_REQUEST"),
	"reason": autoguard.Union.of(
		autoguard.StringLiteral.of("INVALID_COMMAND"),
		autoguard.StringLiteral.of("DUPLICATE_REQUESTID")
	),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type MediaStatusResponse = {
	"requestId": number,
	"type": "MEDIA_STATUS",
	"status": MediaStatus[],
	"customData"?: Record<string, undefined | any>
};

export const MediaStatusResponse = autoguard.Object.of<MediaStatusResponse>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("MEDIA_STATUS"),
	"status": autoguard.Array.of(autoguard.Reference.of<MediaStatus>(() => MediaStatus)),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Autoguard = {
	"Image": Image,
	"Volume": Volume,
	"MediaInformation": MediaInformation,
	"GenericMediaMetadata": GenericMediaMetadata,
	"MovieMediaMetadata": MovieMediaMetadata,
	"TvShowMediaMetadata": TvShowMediaMetadata,
	"MusicTrackMediaMetadata": MusicTrackMediaMetadata,
	"PhotoMediaMetadata": PhotoMediaMetadata,
	"MediaStatus": MediaStatus,
	"Load": Load,
	"Pause": Pause,
	"Seek": Seek,
	"Stop": Stop,
	"Play": Play,
	"GetStatus": GetStatus,
	"SetVolume": SetVolume,
	"InvalidPlayerState": InvalidPlayerState,
	"LoadFailed": LoadFailed,
	"LoadCancelled": LoadCancelled,
	"InvalidRequest": InvalidRequest,
	"MediaStatusResponse": MediaStatusResponse
};

export const Autoguard = {
	"Image": Image,
	"Volume": Volume,
	"MediaInformation": MediaInformation,
	"GenericMediaMetadata": GenericMediaMetadata,
	"MovieMediaMetadata": MovieMediaMetadata,
	"TvShowMediaMetadata": TvShowMediaMetadata,
	"MusicTrackMediaMetadata": MusicTrackMediaMetadata,
	"PhotoMediaMetadata": PhotoMediaMetadata,
	"MediaStatus": MediaStatus,
	"Load": Load,
	"Pause": Pause,
	"Seek": Seek,
	"Stop": Stop,
	"Play": Play,
	"GetStatus": GetStatus,
	"SetVolume": SetVolume,
	"InvalidPlayerState": InvalidPlayerState,
	"LoadFailed": LoadFailed,
	"LoadCancelled": LoadCancelled,
	"InvalidRequest": InvalidRequest,
	"MediaStatusResponse": MediaStatusResponse
};
