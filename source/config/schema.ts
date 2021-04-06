// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type Config = {
	"certificate_key_path": string[],
	"certificate_path": string[],
	"http_port": number,
	"https_port": number,
	"media_path": string[],
	"use_demo_mode": boolean
};

export const Config = autoguard.Object.of<Config>({
	"certificate_key_path": autoguard.Array.of(autoguard.String),
	"certificate_path": autoguard.Array.of(autoguard.String),
	"http_port": autoguard.Number,
	"https_port": autoguard.Number,
	"media_path": autoguard.Array.of(autoguard.String),
	"use_demo_mode": autoguard.Boolean
});

export type Autoguard = {
	"Config": Config
};

export const Autoguard = {
	"Config": Config
};
