var DAO = require('./DAO');
var d;

it('can instantiate a new dao',() => {
	d = new DAO('person',{
		id:["int",true],
		first_name:["varchar",true],
		middle_name:["varchar",false],
		last_name:["varchar",true],
		email:["varchar",true]
	});
});

it('Can run query', (done) => {
	d.query((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
		//console.log(res);
	},'select top 5 * from person');
});

var personID = '';
it('Can run save', (done) => {
	d.save((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		personID = res[0].id;
		done();
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
	d.remove((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		//console.log(res);
		done();
	},{
		table:"person",
		id:personID
	});
});