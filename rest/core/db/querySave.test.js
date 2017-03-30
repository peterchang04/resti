var Save = require('./querySave');

var personID = '';
it('Can instantiate Query and run save', (done) => {
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
	s.run(function(results,err){
		personID = results[0].id;
		done();
	});
});

var personID = '';
it('Can instantiate Query and run update', (done) => {
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
	s.run(function(results,err){
		done();
	});
});