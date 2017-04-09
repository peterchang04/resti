'use strict';
var Save = require('./querySave');

var personID = '';
it('Can instantiate Query and run save', (done) => {
	expect.assertions(1);
	var s = new Save({
		table:"person",
		first_name:"Peter",
		last_name:"ChangTest",
		email:"peter@tads.com"
	},{
		first_name:['varchar',true],
		last_name:['varchar',true],
		birth_date:['datetime',false],
		email:['varchar',true]
	});
	s.run((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
			personID = res[0].id;
		}
		return done();
	});
});

var personID = '';
it('Can instantiate Query and run update', (done) => {
	expect.assertions(2);
	var s = new Save({
		table:"person",
		id:personID,
		first_name:"Peter",
		last_name:"ChangTest2"
	},{
		id:['int',false],
		first_name:['varchar',true],
		last_name:['varchar',true],
		birth_date:['datetime',false]
	});
	s.run(function(err,res){
		if(err){
			console.warn(err);
			return done();
		}
		expect(res.length).toEqual(1);
		expect(res[0].id).toEqual(personID);
		done();
	});
});