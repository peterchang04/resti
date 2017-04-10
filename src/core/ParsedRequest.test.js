var ParsedRequest = require('./ParsedRequest');
var blankRequest = new ParsedRequest('get','hello',{});
var privateFunctions = blankRequest.getPrivateFunctions();

it('correctly create paths',() => {
	expect.assertions(4);
	var path1 = privateFunctions.toPathArray('/person/123');
	var path2 = privateFunctions.toPathArray('/goats/5123/udders/123');
	var path3 = privateFunctions.toPathArray('/goats/5123/?asdf=1&ddf=2');
	var path4 = privateFunctions.toPathArray('/goats/5123?asdf=1&ddf=2');
	expect(path1).toEqual(["person","123"]);
	expect(path2).toEqual(["goats","5123","udders","123"]);
	expect(path3).toEqual(["goats","5123","?asdf=1&ddf=2"]);
	expect(path4).toEqual(["goats","5123","?asdf=1&ddf=2"]);
});

it('generates the correct args',() => {
	expect.assertions(7);
	var args1 = privateFunctions.toArgs(["test","123"]); // single tier route arg
	var args2 = privateFunctions.toArgs(["test","123","?asdf=5"]); // query params
	var args3 = privateFunctions.toArgs(["test","123","?asdf=5&jebus=ASDF"]); // query params
	var args4 = privateFunctions.toArgs(["test","123","test_run","156"]); // multi tier route args
	var args5 = privateFunctions.toArgs(["test"]); // no args
	var args6 = privateFunctions.toArgs(["test","123","test_run","456"],{"id":"999","llama":"chris"}); // with args struct
	var args7 = privateFunctions.toArgs(["test","123","test_run","456","?asdf=5"],{"id":"999","llama":"chris"}); // with args struct
	expect(args1).toEqual({
		id:"123"
	});
	expect(args2).toEqual({
		id:"123",
		asdf:"5"
	});
	expect(args3).toEqual({
		id:"123",
		asdf:"5",
		jebus:"ASDF"
	});
	expect(args4).toEqual({
		id:"156",
		test_id:"123"
	});
	expect(args5).toEqual({});
	expect(args6).toEqual({
		id:"999",
		test_id:"123",
		llama:"chris"
	});
	expect(args7).toEqual({
		id:"999",
		test_id:"123",
		llama:"chris",
		asdf:"5"
	});
});

it('correctly translates function names',() => {
	expect.assertions(5);
	var test1 = privateFunctions.toFunc('get',["test","123","testCase","567"]);
	var test2 = privateFunctions.toFunc('get',["test"]);
	var test3 = privateFunctions.toFunc('post',["test","123"]);
	var test4 = privateFunctions.toFunc('get',["test","123","?asdf=5&ddf=7"]);
	var test5 = privateFunctions.toFunc('get',["test"],{method:"doThis"});
	expect(test1).toEqual('getTestCase');
	expect(test2).toEqual('getTest');
	expect(test3).toEqual('postTest');
	expect(test4).toEqual('getTest');
	expect(test5).toEqual('doThis');
});

it('gets the correct resource',function(){
	var resource = privateFunctions.getResource(["person","123"]);
	if(resource === null){
		expect(resource).toEqual('not null');
	}else{
		expect(1).toEqual(1);
	}
});

it('fails gracefully with missing resource',function(){
	var resource = privateFunctions.getResource(["llama","123"]);
	if(resource === null){
		expect(resource).toEqual(null);
	}else{
		expect(1).toEqual(0);
	}
});