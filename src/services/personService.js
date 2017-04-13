'use strict';
var PersonDAO = require('../data/personDAO');

module.exports = {
	getPerson:function(cb, args){
		PersonDAO.get(cb, args);
	}
};