'use strict';Object.defineProperty(exports,'__esModule',{value:true});const fs=require('fs');class Testapp{constructor(){this.watchDir='/mnt/c/Freedom/therise-rc1-www-coldmind/test-watch-dir';fs.watch(this.watchDir,{encoding:'buffer'},(eventType,filename)=>{if(filename){console.log(filename);}});}}exports.Testapp=Testapp;let app=new Testapp();