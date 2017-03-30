var db = require('./db');
var Types = require('tedious').TYPES;

it('Can add request and execute query', (done) => {
	db.run( // addRequest()
		'select top 5 * from person',
		//['personID',Int,1],
		[['personID',Types.Int,'1']],
		function(result){
			done();
		}
	);
});

it('test newID() returns 36 chars', () => {
	var guid = db.newID();
	expect(guid.length).toEqual(36);
});

it('test multiple queries will return', (done) => {
	expect.assertions(3);
	var completed = 0;
	// Q1
	db.run(
		'select top 1 * from person',
		//['personID',Int,1],
		[['personID',Types.Int,'1']],
		function(result){
			completed++;
			expect(1).toEqual(1);
			if(completed == 3){
				done();
			}
		}
	);
	// Q2
	db.run(
		'select top 2 * from person',
		//['personID',Int,1],
		[['personID',Types.Int,'1']],
		function(result){
			completed++;
			expect(1).toEqual(1);
			if(completed == 3){
				done();
			}
		}
	);
	// Q3
	db.run(
		'select top 3 * from person',
		//['personID',Int,1],
		[['personID',Types.Int,'1']],
		function(result){
			completed++;
			expect(1).toEqual(1);
			if(completed == 3){
				done();
			}
		}
	);
});