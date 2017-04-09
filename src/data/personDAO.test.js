'use strict';
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

it('can save instruments',(done) => {
	personDAO.saveInstruments((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
	},{
		person_id:personID,
		instrument_ids:'3,4'
	});
});

it('can verify created person + instruments',(done) => {
	personDAO.get((err,res) => {
		expect.assertions(1);
		if(err){
			console.warn(err);
			return done();
		}
		if(res.length === 1
			&& res[0].instrument_ids === '3,4'
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
	personDAO.saveInstruments((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		done();
	},{
		person_id:personID,
		instrument_ids:''
	});
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