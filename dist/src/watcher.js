'use strict';Object.defineProperty(exports,'__esModule',{value:true});const path=require('path');const chokidar=require('chokidar');const fileaction_1=require('./fileaction');const app_welcome_1=require('./misc/app-welcome');const app_const_1=require('./app.const');const cli_logger_1=require('./lib/cli-commander/cli.logger');const util=require('util');const exec=util.promisify(require('child_process').exec);var ActionType;(function(ActionType){ActionType[ActionType['NoAction']=0]='NoAction';ActionType[ActionType['Recompile']=1]='Recompile';}(ActionType||(ActionType={})));var ChangeType;(function(ChangeType){ChangeType[ChangeType['Added']=1]='Added';ChangeType[ChangeType['Changed']=2]='Changed';ChangeType[ChangeType['Unlink']=3]='Unlink';ChangeType[ChangeType['Error']=4]='Error';}(ChangeType||(ChangeType={})));class CmBuildWatch{constructor(autoInit=true){this.watchDir='/mnt/c/Freedom/therise-rc1-www-coldmind/test-project';this.fileActions=new Array();this.isProgress=false;app_welcome_1.AppMisc.showWelcomeScreen();if(false===autoInit)return;this.initWatcher().then(res=>{this.changeDir(this.watchDir).then(res=>{cli_logger_1.Logger.logYellow('Watcher Initializing watcher...');this.initWatcher();cli_logger_1.Logger.logGreen('Watcher Initialized...');}).catch(err=>{process.exit(app_const_1.ErrorType.ERR_SWITCH_DIR);});}).catch(err=>{cli_logger_1.Logger.logError('startWatchBot rejection ::',err,true);});}initWatcher(){let scope=this;let result=false;return new Promise((resolve,reject)=>{let watcher=chokidar.watch(this.watchDir,{ignored:/[\/\\]\./,persistent:true});this.fileActions.push(new fileaction_1.FileAction('.ts',ActionType.Recompile));try{watcher.on('add',function(path){scope.onChange(path,ChangeType.Added);}).on('change',function(path){scope.onChange(path,ChangeType.Changed);}).on('unlink',function(path){scope.onChange(path,ChangeType.Unlink);}).on('error',function(path){scope.onChange(path,ChangeType.Error);});resolve(true);}catch(err){reject(err);}});}test(){this.changeDir(this.watchDir).then(res=>{cli_logger_1.Logger.logYellow('Watcher Initializing watcher...');this.initWatcher();cli_logger_1.Logger.logGreen('Watcher Initialized...');}).catch(err=>{process.exit(app_const_1.ErrorType.ERR_SWITCH_DIR);});}onChange(filename,type){if(false===this.isReady){}let ext=path.extname(filename);for(const fileAct in this.fileActions){console.log('EXT "',fileAct);}cli_logger_1.Logger.logPurple('AAAA Changed ::',ext);}Shell_tsCompile(){cli_logger_1.Logger.logPurple('Shell_tsCompile...');async function tsc(){const {stdout,stderr}=await exec('tsc');console.log('stdout:',stdout);console.log('stderr:',stderr);}tsc();}Shell_tsPath(){cli_logger_1.Logger.logPurple('Shell_tsPath...');async function tsc(){const {stdout,stderr}=await exec('tspath --f');console.log('stdout:',stdout);console.log('stderr:',stderr);}tsc();}Shell_ls(){cli_logger_1.Logger.logPurple('Shell_tsPath...');async function ls(){const {stdout,stderr}=await exec('ls');console.log('stdout:',stdout);console.log('stderr:',stderr);}ls();}changeDir(targetDir){let currDir=process.cwd();cli_logger_1.Logger.logGreen(`Changing working directory from "${currDir}" to "${targetDir}"`);return new Promise((resolve,reject)=>{try{process.chdir(targetDir);resolve(true);}catch(err){cli_logger_1.Logger.logError('changeDir Error ::',err);reject(err);}});}}exports.CmBuildWatch=CmBuildWatch;let watchService=new CmBuildWatch(true);