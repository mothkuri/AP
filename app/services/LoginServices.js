var Login = require('../models/login');
var cryptoServices=require('./CryptoServices');

var loginServices={
		find : function(loginDetails,next){
			var login = new Login(loginDetails);
			var encryptedPassword=cryptoServices.encrypt(login.password);
			var query=Login.find({_id:login._id,password:encryptedPassword,active:true});
			query.exec(function(err, login) {
				if (err){
					next(err);
				}
				else if(login.length!=0){
					next(null,login);
				}
				else{
					next(null,'please enter correct username and password');
				}
			});
		}
};

module.exports=loginServices;

