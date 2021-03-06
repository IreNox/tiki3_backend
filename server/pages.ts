﻿import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as http from 'http';
import * as sdk from './sdk';
import * as typesPage from './types/types.page';

export default class Pages {
    private pages: { [s: string]: typesPage.Page; } = {};

    constructor() {
        var files: string[] = fs.readdirSync('./pages');

        for (var index in files) {
            var file: string = files[index];
            if (!sdk.core.endsWith(file, '.js')) {
                continue;
            }

            var fileParts: string[] = file.split('.');
            var moduleName: string = fileParts[1];
            var fileName: string = './' + path.join('./pages', file);

            var page = require(fileName).default;
            this.pages[moduleName] = new page();
        }
    }

	public getRequestHandler(): express.RequestHandler {
		var pageManager: Pages = this;

		return function (req: express.Request, res: express.Response, next: Function): any {
			pageManager.runRequest(req, res);
		};
	}

    private runRequest(request: express.Request, response: express.Response): void {
        var pageName = url.parse(request.url).pathname.substring(1);
        if (pageName in this.pages) {
            var inputData: any = {};
            if (request.method == 'POST') {
                for (var key in request.body) {
                    inputData[key] = request.body[key];
                }
            }

            for (var key in request.query) {
                inputData[key] = request.query[key];
            }

			if (!request.session["data"]) {
				request.session["data"] = {};
			}
			var sessionData: typesPage.SessionData = request.session["data"];

            this.pages[pageName].run(inputData, sessionData, function (obj) {
				response.json(obj);
            });
        }
        else {
            response.writeHead(404, "Not found", { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ error: "Not found", pageName: pageName }));
        }
    }
}
