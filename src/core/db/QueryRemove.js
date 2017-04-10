'use strict';
var Query = require('./Query');

class Remove extends Query{
	constructor(args,argDef = {id:["int",true]}){
		var text = Remove._generateDeleteText(args);
		super(text,args,argDef);
	}
	static _generateDeleteText(obj){
		// lcase all keys
		for(var key in obj){
			var temp = obj[key];
			delete obj[key];
			obj[key.toLowerCase()] = temp;
		}
		if(!('table' in obj)){
			throw '[table] required for delete';
		}
		if(!('id' in obj)){
			throw '[id] required for delete';
		}

		var table = obj.table;
		delete obj.table;

		// deactivate
		if(obj["id"]){
			var text = `
				update [${table}] 
				set modified_on = getDate(),
				active = 0
				where [${table}].id = @id;

				select @id as id;
			`;
		}
		return text;
	}
}

module.exports = Remove;