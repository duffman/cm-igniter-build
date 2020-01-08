"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var fs = __importStar(require("fs"));
var DirectoryWatcher = require('directory-watcher');
var Testapp = /** @class */ (function () {
    function Testapp() {
        this.watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind/test-watch-dir";
        // Example when handled through fs.watch() listener
        fs.watch(this.watchDir, { encoding: 'buffer' }, function (eventType, filename) {
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
    return Testapp;
}());
exports.Testapp = Testapp;
var app = new Testapp();
