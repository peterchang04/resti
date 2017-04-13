'use strict';
var RL = null;
var request = require('superagent');

it('takes a bit for RestListener to start listening',function(done){
	RL = require('./restListener');
	setTimeout(function(){
		done();
	},1000);
});

it('accepts a request',function(done){
	request
	.get('localhost:8081/api/person')
	.end((err,res) => {
		console.log(res.status);
		console.log(res.body);
		done();
	});
});

it('rejects invalid paths',function(done){
	request
	.get('localhost:8081/invalid')
	.end((err,res) => {
		console.log(res.status);
		console.log(res.body);
		done();
	});
});

it('power it all down',function(){
	RL.close();
	expect(1).toEqual(1);
});