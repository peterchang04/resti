'use strict';
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;
var Guid = require('guid');
var dbRequest = require('./request');
var dbConfig = require('../../../config/conf').db;
var Query = require('./query');

function connect (){
	var config = {
		userName: dbConfig.username,
		password: dbConfig.password,
		server: dbConfig.server,
		// When you connect to Azure SQL Database, you need these next options.
		options: dbConfig.options
	};

	var _connector = {
		connected:false,
		currentRequest:null, // the current dbRequest instance lives here until success or error callback
		requests:[], // the queued up requests to run
		connection:new Connection(config),
		result:[],
		tryRun:function(){
			if(_connector.requests.length > 0 && _connector.connected && _connector.currentRequest == null){
				var r = _connector.requests.shift();

				//console.log('TRY '+s.text);
				_connector.executeStatement(r);
			}
		},
		addRequest:function(text,params,cb){
			var s = new dbRequest(text,params,cb);
			_connector.requests.push(s);

			//console.log('QUEUE ' + text);
			_connector.tryRun();
		},
		getRequests:function(){
			return this.requests;
		},
		executeStatement:function(r){
			r.attempts++;
			_connector.currentRequest = r;
			//console.log('RUN ' + _connector.currentRequest.text);
			_connector.result = [];

			var request = new Request(r.text, function(err) {
				/* ERROR */
				if(err){
					err.text = r.text;
					if(_connector.currentRequest.attempts < 2){
						_connector.requests.push(r);
					} else{
						console.warn('DB executeStatement');
						console.warn(err);
						r.cb(err,null);
					}
				/* SUCCESS */
				} else if(typeof r.cb === 'function'){
					r.cb(err,_connector.result);
				}
				_connector.currentRequest = null;
				_connector.tryRun();
			});

			request.on('row', function(columns) {
				// sort the results
				var rowData = {};
				columns.forEach(function(column) {  
					rowData[column.metadata.colName.toLowerCase()] = column.value;
					// bits should return as 1 or 0 instead of true / false
					if(column.metadata.type.name === 'Bit'){
						column.value = (column.value) ? 1 : 0;
					}
				});
				_connector.result.push(rowData);
			});

			// append any params
			r.params.forEach(function(param){
				if(param[1].name === 'Int' || param[1].name === 'Bit'){
					param[2] = +param[2];
				}
				if(param[1].name === 'DateTime' && param[2] === 'getDate()'){
					/* do not parameterize. This is an exception to rule */
				} else if(param[1].name === 'DateTime'){
					/* cast the value to date obj */
					param[2] = new Date(param[2]);
					request.addParameter(param[0],param[1],param[2]);
				} else {
					request.addParameter(param[0],param[1],param[2]);
				}
			});

			// run it
			_connector.connection.execSql(request);  
		}
	};

	/* CONNECTION EVENTS */
	_connector.connection.on('connect', function(err) {  
		// If no error, then good to proceed.  
		console.log("DB Connected");
		_connector.connected = true;
		_connector.tryRun();
		if(err){
			console.warn(err);
		}
	});

	return {
		run:_connector.addRequest,
		newID:function(){
			var guid = Guid.create();
			return guid+'';
		},
		Types:TYPES,
		connection:_connector.connection
	};
};

module.exports = connect();