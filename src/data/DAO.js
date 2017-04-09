'use strict';
var Query = require('../core/db/query');
var Save = require('../core/db/querySave');
var Remove = require('../core/db/queryRemove');
var err = require("../core/err");

class DAO {
	constructor(table, argDef){
		if(!table){
			throw new err("DAO argument table is required", "argument error");
		}
		if(!argDef){
			throw new err("DAO argument argDef is required", "argument error");
		}
		this.table = table; // expect to be set by child class
		this.argDef = argDef; // expect to be set by child class
	}

	query(cb, query, args = {}, argDef = {}){
		return new Query(query,args,argDef).run(cb);
	}

	save(cb, args = {}, argDef = this.argDef){
		if(!args.table){
			args.table = this.table;
		}
		if(args.id){
			// when updating, any set of keys is ok
			argDef.id = ["int",true];
			for(var key in argDef){
				argDef[key][1] = false;
			}
		}
		return new Save(args,argDef).run(cb);
	}

	remove(cb, args = {}){
		args.table = this.table;
		// remove requires id
		var argDef = {id:['int',true]};
		return new Remove(args,argDef).run(cb);
	}

	saveRelationships(cb, args={}){
		// required args are: table, table_many, ${table}_id, ${table_many}_ids
		if(!args.table){
			throw new err("table is a required argument", "argument error");
		}
		if(!args.table_many){
			throw new err("table_many is a required argument", "argument error");
		}
		if(!args[args.table + "_id"]){
			throw new err(`${args.table}_id is a required argument`, "argument error");
		}
		if(!(args.table_many+"_ids" in args)){
			throw new err(`${args.table_many}_ids is a required argument`, "argument error");
		}

		// first clear
		this._clearRelationships((err,res) => {
			// loop and save instruments

			var ids = args[args.table_many + "_ids"] || "";
			var idArray = ids.split(',');
			var count = 0;
			idArray.forEach((manyId) => {
				// setup args for save relationships
				let saveRelationshipArgs = {
					table:args.table,
					table_many:args.table_many,
					[args.table + "_id"]:args[args.table + "_id"],
					[args.table_many + "_id"]:manyId
				};
				this._saveRelationship((err,res) => {
					count++;
					if(count >= idArray.length){
						cb(err,res);
					}
				},saveRelationshipArgs);
			});

		},{
			table:args.table,
			table_many:args.table_many,
			[args.table+'_id']:args[args.table + "_id"]
		});
	}

	_saveRelationship(cb,args){
		// required args are: table, table_many, ${table}_id, ${table_many}_id
		if(!args.table){
			throw new err("table is a required argument", "argument error");
		}
		if(!args.table_many){
			throw new err("table_many is a required argument", "argument error");
		}
		if(!args[args.table+'_id']){
			throw new err(`${args.table}_id is a required argument`, "argument error");
		}
		if(!(args.table_many+ '_id' in args)){
			throw new err(`${args.table_many}_id is a required argument`, "argument error");
		}

		var argDef = {
			[args.table+"_id"]:["int",true],
			[args.table_many+"_id"]:["int",false]
		};
		
		var saveArgs = {
			table:args.table + '_' + args.table_many,
			[args.table+'_id']:args[args.table+'_id'],
			[args.table_many+'_id']:args[args.table_many+'_id']
		};
		return new Save(saveArgs,argDef).run(cb);
	}

	_clearRelationships(cb,args){
		// required args are: table, table_many, ${table}_id
		if(!args.table){
			throw new err("table is a required argument", "argument error");
		}
		if(!args.table_many){
			throw new err("table_many is a required argument", "argument error");
		}
		if(!args[args.table+'_id']){
			throw new err(`${args.table}_id is a required argument`, "argument error");
		}

		var argDef = {
			[args.table+"_id"]:["int",true]
		}
		var queryText = `
			update ${args.table}_${args.table_many}
			set active = 0
			where active = 1
			and ${args.table}_id = ${args[args.table+'_id']}
		`;
		// remove table from args so it doesn't turn into a query param
		delete args.table;
		delete args.table_many;
		return new Query(queryText,args,argDef).run(cb);
	}

	// every dao object has access to base save function this way
	runSave(cb,args={},argDef={}){
		return new Save(args,argDef).run(cb);
	}

	// any dao object has access to base remove function this way
	runRemove(cb,args={},argDef={id:["int",true]}){
		return new Remove(args,argDef).run(cb);
	}
}

module.exports = DAO;