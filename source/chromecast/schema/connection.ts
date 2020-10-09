// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "@joelek/ts-autoguard";

export type CONNECT = {
	"type": "CONNECT"
};

export const CONNECT = autoguard.Object.of<CONNECT>({
	"type": autoguard.StringLiteral.of("CONNECT")
});

export type CLOSE = {
	"type": "CLOSE"
};

export const CLOSE = autoguard.Object.of<CLOSE>({
	"type": autoguard.StringLiteral.of("CLOSE")
});

export type Autoguard = {
	"CONNECT": CONNECT,
	"CLOSE": CLOSE
};

export const Autoguard = {
	"CONNECT": CONNECT,
	"CLOSE": CLOSE
};
