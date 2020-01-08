/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { IProjectBot }                     from '@root/bot/project-bot-type';
import { ActionType }                      from '@root/app.const';
import { FileAction }                      from '@root/fileaction';
import * as util                           from 'util';
import {Logger} from '@root/lib/cli-commander/cli.logger';
import {BuildResult} from '@root/models/BuildResult';
import {CompileResult} from '@root/models/CompileResult';

const exec = util.promisify(require('child_process').exec);

export class BuilderBot implements IProjectBot {
	private fileActions: Array<FileAction>;

	constructor() {
		this.fileActions = new Array<FileAction>();
	}

	/**
	 * Assign a new file action to the Builder Bot
	 * @param {string} fileExtension
	 * @param {ActionType} actionType
	 */
	public addFileAction(fileExtension: string, actionType: ActionType) {
		this.fileActions.push(
			new FileAction(fileExtension, actionType)
		);
	}

	/**
	 * Debug method to show all file actions
	 */
	public showFileActions() {
		for (const fileAct of this.fileActions) {
			Logger.logYellow('fileAction ::', fileAct);
		}
	}

	public buildProject(projectPath: string): Promise<BuildResult>  {

	}

	/**
	 * Execute the q3ööqååö
	 * @constructor
	 */
	public Shell_executeCompiler(): CompileResult {
		let result = new CompileResult();

		Logger.logPurple("Shell_tsCompile...");

		//Todo: Do a real parse of the rawOutput
		async function compile() {
			const { stdout, stderr } = await exec('tsc');
			result.rawError = stderr;
			result.rawOutput = stdout;
			result.success = result.rawError === null;
			result.haveErrors === (result.success === false);
		}

		compile();

		return result;
	}

	public Shell_tsCompiler(): CompileResult {
		Logger.logPurple("Running TypeScript project Compiler...");
		return this.Shell_executeCompiler('tsc');
	}

	public Shell_tsPath(): CompileResult {
		Logger.logPurple("Running TSPath...");
		return this.Shell_executeCompiler('tspath --f');
 	}
}