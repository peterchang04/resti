var personDAO = require('./personDAO');

var personID = '';
it('can create person',(done) => {
	personDAO.save((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
			personID = res[0].id;
		}
		return done();
	},{
		first_name:"Test_First",
		middle_name:"Test_Middle",
		last_name:"Test_L'ast",
		email:"test@test.com"
	});
});

it('can save instrument',(done) => {
	personDAO.saveInstrument((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
		}
		return done();
	},{
		person_id:personID,
		instrument_id:1
	});
});

it('can verify created person + instrument',(done) => {
	personDAO.get((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1
			&& res[0].instrument_ids === '1'
			&& res[0].first_name === 'Test_First'
			&& res[0].middle_name === 'Test_Middle'
			&& res[0].last_name === "Test_L'ast"
			&& res[0].email === 'test@test.com'
		){
			expect(res.length).toEqual(1);
		}
		return done();
	},{
		id:personID
	});
});

it('can clear instruments',(done) => {
	personDAO.clearInstruments((err,res)=>{
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
		}
		return done();
	},{person_id:personID});
});

it('can verify cleared instruments',(done) => {
	personDAO.get((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1
			&& res[0].instrument_ids === null
		){
			expect(res.length).toEqual(1);
		}
		return done();
	},{
		id:personID
	});
});

it('can save multiple instruments',(done) => {
	personDAO.saveInstruments((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
		}
		return done();
	},{
		person_id:personID,
		instrument_ids:"1,2"
	});
});

it('can verify multiple instruments',(done) => {
	personDAO.get((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1
			&& res[0].instrument_ids === "1,2"
		){
			expect(res.length).toEqual(1);
		}
		return done();
	},{
		id:personID
	});
});

it('can remove person',(done) => {
	personDAO.remove((err,res)=>{
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1){
			expect(res.length).toEqual(1);
		}
		return done();
	},{id:personID});
});

it('can verifies querying removed person',function(done){
	personDAO.get((err,res)=>{
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 0){
			expect(res.length).toEqual(0);
		}
		return done();
	},{
		id:personID
	});
});