import { CliCommander } from "@root/utils/cli.commander";


var watch = require('node-watch');

export class CmBuild {
	constructor() {
		console.log(
			CliCommander.getFirst()
		);
		console.log('Coldmind Software');

		this.watchFiles();
	}

	/**
	 * Watch Files
	 */
	public watchFiles() {
		let watchDir = "/Users/patrikforsberg/Projects/Wizum/wizum.node.backend.git";

		watch(watchDir, { recursive: true }, (evt, name) => {
			console.log('%s changed.', name);
		});
	}
}
