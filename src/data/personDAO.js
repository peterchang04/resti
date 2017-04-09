'use strict';
var DAO = require('./DAO');

class PersonDAO extends DAO{
	constructor(){
		super(
			'Person',// table name
			{ // argDefs (for create)
				first_name:['varchar',true],
				middle_name:['varchar',false],
				last_name:['varchar',true],
				email:['varchar',true]
			}
		);
	}
	//save() from extends DAO
	//remove() from extends DAO
	get(cb,args = {}){
		var argDef = {
			id:["int",false],
			email:["varchar",false]
		};
		var byID = args.id ? 'and person.id = @id' : '';
		var byEmail = args.email ? 'and person.email = @email' : '';
		var queryText = `
			select top 3
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

		this.query(cb,queryText,args,argDef);
	}

	saveInstruments(cb,args){ // expects args.instrument_ids + args.person_id
		var saveArgs = {
			table:'person',
			table_many:'instrument',
			person_id:args.person_id,
			instrument_ids:args.instrument_ids
		};

		this.saveRelationships(cb,saveArgs);
	}
}

module.exports = new PersonDAO();