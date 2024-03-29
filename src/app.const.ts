/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

enum ActionType {
	Undefined    = -1,
	NoAction     = 0,
	Recompile    = 1,
	Log          = 2,
	Debug        = 3
}

enum ChangeType {
	Added        = 1,
	Changed      = 2,
	Unlink       = 3,
	Error        = 4
}

/******************************************
 * Error Codes
 *****************************************/
enum ErrorType {
	ERR_SWITCH_DIR      = 445,
	ERR_COMPILER_ERROR  = 678
}

export { ActionType, ChangeType, ErrorType };
