// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";
import { Album, Artist, Track } from "../../media/schema/objects";

export type ContextAlbum = Album;

export const ContextAlbum = autoguard.Reference.of<Album>(() => Album);

export type ContextArtist = Artist;

export const ContextArtist = autoguard.Reference.of<Artist>(() => Artist);

export type ContextTrack = Track;

export const ContextTrack = autoguard.Reference.of<Track>(() => Track);

export type Context = ContextArtist | ContextAlbum;

export const Context = autoguard.Union.of(
	autoguard.Reference.of<ContextArtist>(() => ContextArtist),
	autoguard.Reference.of<ContextAlbum>(() => ContextAlbum)
);

export type ContextItem = ContextTrack;

export const ContextItem = autoguard.Reference.of<ContextTrack>(() => ContextTrack);

export type Device = {
	"id": string,
	"type": string,
	"name": string
};

export const Device = autoguard.Object.of<Device>({
	"id": autoguard.String,
	"type": autoguard.String,
	"name": autoguard.String
});

export type Session = {
	"context"?: Context,
	"device"?: Device,
	"index"?: number,
	"playback": boolean,
	"progress"?: number
};

export const Session = autoguard.Object.of<Session>({
	"context": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Reference.of<Context>(() => Context)
	),
	"device": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Reference.of<Device>(() => Device)
	),
	"index": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	),
	"playback": autoguard.Boolean,
	"progress": autoguard.Union.of(
		autoguard.Undefined,
		autoguard.Number
	)
});

export type Autoguard = {
	"ContextAlbum": ContextAlbum,
	"ContextArtist": ContextArtist,
	"ContextTrack": ContextTrack,
	"Context": Context,
	"ContextItem": ContextItem,
	"Device": Device,
	"Session": Session
};

export const Autoguard = {
	"ContextAlbum": ContextAlbum,
	"ContextArtist": ContextArtist,
	"ContextTrack": ContextTrack,
	"Context": Context,
	"ContextItem": ContextItem,
	"Device": Device,
	"Session": Session
};
