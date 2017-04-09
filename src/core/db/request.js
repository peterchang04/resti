'use strict';
/* Represents a query request queued for running */
class Request {
	constructor(text,params,cb){
		// get rid of hidden chars
		text = text.replace(/\t/g," "); 
		text = text.replace(/\n/g," "); 
		// set instance variables
		/* TODO detect injection */
		/* prevent multiple statements */
		this.text = text;
		this.params = params;
		this.cb = cb;
		this.attempts = 0;
	}
	getParams(){
		return this.params;
	}
	getAttempts(){
		return this.attempts;
	}
	getText(){
		return this.text;
	}
	getCB(){
		return this.cb;
	}
}
module.exports = Request;