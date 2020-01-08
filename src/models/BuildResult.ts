/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

/**
 * Contains the result of a project build
 */
export class BuildResult {
	constructor(public success: boolean = true,
				public rawOutput: string = null,
				public rawError: string = null,
				public haveErrors: boolean = false) {}
}