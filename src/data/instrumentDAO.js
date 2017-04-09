'use strict';
var Query = require('../core/db/query');

module.exports = {
	getInstrument:function(cb,args){
		this.query(cb,args);
	},
	query:function(cb,args = {},argDef2 = {}){
		// define all possible args and types
		var argDef = {
			id:['int',false], // [type,required?]
			search:['varchar',false]
		}
		// combine argDefs
		Object.assign(argDef,argDef2);

		// evaluate criteria
		var c1 = args.id ? 'and instrument.id = @id' : '';
		var c2 = args.search ? "and instrument.name like '%'+@search+'%'" : '';

		// base query with templating
		var query = `
			select 
			instrument.id,
			instrument.name,
			instrument_family.name as instrument_family_name
			from instrument
			inner join instrument_family on instrument_family.id = instrument.instrument_family_id
			where instrument.active = 1
			${c1}
			${c2}
		`;

		// create a run query
		var q = new Query(query,args,argDef);
		q.run(cb);
	}
}