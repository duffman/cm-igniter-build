/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

var chokidar = require('chokidar');

const watchDir = "/Users/patrikforsberg/Projects/Wizum/wizum.node.backend.git";

var watcher = chokidar.watch(watchDir, {ignored: /^\./, persistent: true});

watcher
	.on('add', function(path) {console.log('File', path, 'has been added');})
	.on('change', function(path) {console.log('File', path, 'has been changed');})
	.on('unlink', function(path) {console.log('File', path, 'has been removed');})
	.on('error', function(error) {console.error('Error happened', error);})
