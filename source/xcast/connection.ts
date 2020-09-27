// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type Connect = {
	"type": "CONNECT"
};

export const Connect = autoguard.Object.of<{
	"type": "CONNECT"
}>({
	"type": autoguard.StringLiteral.of("CONNECT")
});

export type Close = {
	"type": "CLOSE"
};

export const Close = autoguard.Object.of<{
	"type": "CLOSE"
}>({
	"type": autoguard.StringLiteral.of("CLOSE")
});

export type Autoguard = {
	"Connect": Connect,
	"Close": Close
};

export const Autoguard = {
	"Connect": Connect,
	"Close": Close
};
