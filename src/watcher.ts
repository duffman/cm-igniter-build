/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import * as path from "path";
import { Logger } from '@commander/cli.logger';

const chokidar = require('chokidar');

//const { exec } = require("child_process");

//import { exec } from "child_process";
//import * as chokidar from 'chokidar';
import * as fs from 'fs';
import {FileAction} from '@root/fileaction';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export class CmBuildWatch {
	private watchDir = "/mnt/c/Freedom/therise-rc1-www-coldmind";
	private fileActions: Array<FileAction>;

	constructor() {
		this.fileActions = new Array<FileAction>();

	}

	/**
	 * Add New File Action
	 * @param {string} fileExt
	 * @param {ActionType} actionType
	 */
	public addFileAction(fileExt: string, actionType: ActionType) {
		let fileAction = new FileAction(fileExt, actionType);
		this.fileActions.push(fileAction);
	}

	public initWatcher() {
		let scope = this;
		let watcher = chokidar.watch(this.watchDir, {ignored: /[\/\\]\./, persistent: true});

		watcher
			.on('add',    function(path) { scope.onChange(path, ChangeType.Added);} )
			.on('change', function(path) { scope.onChange(path, ChangeType.Changed);} )
			.on('unlink', function(path) { scope.onChange(path, ChangeType.Unlink);} )
			.on('error',  function(path) { scope.onChange(path, ChangeType.Error);} )


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


//		var path = require('path')

		let fileExt = path.extname(filename);

		Logger.logPurple('Changed ::', filename);
		Logger.logGreen('Changed EXT ::', fileExt);


		//console.log('Path: "' + path + '"', type);
	}

	/**
	 * Execute the tsPath
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
	public Test_changeDir() {
		console.log('Starting directory: ' + process.cwd());
		try {
			process.chdir('/tmp');
			console.log('New directory: ' + process.cwd());
		}
		catch (err) {
			console.log('chdir: ' + err);
		}
	}
}

let watchService = new CmBuildWatch();

//watchService.initWatcher();

watchService.Test_changeDir();

/*
watchService.Shell_tsCompile();
watchService.Shell_tsPath();
watchService.Shell_ls();
*/