/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { Logger } from '@commander/cli.logger';
import * as path from "path";
const chokidar = require('chokidar');

//const { exec } = require("child_process");

//import { exec } from "child_process";
//import * as chokidar from 'chokidar';
import * as fs from 'fs';
import {FileAction} from '@root/fileaction';

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

	constructor() {
		watchService.initWatcher().then(res => {
			Logger.logGreen("Initializing watcher...");
			this.initWatcher();
			Logger.logGreen("Watcher Initialized...");
		}).catch(err => {
			Logger.logError("initWatcher rejection ::", err, true);
		});
	}

	public initWatcher(): Promise<boolean> {
		let scope = this;
		let result: boolean = false;

		return new Promise((result, reject) => {
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

	private onChange(filename: string, type: ChangeType) {
		let ext = path.extname(filename);

		for (const fileAct in this.fileActions) {
			console.log('ACTIONT ::', fileAct);
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
	public changeDir(targetDir: string) {
		console.log('Starting directory: ' + process.cwd());
		try {
			process.chdir('/tmp');
		}
		catch (err) {
			console.log('chdir: ' + err);
		}
	}
}

let watchService = new CmBuildWatch();


//watchService.Test_changeDir();

/*
watchService.Shell_tsCompile();
watchService.Shell_tsPath();
watchService.Shell_ls();
*/