"use strict";
exports.__esModule = true;
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var builder_bot_1 = require("../bot/builder-bot");
var watcher_bot_1 = require("../bot/watcher-bot");
var BotTest = /** @class */ (function () {
    function BotTest() {
        var watchBot = new watcher_bot_1.WatcherBot();
        var buildBot = new builder_bot_1.BuilderBot();
        console.log('watchBot :: name ::', watchBot.name);
        console.log('buildBot :: name ::', watchBot.name);
    }
    return BotTest;
}());
exports.BotTest = BotTest;
var bbt = new BotTest();
