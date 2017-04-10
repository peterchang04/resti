'use strict';
var Query = require('./Query');

class Save extends Query{
	constructor(args,argDef){
		delete args.method; // this is used by httpRequest.
		var text = Save._generateInsertModifyText(args);
		super(text,args,argDef);
	}
	static _generateInsertModifyText(obj){
		// lcase all keys
		for(var key in obj){
			var temp = obj[key];
			delete obj[key];
			obj[key.toLowerCase()] = temp;
		}
		if(!('table' in obj)){
			throw '[table] required for insert/update';
		}

		var table = obj.table;
		delete obj.table;

		// insert or update
		if(obj["id"]){
			var setStatement = '';
			for(var column in obj){
				if(column !== "id"){
					if(obj[column] === 'getDate()'){
						setStatement = setStatement + `,${column} = getDate()`;
					} else {
						setStatement = setStatement + `,${column} = @${column}`;
					}
				}
			}

			var text = `
				update [${table}] 
				set modified_on = getDate()
				${setStatement}
				where [${table}].id = @id;

				select @id as id;
			`;
		} else {
			var columns = '';
			var values = '';
			for(var column in obj){
				columns = columns + `,${column}`;
				if(obj[column] == 'getDate()'){
					values = values + ',getDate()'; // use database getDate()
				} else {
					values = values + `,@${column}`; // normal argument
				}
			}
			var text = `

				insert into [${table}] (
					created_on
					,modified_on
					,active
					${columns}
					
				) values (
					getDate()
					,getDate()
					,1
					${values}
				)

				select scope_identity() as id
			`;
		}
		return text;
	}
}

module.exports = Save;