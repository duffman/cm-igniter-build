/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import * as fs from 'fs';

//
//var DirectoryWatcher = require('directory-watcher');

export class Testapp {
	private watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind/test-watch-dir";

	constructor() {

		// Example when handled through fs.watch() listener
		fs.watch(this.watchDir, { encoding: 'buffer' }, (eventType, filename) => {
			if (filename) {
				console.log(filename);
				// Prints: <Buffer ...>
			}
		});


		/*
		DirectoryWatcher.create(this.watchDir, function(err, watcher) {
			watcher.once('change', function(files) {
				console.log('will fire once');
			});

			watcher.on('delete', function(files) {
				console.log('%s deleted', files);
			});

			watcher.on('add', function(files) {
				console.log('%s added', files);
			});
		});


		*/

	}
}

let app = new Testapp();