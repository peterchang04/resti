'use strict';
class Err extends Error{
	constructor(message,name = "Error"){
		super(message);
		this.name = name;
		// properly capture stack trace in Node.js
		if(typeof Error.captureStackTrace === 'function'){
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error(message)).stack;
		}
	}
}

module.exports = Err;