/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { ActionType } from '@root/app.const';

export class FileAction {
	constructor(public Extension: string, public Action: ActionType ) {}
}