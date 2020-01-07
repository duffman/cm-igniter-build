"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cli_logger_1 = require("@commander/cli.logger");
const path = require("path");
const chokidar = require('chokidar');
const fileaction_1 = require("@root/fileaction");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var ActionType;
(function (ActionType) {
    ActionType[ActionType["NoAction"] = 0] = "NoAction";
    ActionType[ActionType["Recompile"] = 1] = "Recompile";
})(ActionType || (ActionType = {}));
var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Added"] = 1] = "Added";
    ChangeType[ChangeType["Changed"] = 2] = "Changed";
    ChangeType[ChangeType["Unlink"] = 3] = "Unlink";
    ChangeType[ChangeType["Error"] = 4] = "Error";
})(ChangeType || (ChangeType = {}));
class CmBuildWatch {
    constructor() {
        this.watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind/test-project";
        this.fileActions = new Array();
        watchService.initWatcher().then(res => {
            cli_logger_1.Logger.logGreen("Initializing watcher...");
            this.initWatcher();
            cli_logger_1.Logger.logGreen("Watcher Initialized...");
        }).catch(err => {
            cli_logger_1.Logger.logError("initWatcher rejection ::", err, true);
        });
    }
    initWatcher() {
        let scope = this;
        let result = false;
        return new Promise((result, reject) => {
            let watcher = chokidar.watch(this.watchDir, { ignored: /[\/\\]\./, persistent: true });
            this.fileActions.push(new fileaction_1.FileAction('.ts', ActionType.Recompile));
            try {
                watcher
                    .on('add', function (path) { scope.onChange(path, ChangeType.Added); })
                    .on('change', function (path) { scope.onChange(path, ChangeType.Changed); })
                    .on('unlink', function (path) { scope.onChange(path, ChangeType.Unlink); })
                    .on('error', function (path) { scope.onChange(path, ChangeType.Error); });
            }
            catch (err) {
                reject(err);
            }
        });
        //
        // FS Watch
        //
        /*fs.watch(this.watchDir, (eventType, filename) => {
            console.log(eventType);
            // could be either 'rename' or 'change'. new file event and delete
                // also generally emit 'rename'
            console.log(filename);
        }); */
    }
    onChange(filename, type) {
        let ext = path.extname(filename);
        for (const fileAct in this.fileActions) {
            console.log('ACTIONT ::', fileAct);
        }
        cli_logger_1.Logger.logPurple('AAAA Changed ::', ext);
        //console.log('Path: "' + path + '"', type);
    }
    /**
     * Execute the q3ööqååö
     * @constructor
     */
    Shell_tsCompile() {
        cli_logger_1.Logger.logPurple("Shell_tsCompile...");
        async function tsc() {
            const { stdout, stderr } = await exec('tsc');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }
        tsc();
    }
    Shell_tsPath() {
        cli_logger_1.Logger.logPurple("Shell_tsPath...");
        async function tsc() {
            const { stdout, stderr } = await exec('tspath --f');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }
        tsc();
    }
    Shell_ls() {
        cli_logger_1.Logger.logPurple("Shell_tsPath...");
        async function ls() {
            const { stdout, stderr } = await exec('ls');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }
        ls();
    }
    /**************************************************************************
     * Test Stuff
     *************************************************************************/
    changeDir(targetDir) {
        console.log('Starting directory: ' + process.cwd());
        try {
            process.chdir('/tmp');
        }
        catch (err) {
            console.log('chdir: ' + err);
        }
    }
}
exports.CmBuildWatch = CmBuildWatch;
let watchService = new CmBuildWatch();
//watchService.Test_changeDir();
/*
watchService.Shell_tsCompile();
watchService.Shell_tsPath();
watchService.Shell_ls();
*/ 
