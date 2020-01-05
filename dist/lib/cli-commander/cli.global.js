"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CliGlobal;
(function (CliGlobal) {
    CliGlobal.DebugMode = false;
    let DebugReportingLevel;
    (function (DebugReportingLevel) {
        DebugReportingLevel[DebugReportingLevel["None"] = 0] = "None";
        DebugReportingLevel[DebugReportingLevel["Low"] = 1] = "Low";
        DebugReportingLevel[DebugReportingLevel["Medium"] = 2] = "Medium";
        DebugReportingLevel[DebugReportingLevel["High"] = 3] = "High";
    })(DebugReportingLevel = CliGlobal.DebugReportingLevel || (CliGlobal.DebugReportingLevel = {}));
    let Debug;
    (function (Debug) {
        Debug.DebugLog = false;
        Debug.DebugLevel = DebugReportingLevel.Low;
        function Verbose() {
            return this.DebugLevel == DebugReportingLevel.High;
        }
        Debug.Verbose = Verbose;
    })(Debug = CliGlobal.Debug || (CliGlobal.Debug = {}));
})(CliGlobal = exports.CliGlobal || (exports.CliGlobal = {}));