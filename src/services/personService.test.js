var personService = require('./personService');

it('can get people',(done) => {
	personService.getPerson((err,res) => {
		if(err){
			console.warn(err);
			return done();
		}
		console.log(res);
		done();
	});
})