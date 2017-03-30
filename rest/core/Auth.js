var jwt = require('jsonwebtoken');
var moment = require("moment");
var secret = require('../../config/conf').jwtSecret;

var Auth = (function(){
	return {
		generate:function(personID,expiresIn = 60){
			if(!personID) {
				console.log('missing personID');
				return "";
			}
			var token = jwt.sign({
				sub:personID,
				iss:"https://muz.io"
			},secret,{
				expiresIn:expiresIn
			});
			return token;
		},
		verify:function(token){
			try{
				var decoded = jwt.verify(token,secret);
				console.log(decoded);
				return {
					token:decoded,
					err:null
				}
			}catch(e){
				return {
					token:null,
					err:e
				}
			}
		}
	}
})();

module.exports = Auth;