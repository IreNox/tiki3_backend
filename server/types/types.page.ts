﻿import * as typesRest from '../types/types.rest';

export class SessionData {
	public user: typesRest.RestUser;
}

export interface RestCallback {
    (data: typesRest.RestResult): void;
}

export interface Page {
    run(inputData: any, sessionData: SessionData, callback: RestCallback): void;
}