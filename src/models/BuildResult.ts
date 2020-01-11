/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {CompileResult} from '@root/models/CompileResult';

/**
 * Contains the result of a project build
 */
export class BuildResult {
	constructor(public success: boolean = true,
				public compilerResults: Array<CompileResult> = new Array<CompileResult>(),
				public rawError: string = null,
				public haveErrors: boolean = false) {}

	public addOutputResult(result: CompileResult) {
		this.compilerResults.push(result);
	}
}