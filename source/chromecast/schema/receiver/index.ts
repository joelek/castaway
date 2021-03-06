// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export const LAUNCH = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("LAUNCH"),
	"requestId": autoguard.guards.Number,
	"appId": autoguard.guards.String
});

export type LAUNCH = ReturnType<typeof LAUNCH["as"]>;

export const STOP = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("STOP"),
	"requestId": autoguard.guards.Number,
	"sessionId": autoguard.guards.String
});

export type STOP = ReturnType<typeof STOP["as"]>;

export const GET_STATUS = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("GET_STATUS"),
	"requestId": autoguard.guards.Number
});

export type GET_STATUS = ReturnType<typeof GET_STATUS["as"]>;

export const GET_APP_AVAILABILITY = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("GET_APP_AVAILABILITY"),
	"requestId": autoguard.guards.Number,
	"appId": autoguard.guards.Array.of(autoguard.guards.String)
});

export type GET_APP_AVAILABILITY = ReturnType<typeof GET_APP_AVAILABILITY["as"]>;

export const SET_VOLUME = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("SET_VOLUME"),
	"requestId": autoguard.guards.Number,
	"volume": autoguard.guards.Group.of(autoguard.guards.Union.of(
		autoguard.guards.Object.of({
			"level": autoguard.guards.Number
		}),
		autoguard.guards.Object.of({
			"muted": autoguard.guards.Boolean
		})
	))
});

export type SET_VOLUME = ReturnType<typeof SET_VOLUME["as"]>;

export const RECEIVER_STATUS = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("RECEIVER_STATUS"),
	"requestId": autoguard.guards.Number,
	"status": autoguard.guards.Object.of({
		"applications": autoguard.guards.Union.of(
			autoguard.guards.Array.of(autoguard.guards.Object.of({
				"appId": autoguard.guards.String,
				"displayName": autoguard.guards.String,
				"iconUrl": autoguard.guards.String,
				"isIdleScreen": autoguard.guards.Boolean,
				"launchedFromCloud": autoguard.guards.Boolean,
				"namespaces": autoguard.guards.Array.of(autoguard.guards.Object.of({
					"name": autoguard.guards.String
				})),
				"sessionId": autoguard.guards.String,
				"statusText": autoguard.guards.String,
				"transportId": autoguard.guards.String
			})),
			autoguard.guards.Undefined
		),
		"userEq": autoguard.guards.Object.of({}),
		"volume": autoguard.guards.Object.of({
			"controlType": autoguard.guards.String,
			"level": autoguard.guards.Number,
			"muted": autoguard.guards.Boolean,
			"stepInterval": autoguard.guards.Number
		})
	})
});

export type RECEIVER_STATUS = ReturnType<typeof RECEIVER_STATUS["as"]>;

export namespace Autoguard {
	export const Guards = {
		"LAUNCH": autoguard.guards.Reference.of(() => LAUNCH),
		"STOP": autoguard.guards.Reference.of(() => STOP),
		"GET_STATUS": autoguard.guards.Reference.of(() => GET_STATUS),
		"GET_APP_AVAILABILITY": autoguard.guards.Reference.of(() => GET_APP_AVAILABILITY),
		"SET_VOLUME": autoguard.guards.Reference.of(() => SET_VOLUME),
		"RECEIVER_STATUS": autoguard.guards.Reference.of(() => RECEIVER_STATUS)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
