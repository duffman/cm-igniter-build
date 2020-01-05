"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
const args = process.argv.slice(2);
class CliCommander {
    static haveArgs() {
        return args.length > 0;
    }
    static compareParam(param1, param2, ignoreCase = true) {
        param1 = param1 === undefined ? "" : param1;
        param2 = param2 === undefined ? "" : param2;
        if (ignoreCase) {
            param1 = param1.toLowerCase();
            param2 = param2.toLowerCase();
        }
        return (param1.localeCompare(param2) === 0);
    }
    static getParamAt(index) {
        if (index > -1 && index <= args.length) {
            return args[index];
        }
        else {
            return "";
        }
    }
    static getFirst() {
        return CliCommander.getParamAt(0);
    }
    static getSecond() {
        return CliCommander.getParamAt(1);
    }
    static first(paramName, ignoreCase = true) {
        let firstParam = CliCommander.getParamAt(0);
        return CliCommander.compareParam(CliCommander.getFirst(), paramName, ignoreCase);
    }
    static second(paramName, ignoreCase = true) {
        let firstParam = CliCommander.getParamAt(1);
        return CliCommander.compareParam(CliCommander.getFirst(), paramName, ignoreCase);
    }
    static debug() {
        return CliCommander.getFirst() === "debug";
    }
    parseCliArgs(args) {
    }
}
exports.CliCommander = CliCommander;
