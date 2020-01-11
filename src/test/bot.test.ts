/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import {BuilderBot} from '../bot/builder-bot';
import {WatcherBot} from '../bot/watcher-bot';
import {ActionType} from '@root/app.const';

export class BotTest {
	constructor() {
		let watchBot = new WatcherBot();
		let buildBot = new BuilderBot();

		console.log('watchBot :: name ::', watchBot.name);
		console.log('buildBot :: name ::', watchBot.name);

		buildBot.addFileAction('.ts', ActionType.Recompile);
		buildBot.addFileAction('.html', ActionType.Debug);
		buildBot.addFileAction('.txt', ActionType.Log);

		let res = buildBot.getFileAction('.TS');
		
		console.log('RES ::', res);
	}
}

let bbt = new BotTest();