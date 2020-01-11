"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
exports.__esModule = true;
var path = require("path");
var chokidar = require("chokidar");
var fs = require("fs");
var util = require("util");
var builder_bot_1 = require("@root/bot/builder-bot");
var cli_logger_1 = require("@root/lib/cli-commander/cli.logger");
var app_const_1 = require("@root/app.const");
var misc_utils_1 = require("@root/utils/misc-utils");
var exec = util.promisify(require('child_process').exec);
var WatcherBot = /** @class */ (function () {
    function WatcherBot() {
        this.name = "Watcher Bot 61315";
        this.debugMode = true;
        this.watchDir = "/mnt/c/Freedom/cm-igniter-build/test-watch-dir";
        this.isProgress = false;
        //
        // Configure Robot
        //
        this.configureBot();
        //
        // Validate Directory to Watch
        //
        this.initWatchDir();
        //
        // Start the Watch Robot
        //
        this.startWatchBot();
    }
    /**
     *
     * Validates the
     */
    WatcherBot.prototype.initWatchDir = function () {
        if (false === fs.existsSync(this.watchDir)) {
            cli_logger_1.Logger.logFatalError("Watch Directory \"" + this.watchDir + "\" does not exist, bailing out!");
            process.exit(266);
        }
        this.changeDir(this.watchDir);
    };
    WatcherBot.prototype.startWatchBot = function () {
        var scope = this;
        var result = false;
        //
        // Create Watcher and bind event listeners
        //
        var watcher = chokidar.watch(this.watchDir, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });
        // Something to use when events are received.
        var log = console.log.bind(console);
        // Add event listeners.
        watcher
            .on('add', function (path) { scope.onChange(path, app_const_1.ChangeType.Added); })
            .on('change', function (path) { scope.onChange(path, app_const_1.ChangeType.Changed); })
            .on('unlink', function (path) { scope.onChange(path, app_const_1.ChangeType.Unlink); });
        //.on('error',  function(path) { scope.onChange(path, ChangeType.Error); } )
    };
    WatcherBot.prototype.changeDir = function (targetDir) {
        var currDir = process.cwd();
        cli_logger_1.Logger.logGreen("Changing working directory from \"" + currDir + "\" to \"" + targetDir + "\"");
        return new Promise(function (resolve, reject) {
            try {
                process.chdir(targetDir);
                resolve(true);
            }
            catch (err) {
                cli_logger_1.Logger.logError("changeDir Error ::", err);
                reject(err);
            }
        });
    };
    WatcherBot.prototype.onChange = function (filename, cType) {
        if (false === this.isReady) {
            cli_logger_1.Logger.logDebug("onChange, returning since status isReady == false");
            return;
        }
        var changeTypeStr = misc_utils_1.MiscUtils.ChangeTypeToStr(cType);
        var fileExt = path.extname(filename);
        switch (cType) {
            case app_const_1.ChangeType.Added:
                cli_logger_1.Logger.logGreen('ADDED ::', filename + ' :: ' + fileExt);
                break;
            case app_const_1.ChangeType.Changed:
                cli_logger_1.Logger.logYellow('CHANGED ::', filename + ' :: ' + fileExt);
                break;
            case app_const_1.ChangeType.Unlink:
                cli_logger_1.Logger.logRed('UNLINKED ::', filename + ' :: ' + fileExt);
                break;
        }
        if (this.debugMode) {
            this.builderBot.showFileActions();
        }
        this.builderBot.commitChange(filename, cType);
    };
    /**
     * Configure the build robot, this function reads
     * the project config file temple-project.json and
     * configures file actions.
     */
    WatcherBot.prototype.configureBot = function () {
        this.builderBot = new builder_bot_1.BuilderBot();
        // This should be read from config or params...
        this.builderBot.addFileAction('.ts', app_const_1.ActionType.Recompile);
    };
    return WatcherBot;
}());
exports.WatcherBot = WatcherBot;
var app = new WatcherBot();
