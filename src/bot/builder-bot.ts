/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { IProjectBot }                     from '@root/bot/project-bot-type';
import { ActionType, ChangeType, ErrorType} from '@root/app.const';
import { FileAction }                      from '@root/fileaction';
import * as util                           from 'util';
import { Logger }                          from '@root/lib/cli-commander/cli.logger';
import { BuildResult }                     from '@root/models/BuildResult';
import { CompileResult }                   from '@root/models/CompileResult';
import * as path from 'path';

const exec = util.promisify(require('child_process').exec);

export class BuilderBot implements IProjectBot {
	name: string = "Builder Bot 715";
	debugMode: boolean = true;
	private fileActions: Array<FileAction>;

	constructor() {
		this.fileActions = new Array<FileAction>();
	}

	/**
	 * Called by the Watcher Bot when a change have occurred
	 * Todo: extend the change type with action type...
	 * @param {string} filename
	 * @param {ChangeType} cType
	 */
	public commitChange(projectPath: string, filename: string, cType: ChangeType) {
		let fileExt = path.extname(filename);
		let action = this.getFileAction(fileExt);
		console.log('COMMIT CHANGE ACTION ::', action);

		if ((cType === ChangeType.Changed) &&  (action.Action === ActionType.Recompile)) {
			console.log('COMMIT CHANGE --:MATCH:- Building Project ::', filename);
			let buildRes = this.syncBuildProject(projectPath);
			Logger.logPurple("Project Build Dump ::", buildRes);
		}
	}

	/**
	 * Assign a new file action to the Builder Bot
	 * @param {string} fileExtension
	 * @param {ActionType} actionType
	 */
	//Todo: add the ability to act on change types ChangeType as well,
	// for example recompile only if a ts file is added not changed...
	public addFileAction(fileExtension: string, actionType: ActionType) {
		this.fileActions.push(
			new FileAction(fileExtension, actionType)
		);
	}

	/**
	 * Retrieve File Action by File Extension
	 * @param {string} fileExtension
	 * @returns {FileAction}
	 */
	//Todo: clean up the retarded caseinsensitive comparison
	public getFileAction(fileExtension: string, caseInsensitive: boolean = true): FileAction {
		// Create result before ev conversion to uppercase so that
		// a not hit result will contain the same ext as given upon method call
		let result = new FileAction(fileExtension, ActionType.Undefined);

		if (caseInsensitive) {
			fileExtension = fileExtension.toUpperCase();
		}

		for (const action of this.fileActions) {
			let actionFileExt = action.Extension;
			if (caseInsensitive) {
				actionFileExt = actionFileExt.toUpperCase();
			}

			if (fileExtension === actionFileExt) {
				result = action;
				break;
			}
		}

		return result;
	}

	/**
	 * Debug method to show all file actions
	 */
	public showFileActions() {
		for (const fileAct of this.fileActions) {
			Logger.logYellow('fileAction ::', fileAct);
		}
	}

	//Todo: Make dynamic through scripts and config instead of this hard coded solution...
	public syncBuildProject(projectPath: string): BuildResult  {
		let result = new BuildResult();

		//
		// Run TypeScript Compiler
		//
		let tscRes = this.shell_tsCompiler();

		if (tscRes.haveErrors) {
			Logger.logFatalError('TypeScript Compiler Failed');
			Logger.logError('StdOut ::', tscRes.rawOutput);
			Logger.logError('StdErr ::', tscRes.rawError);
			process.exit(ErrorType.ERR_COMPILER_ERROR);

		} else {
			result.addOutputResult(tscRes);
		}

		//
		// Run Path Resolver
		//
		let tsPathRes = this.shell_tsPath();

		if (tsPathRes.haveErrors) {
			Logger.logFatalError('TypeScript Path Resolver Failed');
			Logger.logError('StdOut ::', tscRes.rawOutput);
			Logger.logError('StdErr ::', tscRes.rawError);
			process.exit(ErrorType.ERR_COMPILER_ERROR);

		} else {
			result.addOutputResult(tsPathRes);
		}

		return result;
	}

	/**
	 * Execute compiler
	 * @constructor
	 */
	public shell_executeCompiler(cmd: string): CompileResult {
		let result = new CompileResult();

		Logger.logPurple("Shell_tsCompile...");

		//Todo: Do a real parse of the rawOutput
		async function compile() {
			const { stdout, stderr } = await exec(cmd);
			result.rawError = stderr;
			result.rawOutput = stdout;
			result.success = result.rawError === null;
			result.haveErrors = (result.success === false);
		}

		compile();

		return result;
	}

	/**
	 * Execute the TypeScript Compiler
	 * @returns {CompileResult}
	 * @constructor
	 */
	public shell_tsCompiler(): CompileResult {
		Logger.logPurple("Running TypeScript project Compiler...");
		return this.shell_executeCompiler('tsc');
	}

	/**
	 * Execute TSPath - TypeScript Path Resolver
	 * @returns {CompileResult}
	 * @constructor
	 */
	public shell_tsPath(): CompileResult {
		Logger.logPurple("Running TSPath...");
		return this.shell_executeCompiler('tspath --f');
 	}
}