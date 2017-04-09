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

it('Can save a relationship', (done) => {
	var args = {
		table:"person",
		table_many:"instrument",
		person_id:personID,
		instrument_id:"1"
	}
	d._saveRelationship((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
	},args);
});

it('verify relationship', (done) => {
	d.query((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
	},`
		select * 
		from person_instrument
		where active = 1
		and person_instrument.person_id = ${personID}
		and person_instrument.instrument_id = 1
	`);
});

it('Can clear relationships', (done) => {
	var args = {
		table:"person",
		table_many:"instrument",
		person_id:personID
	}
	d._clearRelationships((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
	},args);
});

it('verify relationships cleared', (done) => {
	expect.assertions(1);
	d.query((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 0){
			expect(1).toEqual(1);
		}
		done();
	},`
		select * 
		from person_instrument
		where active = 1
		and person_instrument.person_id = ${personID}
		and person_instrument.instrument_id = 1
	`);
});

it('can save many relationships', (done) => {
	expect.assertions(1);
	d.saveRelationships((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		expect(1).toEqual(1);
		return done();
	},{
		table:"person",
		table_many:"instrument",
		person_id:personID,
		instrument_ids:"3,4"
	});
});

it('verify multiple added', (done) => {
	expect.assertions(1);
	d.query((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 2 && res[0].instrument_id === 3 && res[1].instrument_id === 4){
			expect(1).toEqual(1);
		}
		done();
	},`
		select * 
		from person_instrument
		where active = 1
		and person_instrument.person_id = ${personID}
		order by person_instrument.instrument_id asc
	`);
});

it('Can run Remove', (done) => {
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
