/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

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
