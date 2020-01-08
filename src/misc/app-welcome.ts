/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import {Logger} from '@root/lib/cli-commander/cli.logger';


export class AppMisc {
	public static showWelcomeScreen() {
		Logger.logGreen('');
		Logger.logGreen('               /\_[]_/\ ');
		Logger.logGreen('              |] _||_ [|');
		Logger.logGreen('       ___     \/ || \/');
		Logger.logGreen('      /___\       ||');
		Logger.logGreen('     (|0 0|)      ||');
		Logger.logGreen('   __/{\U/}\_ ___/vvv');
		Logger.logGreen('  / \  {~}   / _|_P|');
		Logger.logGreen('  | /\  ~   /_/   []');
		Logger.logGreen('  |_| (____)        ');
		Logger.logGreen('   \_]/______\    Temple Warrior - Build Tool');
		Logger.logGreen('     _\_||_/_    © Coldmind Software 2020');
		Logger.logGreen('    (_,_||_,_)   BETA VERSION 0.7.5');
		Logger.logGreen('');
	}
}
