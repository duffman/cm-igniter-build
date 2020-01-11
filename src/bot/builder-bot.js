"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var app_const_1 = require("@root/app.const");
var fileaction_1 = require("@root/fileaction");
var util = require("util");
var cli_logger_1 = require("@root/lib/cli-commander/cli.logger");
var BuildResult_1 = require("@root/models/BuildResult");
var CompileResult_1 = require("@root/models/CompileResult");
var exec = util.promisify(require('child_process').exec);
var BuilderBot = /** @class */ (function () {
    function BuilderBot() {
        this.name = "Builder Bot 715";
        this.debugMode = true;
        this.fileActions = new Array();
    }
    BuilderBot.prototype.commitChange = function (filename, cType) {
        console.log('COMMIT CHANGE!!!!!!!!');
    };
    /**
     * Assign a new file action to the Builder Bot
     * @param {string} fileExtension
     * @param {ActionType} actionType
     */
    BuilderBot.prototype.addFileAction = function (fileExtension, actionType) {
        this.fileActions.push(new fileaction_1.FileAction(fileExtension, actionType));
    };
    /**
     * Retrieve File Action by File Extension
     * @param {string} fileExtension
     * @returns {FileAction}
     */
    BuilderBot.prototype.getFileAction = function (fileExtension) {
    };
    /**
     * Debug method to show all file actions
     */
    BuilderBot.prototype.showFileActions = function () {
        for (var _i = 0, _a = this.fileActions; _i < _a.length; _i++) {
            var fileAct = _a[_i];
            cli_logger_1.Logger.logYellow('fileAction ::', fileAct);
        }
    };
    //Todo: Make dynamic through scripts and config instead of this hard coded solution...
    BuilderBot.prototype.syncBuildProject = function (projectPath) {
        var result = new BuildResult_1.BuildResult();
        //
        // Run TypeScript Compiler
        //
        var tscRes = this.shell_tsCompiler();
        if (tscRes.haveErrors) {
            cli_logger_1.Logger.logFatalError('TypeScript Compiler Failed');
            cli_logger_1.Logger.logError('StdOut ::', tscRes.rawOutput);
            cli_logger_1.Logger.logError('StdErr ::', tscRes.rawError);
            process.exit(app_const_1.ErrorType.ERR_COMPILER_ERROR);
        }
        else {
            result.addOutputResult(tscRes);
        }
        //
        // Run Path Resolver
        //
        var tsPathRes = this.shell_tsPath();
        if (tsPathRes.haveErrors) {
            cli_logger_1.Logger.logFatalError('TypeScript Path Resolver Failed');
            cli_logger_1.Logger.logError('StdOut ::', tscRes.rawOutput);
            cli_logger_1.Logger.logError('StdErr ::', tscRes.rawError);
            process.exit(app_const_1.ErrorType.ERR_COMPILER_ERROR);
        }
        else {
            result.addOutputResult(tsPathRes);
        }
        return result;
    };
    /**
     * Execute compiler
     * @constructor
     */
    BuilderBot.prototype.shell_executeCompiler = function (cmd) {
        var result = new CompileResult_1.CompileResult();
        cli_logger_1.Logger.logPurple("Shell_tsCompile...");
        //Todo: Do a real parse of the rawOutput
        function compile() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, stdout, stderr;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, exec(cmd)];
                        case 1:
                            _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                            result.rawError = stderr;
                            result.rawOutput = stdout;
                            result.success = result.rawError === null;
                            result.haveErrors = (result.success === false);
                            return [2 /*return*/];
                    }
                });
            });
        }
        compile();
        return result;
    };
    /**
     * Execute the TypeScript Compiler
     * @returns {CompileResult}
     * @constructor
     */
    BuilderBot.prototype.shell_tsCompiler = function () {
        cli_logger_1.Logger.logPurple("Running TypeScript project Compiler...");
        return this.shell_executeCompiler('tsc');
    };
    /**
     * Execute TSPath - TypeScript Path Resolver
     * @returns {CompileResult}
     * @constructor
     */
    BuilderBot.prototype.shell_tsPath = function () {
        cli_logger_1.Logger.logPurple("Running TSPath...");
        return this.shell_executeCompiler('tspath --f');
    };
    return BuilderBot;
}());
exports.BuilderBot = BuilderBot;
