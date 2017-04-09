'use strict';
var Query = require('./query');

it('Can instantiate Query and run query', (done) => {
	var q = new Query('select top 5 * from person');
	q.run(function(results){
		done();
	});
});

it('Knows when a type is invalid', (done) => {
	expect.assertions(1);
	try{
		var q = new Query(
			'select top 5 * from person',
			{personID:1},
			{personID:['invalid',false]}
		);
	}catch(e){
		expect(e.substring(0,22)).toEqual('Invalid type [invalid]');
		done();
	}
});

it('Can instantiate all types', () => {
	expect.assertions(7);
	var q = new Query('select top 5 * from person');
	var typesToTest = [
		'Int',
		'Uniqueidentifier',
		'Money',
		'Decimal',
		'Bit',
		'DateTime',
		'VarChar'
	];
	typesToTest.forEach(function(type){
		var t = q._getType(type.toLowerCase());
		expect(t.name.substring(0,type.length).toLowerCase()).toEqual(type.toLowerCase());
	});
});

it('Catches required keys when defined', (done) => {
	expect.assertions(1);
	try{
		var q = new Query(
			'select top 5 * from person',
			{}, // no personID
			{personID:['invalid',true]}
		);
	}catch(e){
		expect(e).toEqual('personid is required.');
		done();
	}
});