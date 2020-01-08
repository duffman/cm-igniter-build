/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {ChangeType} from '@root/app.const';

export class MiscUtils {
	public static ChangeTypeToStr(cType: ChangeType): string {
		let result = "Undefined";
		switch (cType) {
			case ChangeType.Added:
				result = "Added";
				break;

			case ChangeType.Changed:
				result = "Changed";
				break;

			case ChangeType.Unlink:
				result = "Removed";
				break;
		}

		return result;
	}

}