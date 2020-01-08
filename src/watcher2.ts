/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */


import * as path from "path";
const chokidar = require('chokidar');
import * as fs from 'fs';
import {FileAction} from '@root/fileaction';
import {AppMisc} from '@root/misc/app-welcome';
import {CliCommander} from '@root/utils/cli.commander';
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
	private watchDir  = "/mnt/c/Freedom/cm-igniter-build/test-watch-dir";
	private fileActions = new Array<FileAction>();
	private isReady: boolean;
	private isProgress: boolean = false;

	constructor() {
		AppMisc.showWelcomeScreen();

		let firstParam = CliCommander.getFirst();
		Logger.logYellow("First Param ::", firstParam);

		Logger.logYellow("Watcher Initializing watcher...");
		this.initWatcher();
		Logger.logGreen("Watcher Initialized...");
	}

	private initWatchDir() {
		if (false === fs.existsSync(this.watchDir)) {
			Logger.logFatalError(`Watch Directory "${this.watchDir}" does not exist, bailing out!`);
			process.exit(266);
		}

		Logger.logGreen(`Watching directory ::`, this.watchDir);
	}

	public initWatcher() {
		this.initWatchDir();

		let scope = this;
		let result: boolean = false;
		let watcher = chokidar.watch(this.watchDir, {ignored: /[\/\\]\./, persistent: true});

		this.fileActions.push(
			new FileAction('.ts', ActionType.Recompile)
		);

		watcher
			.on('add',    function(path) { scope.onChange(path, ChangeType.Added); } )
			.on('change', function(path) { scope.onChange(path, ChangeType.Changed); } )
			.on('unlink', function(path) { scope.onChange(path, ChangeType.Unlink); } )
			.on('error',  function(path) { scope.onChange(path, ChangeType.Error); } )
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


//		Logger.logPurple('AAAA Changed ::', ext);

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

let watchService = new CmBuildWatch();
//watchService.onChange('/mnt/c/Freedom/cm-igniter-build/cp.ts', ChangeType.Changed);

//watchService.Test_changeDir();
