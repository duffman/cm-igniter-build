"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cli_logger_1 = require("@commander/cli.logger");
const chokidar = require('chokidar');
const fileaction_1 = require("@root/fileaction");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
class CmBuildWatch {
    constructor() {
        this.watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind";
        this.fileActions = new Array();
    }
    /**
     * Add New File Action
     * @param {string} fileExt
     * @param {ActionType} actionType
     */
    addFileAction(fileExt, actionType) {
        let fileAction = new fileaction_1.FileAction(fileExt, actionType);
        this.fileActions.push(fileAction);
    }
    initWatcher() {
        let scope = this;
        let watcher = chokidar.watch(this.watchDir, { ignored: /[\/\\]\./, persistent: true });
        watcher
            .on('add', function (path) { scope.onChange(path, ChangeType.Added); })
            .on('change', function (path) { scope.onChange(path, ChangeType.Changed); })
            .on('unlink', function (path) { scope.onChange(path, ChangeType.Unlink); })
            .on('error', function (path) { scope.onChange(path, ChangeType.Error); });
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
        //		var path = require('path')
        let fileExt = path.extname(filename);
        cli_logger_1.Logger.logPurple('Changed ::', filename);
        cli_logger_1.Logger.logGreen('Changed EXT ::', fileExt);
        //console.log('Path: "' + path + '"', type);
    }
    /**
     * Execute the tsPath
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
    Test_changeDir() {
        console.log('Starting directory: ' + process.cwd());
        try {
            process.chdir('/tmp');
            console.log('New directory: ' + process.cwd());
        }
        catch (err) {
            console.log('chdir: ' + err);
        }
    }
}
exports.CmBuildWatch = CmBuildWatch;
let watchService = new CmBuildWatch();
//watchService.initWatcher();
watchService.Test_changeDir();
/*
watchService.Shell_tsCompile();
watchService.Shell_tsPath();
watchService.Shell_ls();
*/ 
