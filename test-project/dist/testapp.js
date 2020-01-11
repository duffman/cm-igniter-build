"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
const fs = require("fs");
//
//var DirectoryWatcher = require('directory-watcher');
class Testapp {
    constructor() {
        this.watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind/test-watch-dir";
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
exports.Testapp = Testapp;
let app = new Testapp();
