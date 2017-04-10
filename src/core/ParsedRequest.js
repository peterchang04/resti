var Err = require("./Err");
var _ = require('lodash');

class ParsedRequest{
	constructor(method,url,requestArgs){
		this.pathArray = toPathArray(url);
		this.args = toArgs(this.pathArray,requestArgs);
		this.func = toFunc(method,this.pathArray,this.args);
		this.resource = getResource(this.pathArray);
	}
	getResults(cb){
		console.log(this.pathArray,this.args,this.func,this.resource);
	}
	getPrivateFunctions(){ // enable testing of private functions
		return {
			toPathArray:toPathArray,
			toArgs:toArgs,
			toFunc:toFunc,
			getResource:getResource
		}
	}
}

module.exports = ParsedRequest;

function toPathArray(url){
	var result = [];
	if(!url){return result}
	// get rid of leading slash
	if(url.charAt(0) === '/'){
		url = url.substring(1,url.length);
	}
	// pressplit on ?
	var urlSplit = url.split('?');
	var urlArgs = '';
	if(urlSplit.length == 2){
		urlArgs = '?' + urlSplit[1];
	}
	url = urlSplit[0];

	result = url.split('/');
	// get rid of api folder
	if(result[0] === "api"){
		result.shift();
	}
	// get rid of empty nodes
	if(result[result.length-1] === ''){
		result.pop();
	}
	// append qeustion args if necessary
	if(urlArgs){
		result.push(urlArgs);
	}
	return result;
}

function toArgs(pathArray,requestArgs = {}){
	var args = {};
	// find the subject node (it's the last non identifier on path nodes)
	var subject = "";
	pathArray.forEach(function(pathNode){
		if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8) || pathNode.charAt(0) === '?'){ // is positive integer or GUID
		/* do nothing */
		} else {
			subject = pathNode;
		}
	});

	// now sort and identifiables into args
	var curSubject = '';
	pathArray.forEach(function(pathNode){
		if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8)){ // is positive integer or GUID
			if(curSubject === subject){ // the subject becomes just ID instead of subject_id
				curSubject = '';
			}
			var argName = _.snakeCase(curSubject+'Id');
			args[argName] = pathNode;
		} else{
			if(pathNode.charAt(0) === '?'){
				let pathArgs = pathNode.substring(1,pathNode.length).split('&');
				pathArgs.forEach((a) => {
					let aSplit = a.split('=');
					let name = aSplit[0];
					let value = true;
					if(aSplit.length === 2){
						value = aSplit[1];
					}
					args[name] = value;
				});
			} else {
				curSubject = pathNode;
			}
		}
	});

	// merge args and reqArgs
	return Object.assign({},args,requestArgs);
}

function toFunc(method,pathArray,args = {}){
	var resource = '';
	pathArray.forEach(function(pathNode){
		if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8) || pathNode.charAt(0) === '?'){ // is positive integer or GUID
			/* do nothing*/
		} else {
			resource = pathNode;
		}
	});
	// override if args.method exists
	if(args.method){
		return args.method;
	}
	return method.toLowerCase() + resource.charAt(0).toUpperCase() + resource.substring(1,resource.length);
}

function getResource(pathArray){
	var resource = null;
	try{
		resource = require('../data/'+pathArray[0]+'DAO');
	}catch(e){
		/* TODO: Should probably log this */
		console.warn(e);
	}
	return resource;
}