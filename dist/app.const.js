/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var ActionType;
(function (ActionType) {
    ActionType[ActionType["NoAction"] = 0] = "NoAction";
    ActionType[ActionType["Recompile"] = 1] = "Recompile";
})(ActionType || (ActionType = {}));
var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Added"] = 1] = "Added";
    ChangeType[ChangeType["Changed"] = 2] = "Changed";
    ChangeType[ChangeType["Unlink"] = 3] = "Unlink";
    ChangeType[ChangeType["Error"] = 4] = "Error";
})(ChangeType || (ChangeType = {}));
