var personDAO = require('./personDAO2');

var personID = '';
it('can verify creating person',function(done){
	personDAO.save((res,err) => {
		if(!err){
			personID = res[0].id;
			console.log(res);
			done();
		}
	},{
		first_name:"Test_First",
		middle_name:"Test_Middle",
		last_name:"Test_L'ast",
		email:"test@test.com"
	});
});

it('can verifies save instrument',function(done){
	personDAO.saveInstrument((res,err)=>{
		if(!err){
			console.log(res);
			done();
		} else {
			console.log(err);
		}
	},{
		person_id:personID,
		instrument_id:1
	});
});

it('can verifies removing person',function(done){
	personDAO.remove((res,err)=>{
		if(!err){
			console.log(res);
			done();
		}
	},{id:personID});
});

it('can verifies querying person',function(done){
	personDAO.get((res,err)=>{
		if(!err){
			console.log(res);
			done();
		} else {
			console.log(err);
		}
	},{
		id:personID
	});
});
