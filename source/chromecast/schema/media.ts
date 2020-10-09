// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";
import { MediaInformation, Volume, MediaStatus } from "./objects";

export type LOAD = {
	"requestId": number,
	"type": "LOAD",
	"media": MediaInformation,
	"autoplay"?: boolean,
	"currentTime"?: number,
	"customData"?: Record<string, undefined | any>
};

export const LOAD = autoguard.Object.of<LOAD>({
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

export type PAUSE = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "PAUSE",
	"customData"?: Record<string, undefined | any>
};

export const PAUSE = autoguard.Object.of<PAUSE>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("PAUSE"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type SEEK = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "SEEK",
	"resumeState"?: "PLAYBACK_START" | "PLAYBACK_PAUSE",
	"currentTime"?: number,
	"customData"?: Record<string, undefined | any>
};

export const SEEK = autoguard.Object.of<SEEK>({
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

export type STOP = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "STOP",
	"customData"?: Record<string, undefined | any>
};

export const STOP = autoguard.Object.of<STOP>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("STOP"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type PLAY = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "PLAY",
	"customData"?: Record<string, undefined | any>
};

export const PLAY = autoguard.Object.of<PLAY>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("PLAY"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type GET_STATUS = {
	"mediaSessionId"?: number,
	"requestId": number,
	"type": "GET_STATUS",
	"customData"?: Record<string, undefined | any>
};

export const GET_STATUS = autoguard.Object.of<GET_STATUS>({
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

export type VOLUME = {
	"mediaSessionId": number,
	"requestId": number,
	"type": "VOLUME",
	"volume": Volume,
	"customData"?: Record<string, undefined | any>
};

export const VOLUME = autoguard.Object.of<VOLUME>({
	"mediaSessionId": autoguard.Number,
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("VOLUME"),
	"volume": autoguard.Reference.of<Volume>(() => Volume),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type INVALID_PLAYER_STATE = {
	"requestId": number,
	"type": "INVALID_PLAYER_STATE",
	"customData"?: Record<string, undefined | any>
};

export const INVALID_PLAYER_STATE = autoguard.Object.of<INVALID_PLAYER_STATE>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("INVALID_PLAYER_STATE"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type LOAD_FAILED = {
	"requestId": number,
	"type": "LOAD_FAILED",
	"customData"?: Record<string, undefined | any>
};

export const LOAD_FAILED = autoguard.Object.of<LOAD_FAILED>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("LOAD_FAILED"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type LOAD_CANCELLED = {
	"requestId": number,
	"type": "LOAD_CANCELLED",
	"customData"?: Record<string, undefined | any>
};

export const LOAD_CANCELLED = autoguard.Object.of<LOAD_CANCELLED>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("LOAD_CANCELLED"),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type INVALID_REQUEST = {
	"requestId": number,
	"type": "INVALID_REQUEST",
	"reason": "INVALID_COMMAND" | "DUPLICATE_REQUESTID",
	"customData"?: Record<string, undefined | any>
};

export const INVALID_REQUEST = autoguard.Object.of<INVALID_REQUEST>({
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

export type MEDIA_STATUS = {
	"requestId": number,
	"type": "MEDIA_STATUS",
	"status": MediaStatus[],
	"customData"?: Record<string, undefined | any>
};

export const MEDIA_STATUS = autoguard.Object.of<MEDIA_STATUS>({
	"requestId": autoguard.Number,
	"type": autoguard.StringLiteral.of("MEDIA_STATUS"),
	"status": autoguard.Array.of(autoguard.Reference.of<MediaStatus>(() => MediaStatus)),
	"customData": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Record.of(autoguard.Any)
	)
});

export type Autoguard = {
	"LOAD": LOAD,
	"PAUSE": PAUSE,
	"SEEK": SEEK,
	"STOP": STOP,
	"PLAY": PLAY,
	"GET_STATUS": GET_STATUS,
	"VOLUME": VOLUME,
	"INVALID_PLAYER_STATE": INVALID_PLAYER_STATE,
	"LOAD_FAILED": LOAD_FAILED,
	"LOAD_CANCELLED": LOAD_CANCELLED,
	"INVALID_REQUEST": INVALID_REQUEST,
	"MEDIA_STATUS": MEDIA_STATUS
};

export const Autoguard = {
	"LOAD": LOAD,
	"PAUSE": PAUSE,
	"SEEK": SEEK,
	"STOP": STOP,
	"PLAY": PLAY,
	"GET_STATUS": GET_STATUS,
	"VOLUME": VOLUME,
	"INVALID_PLAYER_STATE": INVALID_PLAYER_STATE,
	"LOAD_FAILED": LOAD_FAILED,
	"LOAD_CANCELLED": LOAD_CANCELLED,
	"INVALID_REQUEST": INVALID_REQUEST,
	"MEDIA_STATUS": MEDIA_STATUS
};
