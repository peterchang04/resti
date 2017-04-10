'use strict';
var Request = require('./Request');

it('Can instantiate a request object with callback',() => {
	var r = new Request('select * from user',{personID:1});
});

it('Can succesfully instances each attribute',(done) => {
	expect.assertions(4);
	var r = new Request(
		'select * from user',
		{personID:1},
		function(text,done){
			expect(text + '1').toEqual('hello1');
			done();
		}
	);
	expect(r.getParams()).toEqual({personID:1});
	expect(r.getAttempts()).toEqual(0);
	expect(r.getText()).toEqual('select * from user');
	var cb = r.getCB();
	cb('hello',done);
});