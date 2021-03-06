'use strict';
var Remove = require('./QueryRemove');
var Save = require('./QuerySave');

var id = '';
it('Can instantiate Query and run save', (done) => {
	expect.assertions(1);
	var s = new Save({
		table:"person",
		first_name:"testDataFirst",
		last_name:"testDataLast",
		email:"peter@tads.com"
	},{
		first_name:['varchar',true],
		last_name:['varchar',true],
		email:['varchar',true]
	});
	s.run(function(err,res){
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length == 1){
			expect(res.length).toEqual(1);
			id = res[0].id;
		}
		return done();
	});
});


it('Can instantiate Query and run delete', (done) => {
	var r = new Remove({
		table:"person",
		id:id
	});
	r.run(function(err,res){
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
		}
		done();
	});
});