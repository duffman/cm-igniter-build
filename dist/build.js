"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_commander_1 = require("@root/utils/cli.commander");
var watch = require('node-watch');
class CmBuild {
    constructor() {
        console.log(cli_commander_1.CliCommander.getFirst());
        console.log('Coldmind Software');
        this.watchFiles();
    }
    /**
     * Watch Files
     */
    watchFiles() {
        let watchDir = "/Users/patrikforsberg/Projects/Wizum/wizum.node.backend.git";
        watch(watchDir, { recursive: true }, (evt, name) => {
            console.log('%s changed.', name);
        });
    }
}
exports.CmBuild = CmBuild;
