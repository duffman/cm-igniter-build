/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import * as path from "path";
const chokidar = require('chokidar');

//const { exec } = require("child_process");

//import { exec } from "child_process";
//import * as chokidar from 'chokidar';
import * as fs from 'fs';
import {FileAction} from '@root/fileaction';
import {AppMisc} from '@root/misc/app-welcome';
import {ErrorType} from '@root/app.const';
import {Logger} from '@root/lib/cli-commander/cli.logger';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

enum ActionType {
	NoAction     = 0,
	Recompile    = 1
}

enum ChangeType {
	Added        = 1,
	Changed      = 2,
	Unlink       = 3,
	Error        = 4
}

export class CmBuildWatch {
	private watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind/test-project";
	private fileActions = new Array<FileAction>();
	private isReady: boolean;
	private isProgress: boolean = false;

	constructor(autoInit: boolean = true) {
		AppMisc.showWelcomeScreen();

		if (false === autoInit) return;

		this.initWatcher().then(res => {
			this.changeDir(this.watchDir).then(res => {
				Logger.logYellow("Watcher Initializing watcher...");
				this.initWatcher();
				Logger.logGreen("Watcher Initialized...");
			}).catch(err => {
				process.exit(ErrorType.ERR_SWITCH_DIR)
			});
		}).catch(err => {
			Logger.logError("startWatchBot rejection ::", err, true);
		});
	}

	public initWatcher(): Promise<boolean> {
		let scope = this;
		let result: boolean = false;

		return new Promise((resolve, reject) => {

			let watcher = chokidar.watch(this.watchDir, {ignored: /[\/\\]\./, persistent: true});

			this.fileActions.push(
				new FileAction('.ts', ActionType.Recompile)
			);

			try {
				watcher
					.on('add',    function(path) { scope.onChange(path, ChangeType.Added); } )
					.on('change', function(path) { scope.onChange(path, ChangeType.Changed); } )
					.on('unlink', function(path) { scope.onChange(path, ChangeType.Unlink); } )
					.on('error',  function(path) { scope.onChange(path, ChangeType.Error); } )

				resolve(true);
			} catch (err) {
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

	public test() {
		this.changeDir(this.watchDir).then(res => {
			Logger.logYellow("Watcher Initializing watcher...");
			this.initWatcher();
			Logger.logGreen("Watcher Initialized...");
		}).catch(err => {
			process.exit(ErrorType.ERR_SWITCH_DIR)
		});
	}

	// Something have changed in the watched directory
	// Feeling out yoda expressions
	//Todo: Come to a decision regarding Yoda...
	public onChange(filename: string, type: ChangeType) {
		if (false === this.isReady) {

		}

		let ext = path.extname(filename);

		for (const fileAct in this.fileActions) {
			console.log('EXT "', fileAct);
		}


		Logger.logPurple('AAAA Changed ::', ext);

		//console.log('Path: "' + path + '"', type);
	}

	/**
	 * Execute the q3ööqååö
	 * @constructor
	 */
	public Shell_tsCompile() {
		Logger.logPurple("Shell_tsCompile...");

		async function tsc() {
			const { stdout, stderr } = await exec('tsc');
			console.log('stdout:', stdout);
			console.log('stderr:', stderr);
		}

		tsc();
	}

	public Shell_tsPath() {
		Logger.logPurple("Shell_tsPath...");

		async function tsc() {
			const { stdout, stderr } = await exec('tspath --f');
			console.log('stdout:', stdout);
			console.log('stderr:', stderr);
		}

		tsc();
	}

	public Shell_ls() {
		Logger.logPurple("Shell_tsPath...");

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
}

let watchService = new CmBuildWatch(true);
//watchService.onChange('/mnt/c/Freedom/cm-igniter-build/cp.ts', ChangeType.Changed);

//watchService.Test_changeDir();

/*
watchService.Shell_tsCompile();
watchService.Shell_tsPath();
watchService.Shell_ls();
*/