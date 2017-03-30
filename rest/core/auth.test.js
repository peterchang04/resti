var Auth = require("./auth");

var token = '';
it('should generate token',function(){
	token = Auth.generate(
		123
	);
	expect(token).not.toEqual('');
});

it('should verify token',function(){
	expect.assertions(2);
	var result = Auth.verify(token);
	// remove the timestamps
	delete result.token.iat;
	delete result.token.exp;
	expect(result.err).toEqual(null);
	expect(result.token).toEqual({
		sub:123,
		iss:'https://muz.io'
	});
});

var expiredToken = '';
it('should generate expired token',function(){
	expiredToken = Auth.generate(
		123,
		-1
	);
	expect(token).not.toEqual('');
});

it('should see expired token',function(){
	var result = Auth.verify(expiredToken);
	expect(result.err.name).toEqual('TokenExpiredError');
});

it('tries to decode invalid token',function(){
	var result = Auth.verify(token+'!!');
	expect(result.err.name).toEqual('JsonWebTokenError');
});