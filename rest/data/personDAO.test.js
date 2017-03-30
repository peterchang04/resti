var Request = require('../../react/js/httpRequest');
var RL = require('../core/restListener');
var Auth = require('../core/auth');

it('Needs some time for the Listener to spin up',function(done){
	setTimeout(function(){
		done();
	},100);
});

var personID = '';
it('can save a new person _savePerson',function(done){
	expect.assertions(1);
	new Request({
		method:"post",
		path:"/person",
		data:{
			method:"_savePerson",
			first_name:"Test_First",
			middle_name:"Test_Middle",
			last_name:"Test_L'ast",
			email:"test@test.com"
		},
		complete:function(res,err){
			if(!err && res.length == 1){
				personID = res[0].id;
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verifies created person',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err
				&& res.length == 1
				&& res[0].first_name === 'Test_First'
				&& res[0].middle_name === 'Test_Middle'
				&& res[0].last_name === "Test_L'ast"
				&& res[0].email === 'test@test.com'
				&& res[0].instrument_ids === null
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can update person putPerson',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		method:"put",
		data:{
			id:personID,
			first_name:"Test_First2"
		},
		complete:function(res,err){
			if(!err && res.length === 1){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verifies updated person',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 1
				&& res[0].first_name === 'Test_First2'
				&& res[0].middle_name === 'Test_Middle'
				&& res[0].last_name === "Test_L'ast"
				&& res[0].email === 'test@test.com'
				&& res[0].instrument_ids === null
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can create instruments _savePersonInstrument',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		method:"post",
		data:{
			method:"_savePersonInstrument",
			person_id:personID,
			instrument_id:"1"
		},
		complete:function(res,err){
			if(!err && res.length === 1){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verifies created instrument',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 1
				&& res[0].first_name === 'Test_First2'
				&& res[0].middle_name === 'Test_Middle'
				&& res[0].last_name === "Test_L'ast"
				&& res[0].email === 'test@test.com'
				&& res[0].instrument_ids === '1'
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can save multiple instruments _savePersonInstruments',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		method:"post",
		data:{
			method:"_savePersonInstruments",
			person_id:personID,
			instrumentIDs:"1,4"
		},
		complete:function(res,err){
			if(!err && res.length === 0){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verifies multiple instruments',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 1
				&& res[0].first_name === 'Test_First2'
				&& res[0].middle_name === 'Test_Middle'
				&& res[0].last_name === "Test_L'ast"
				&& res[0].email === 'test@test.com'
				&& res[0].instrument_ids === '1,1,4'
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can clear instruments _clearPersonInstruments',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		method:"post",
		data:{
			method:"_clearPersonInstruments",
			person_id:personID
		},
		complete:function(res,err){
			if(!err && res.length === 0){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verifies clearing instruments',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 1
				&& res[0].first_name === 'Test_First2'
				&& res[0].middle_name === 'Test_Middle'
				&& res[0].last_name === "Test_L'ast"
				&& res[0].email === 'test@test.com'
				&& res[0].instrument_ids === null
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can delete a person deletePerson',function(done){
	expect.assertions(1);
	new Request({
		method:"delete",
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length === 1
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

var personID = '';
var date = new Date();
var email = 'p'+date.valueOf()+'@test.com';
it('can put it all together postPerson',function(done){
	expect.assertions(1);
	new Request({
		method:"post",
		path:"/person",
		data:{
			first_name:"Test_First2",
			middle_name:"Test_Middle2",
			last_name:"Test_L'ast2",
			email:email,
			instrumentIDs:"1,4"
		},
		complete:function(res,err){
			if(!err 
				&& res.length === 1
				&& Auth.verify(res[0].auth).token.sub === res[0].id
			){
				personID = res[0].id;
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verify it all',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 1
				&& res[0].first_name === 'Test_First2'
				&& res[0].middle_name === 'Test_Middle2'
				&& res[0].last_name === "Test_L'ast2"
				&& res[0].email === email
				&& res[0].instrument_ids === '1,4'
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can delete a person',function(done){
	expect.assertions(1);
	new Request({
		method:"delete",
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length === 1
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('can verify delete',function(done){
	expect.assertions(1);
	new Request({
		path:"/person",
		data:{
			id:personID
		},
		complete:function(res,err){
			if(
				!err 
				&& res.length == 0
			){
				expect(1).toEqual(1);
			}
			done();
		}
	});
});

it('Shut it off',function(done){
	RL.close();
	setTimeout(function(){
		done();
	},500);
});
