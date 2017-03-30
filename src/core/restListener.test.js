var RL = null;

it('takes a bit for RestListener to start listening',function(done){
	RL = require('./restListener');
	setTimeout(function(){
		done();
	},1000);
});

it('correctly translates function names',function(){
	expect.assertions(4);
	var test1 = RL._getFunc('get',["test","123","testCase","567"]);
	var test2 = RL._getFunc('get',["test"]);
	var test3 = RL._getFunc('post',["test","123"]);
	var test4 = RL._getFunc('get',["test","123","?asdf=5&ddf=7"]);
	expect(test1).toEqual('getTestCase');
	expect(test2).toEqual('getTest');
	expect(test3).toEqual('postTest');
	expect(test4).toEqual('getTest');
});

it('generates the correct override function',() => {
	var func = RL._getFunc("get",["test"],{method:"doThis"});
	expect(func).toEqual("doThis");
});

it('correctly create paths',function(){
	expect.assertions(4);
	var path1 = RL._toPath('/person/123');
	var path2 = RL._toPath('/goats/5123/udders/123');
	var path3 = RL._toPath('/goats/5123/?asdf=1&ddf=2');
	var path4 = RL._toPath('/goats/5123?asdf=1&ddf=2');
	expect(path1).toEqual(["person","123"]);
	expect(path2).toEqual(["goats","5123","udders","123"]);
	expect(path3).toEqual(["goats","5123","?asdf=1&ddf=2"]);
	expect(path4).toEqual(["goats","5123","?asdf=1&ddf=2"]);
});

it('gets the correct resource',function(){
	var resource = RL._getResource(["instrument","123"]);
	if(resource === null){
		expect(resource).toEqual('not null');
	}else{
		expect(1).toEqual(1);
	}
});

it('fails gracefully with missing resource',function(){
	var resource = RL._getResource(["llama","123"]);
	if(resource === null){
		expect(resource).toEqual(null);
	}else{
		expect(1).toEqual(0);
	}
});

it('generates the correct arguments',function(){
	var args = RL._getArgs(["test","123"]);
	expect(args).toEqual({
		id:"123"
	});
});

it('generates the correct arguments',() => {
	var args = RL._getArgs(["test","123","?asdf=5"]);
	expect(args).toEqual({
		id:"123",
		asdf:"5"
	});
});

it('generates the correct arguments again',function(){
	var args = RL._getArgs(["test","123","test_run","156"]);
	expect(args).toEqual({
		id:"156",
		test_id:"123"
	});
});

it('generates the correct arguments (no args)',function(){
	var args = RL._getArgs(["test"]);
	expect(args).toEqual({});
});

it('merges the correct args',function(){
	var args1 = RL._getArgs(
		["test","123","test_run","456"],
		{body:{"id":"999","llama":"chris"}}
	);
	expect(args1).toEqual({
		id:"999",
		test_id:"123",
		llama:"chris"
	});
});

it('power it all down',function(){
	RL.close();
	expect(1).toEqual(1);
});