var Query = require('../core/db/query');
var Save = require('../core/db/querySave');
var Remove = require('../core/db/queryRemove');
var Err = require("../core/err");
var Auth = require('../core/auth');

module.exports = {
	getPerson:function(cb,args = {}){
		var argDef = {
			id:["int",false],
			email:["varchar",false]
		};
		var byID = args.id ? 'and person.id = @id' : '';
		var byEmail = args.email ? 'and person.email = @email' : '';
		var query = `
			select 
			person.*,
			stuff(
				(
					select ',' + cast(instrument.id as varchar(10))
					from instrument
					inner join person_instrument on person_instrument.instrument_id = instrument.id
						and person_instrument.active = 1
						and person_instrument.person_id = person.id
						where instrument.active = 1
						order by instrument.id asc
						for xml path('')
				)
			,1,1,'') as instrument_ids
			from person
			where person.active = 1

			${byID}
			${byEmail}
		`;

		new Query(query,args,argDef).run(cb);
	},
	removePerson:function(cb,args){
		args.table = "person";
		var argDef = {id:['int',true]};
		new Remove(args,argDef).run(cb);
	},
	putPerson:function(cb,args){
		args.table = 'person';
		var argDef = {
			id:["int",true],
			first_name:['varchar',false],
			middle_name:['varchar',false],
			last_name:['varchar',false],
			email:['varchar',false]
		};
		new Save(args,argDef).run(cb);
	},
	postPerson:function(cb,args){
		// start
		this._postPerson_1_checkEmail(cb,args);
	},
	_savePerson:function(cb,args){
		args.table = "person";
		var argDef = {
			first_name:['varchar',true],
			middle_name:['varchar',false],
			last_name:['varchar',true],
			email:['varchar',true]
		};
		new Save(args,argDef).run((res,err) => {
			// validate teh result of function
			if(res.length !== 1 || !res[0].id){
				err = new Err('_savePerson did not produce a result','resultNotValid');
			}
			cb(res,err);
		});
	},
	_savePersonInstruments:function(cb,args){
		var instrumentIDs = args.instrumentids.split(',');
		var counter = 0;
			instrumentIDs.forEach((instrumentID) => {
			this._savePersonInstrument((res2,err2) => {
				if(err2){
					console.log(err2);
					cb(res2,err2);
					cb = () => {};
					return;
				} else {
					counter++;
					if(counter === instrumentIDs.length){
						cb([]);
					}
				}
			},{
				person_id:args.person_id,
				instrument_id:instrumentID
			});
		});
	},
	_clearPersonInstruments:function(cb,args){
		delete args.method;
		var query = `
			update person_instrument
			set active = 0
			where person_instrument.active = 1
			and person_instrument.person_id = @person_ID;

			select id from person_instrument
			where person_instrument.active = 1
			and person_instrument.person_id = @person_ID;
		`;
		var argDef = {person_id:['int',true]};

		new Query(query,args,argDef).run(cb);
	},
	_savePersonInstrument:function(cb,args){
		args.table = "person_instrument";
		delete args.method;
		var argDef = {
			person_id:["int",true],
			instrument_id:["int",true]
		}
		new Save(args,argDef).run(cb);
	},
	_postPerson_1_checkEmail:function(cb,args){
		// check args for email to check
		if(!args.email){
			var e = new Error('_postPerson_1_checkEmail email is required','argValFailed');
			return cb([],e);
		} 
		// kick off checkEmail
		this.getPerson((res,err) => {
			if(res.length > 0){
				var err = new Error('Email exists.','operationFailed');
			}
			if(err)	return cb([],err);

			// begin next step
			this._postPerson_2_savePerson(cb,args);
		},{
			email:args.email
		});
	},
	_postPerson_2_savePerson:function(cb,args){
		// kick off save person
		this._savePerson((res,err) => {
			if(err)	return cb([],err);
			args.person_id = res[0].id;
			// begin next step
			this._postPerson_3_clearPersonInstruments(cb,args);
		},{
			first_name:args.first_name,
			middle_name:args.middle_name,
			last_name:args.last_name,
			email:args.email
		});
	},
	_postPerson_3_clearPersonInstruments:function(cb,args){
		// check args for person_id
		if(!args.person_id){
			err = new Err('_postPerson_3_clearPersonInstruments person_id is required','argValFailed')
		}
		// kick off clear instruments
		this._clearPersonInstruments((res,err) => {
			if(err) return cb([],err);
			// begin next step
			this._postPerson_4_savePersonInstruments(cb,args);
		},{
			person_id:args.person_id
		});
	},
	_postPerson_4_savePersonInstruments:function(cb,args){
		// check args for person_id
		if(!args.person_id){
			err = new Err('_postPerson_4_savePersonInstruments person_id is required','argValFailed')
		}
		// kick off save instruments. it ends here
		this._savePersonInstruments((res,err) => {
			if(err) return cb([],err);
			if(!args.person_id){
				err = new Err('postPerson did not result in a personID','resultNotValid');
				return cb([],err);
			}
			// set up the result.
			cb([{
				id:args.person_id,
				auth:Auth.generate(args.person_id)
			}],err);
		},{
			instrumentids:args.instrumentids,
			person_id:args.person_id
		});
	}
} 