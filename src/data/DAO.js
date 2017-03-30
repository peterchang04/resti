var Query = require('../core/db/query');
var Save = require('../core/db/querySave');
var Remove = require('../core/db/queryRemove');
var Err = require("../core/err");

class DAO {
	constructor(table, argDef){
		if(!table){
			throw "DAO argument table is required"
		}
		if(!argDef){
			throw "DAO argument argDef is required"
		}
		this.table = table; // expect to be set by child class
		this.argDef = argDef; // expect to be set by child class
	}

	query(cb, query, args = {}, argDef = {}){
		console.log(args);
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