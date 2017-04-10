'use strict';
var Err = require("./Err");

it('can instantiate an error',function(){
	expect.assertions(2);
	var e = new Err('Hello World','MyError');
	expect(e.name).toEqual('MyError');
	expect(e.message).toEqual('Hello World');
});

it('can throw an error',function(){
	var e = new Err('Hello World','But this is MyError');
	try{
		throw e;
	}catch(e){
		console.log(e);
		console.log(e.stack);
	}
	
});