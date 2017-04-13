'use strict';
var express = require('express');
var restConf = require('../../config/conf').rest;
var bodyParser = require('body-parser');
var _ = require('lodash');
var ParsedRequest = require('./ParsedRequest');

class RestListener{
	constructor(){
		var context = this;
		this.app = express();
		/* set headers */
		this.app.all('*', function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');

			/* CORS preflight */
			if(req.method === 'OPTIONS'){
				res.sendStatus(200);
			} else {
				next();
			}
		});

		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());

		this.app.all(['/api/*','/api'], function (req, res) {
			// see if there are any args in body
			var bodyArgs = {};
			try{
				bodyArgs = JSON.parse(req.body);
			}catch(e){ /* do nothing*/}

			var parsedRequest = new ParsedRequest(req.method,req.url,bodyArgs);
			parsedRequest.getResults(function(status,results){
				res.status(status);
				res.json(results)
			});
		});

		/* catch any invalid requests */
		this.app.get('*', function(req, res){
			res.json({message:"invalid request"});
		});

		this.server = this.app.listen(8081, function () {
			var host = context.server.address().address
			var port = context.server.address().port

			console.log("Example app listening at http://%s:%s", host, port)
		});
	}
	close(){
		console.log('....aaand we\'re done listening');
		this.server.close();
	}
}

module.exports = new RestListener();