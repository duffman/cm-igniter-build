/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import * as path                           from "path";
import * as chokidar                       from "chokidar";
import * as fs                             from 'fs';
import * as util                           from "util";
import { BuilderBot }                      from '@root/bot/builder-bot';
import { Logger }                          from '@root/lib/cli-commander/cli.logger';
import { ActionType }                      from '@root/app.const';
import { ChangeType }                      from '@root/app.const';
import { MiscUtils }                       from '@root/utils/misc-utils';
import { IProjectBot }                     from '@root/bot/project-bot-type';

const exec = util.promisify(require('child_process').exec);

export class WatcherBot implements IProjectBot {
	name: string = "Watcher Bot 61315";
	debugMode: boolean = false;
	private builderBot: BuilderBot;
	private watchDir  = "/mnt/c/Freedom/cm-igniter-build/test-project";

	private isReady: boolean;
	private isProgress: boolean = false;

	constructor() {
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
	private initWatchDir() {
		if (false === fs.existsSync(this.watchDir)) {
			Logger.logFatalError(`Watch Directory "${this.watchDir}" does not exist, bailing out!`);
			process.exit(266);
		}

		this.changeDir(this.watchDir);
	}

	public startWatchBot() {
		let scope = this;
		let result: boolean = false;

		//
		// Create Watcher and bind event listeners
		//
		const watcher = chokidar.watch(this.watchDir, {
			ignored: /(^|[\/\\])\../, // ignore dotfiles
			persistent: true
		});

		// Something to use when events are received.
		const log = console.log.bind(console);

		// Add event listeners.
		watcher
			.on('add',    function(path) { scope.onChange(path, ChangeType.Added); } )
			.on('change', function(path) { scope.onChange(path, ChangeType.Changed); } )
			.on('unlink', function(path) { scope.onChange(path, ChangeType.Unlink); } )
			//.on('error',  function(path) { scope.onChange(path, ChangeType.Error); } )
	}

	public changeDir(targetDir: string): Promise<boolean> {
		let currDir = process.cwd();
		Logger.logGreen(`Changing working directory from "${currDir}" to "${targetDir}"`);

		return new Promise((resolve, reject) => {
			try {
				process.chdir(targetDir);
				resolve(true);
			}
			catch (err) {
				Logger.logError("changeDir Error ::",  err);
				reject(err);
			}
		});
	}

	public onChange(filename: string, cType: ChangeType) {
		if (false === this.isReady) {
			Logger.logDebug("onChange, returning since status isReady == false");
			return;
		}

		let changeTypeStr = MiscUtils.ChangeTypeToStr(cType);
		let fileExt = path.extname(filename);

		switch (cType) {
			case ChangeType.Added:
				Logger.logGreen('ADDED ::', filename + ' :: ' + fileExt);
				break;

			case ChangeType.Changed:
				Logger.logYellow('CHANGED ::', filename + ' :: ' + fileExt);
				break;

			case ChangeType.Unlink:
				Logger.logRed('UNLINKED ::', filename + ' :: ' + fileExt);
				break;
		}

		if (this.debugMode) {
			this.builderBot.showFileActions();
		}

		this.builderBot.commitChange(this.watchDir, filename, cType);
	}

	/**
	 * Configure the build robot, this function reads
	 * the project config file temple-project.json and
	 * configures file actions.
	 */
	public configureBot() {
		this.builderBot = new BuilderBot();

		// This should be read from config or params...
		this.builderBot.addFileAction('.ts', ActionType.Recompile);
	}
}

let app = new WatcherBot();
