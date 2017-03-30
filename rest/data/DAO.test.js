var DAO = require('./DAO');

var d = new DAO();

it('Can run query', (done) => {
	d.query((results,err) => {
		if(!err){
			done();
			console.log(results);
		}
	},'select top 5 * from person');
});

var personID = '';
it('Can run save', (done) => {
	d.save((results,err) => {
		if(!err){
			personID = results[0].id;
			done();
		}
	},{
		table:"person",
		first_name:"Test_First",
		middle_name:"Test_Middle",
		last_name:"Test_L'ast",
		email:"test@test.com"
	},{
		first_name:['varchar',true],
		middle_name:['varchar',false],
		last_name:['varchar',true],
		email:['varchar',true]
	});
});

it('Can run save', (done) => {
	d.remove((results,err) => {
		if(!err){
			console.log(results);
			done();
		}
	},{
		table:"person",
		id:personID
	});
});