'use strict';
/* Represents a query, with parametized values */
var Types = require('tedious').TYPES;
var db = require('./db');

class Query {
	/*	CONSTRUCTOR ARGS 
		[text, args, argDef] // select query
		[args, argDef]  // generates an insert or update statement depending on args
	*/
	constructor(text,args = {},argDef = {}){
		// change all keys to lowercase
		for(let key in args){
			args[key.toLowerCase()] = args[key];
			if(key !== key.toLowerCase()){
				delete args[key];
			}
		}
		for(let key in argDef){
			argDef[key.toLowerCase()] = argDef[key];
			if(key !== key.toLowerCase()){
				delete argDef[key];
			}
		}

		this.text = this._sanitize(text);
		// check arguments for required
		for(let key in argDef){
			if(argDef[key][1] && !(key in args)){
				throw key + ' is required.'; 
			}
		}
		// format the args into array
		this.params = [];
		delete args.method; // this is never a real argument. used by restListener to override the method
		for(let key in args){
			/* make sure all keys are defined in argDef */
			if(!(key in argDef)){
				throw "arg [" + key + "] has not been defined in argDef. Is it an int, varchar, guid, datetime etc...?";
			}

			var type = this._getType(argDef[key][0]);
			this.params.push([
				key,
				type,
				args[key]
			]);
		}
	}
	run(cb){
		db.run(this.text,this.params,cb);
	}
	_getType(str){
		str = str.toLowerCase();
		var Ts = {
			int:Types.Int,
			uniqueidentifier:Types.UniqueIdentifier,
			guid:Types.UniqueIdentifier,
			money:Types.Money,
			decimal:Types.Decimal,
			bit:Types.Bit,
			datetime:Types.DateTime,
			varchar:Types.VarChar
		};
		let type = Ts[str];

		if(!type){
			throw 'Invalid type ['+str+']. Valid types: int, uniqueidentifier, guid, money, decimal, bit, datetime';
		}
		return type;
	}
	_sanitize(str){
		str.replace(/\s+/g,' '); // this removes and double spaces
		return str;
	}
}

module.exports = Query;