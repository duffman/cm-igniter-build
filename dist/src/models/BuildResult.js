'use strict';Object.defineProperty(exports,'__esModule',{value:true});class BuildResult{constructor(success=true,compilerResults=new Array(),rawError=null,haveErrors=false){this.success=success;this.compilerResults=compilerResults;this.rawError=rawError;this.haveErrors=haveErrors;}addOutputResult(result){this.compilerResults.push(result);}}exports.BuildResult=BuildResult;