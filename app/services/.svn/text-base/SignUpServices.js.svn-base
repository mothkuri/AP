var SignUp = require('../models/login');
var cryptoServices=require('./CryptoServices');

var signUpServices={
		save: function(signUpDetails,next){
			var currentDate = new Date();
			currentDate.setMonth(currentDate.getMonth() + 3);
			var signUp = new SignUp(signUpDetails);
			signUp.status='inactive';
			signUp.passwordExpiry = currentDate;
			//signUp.password=cryptoServices.encrypt(signUp.password);
			signUp.save(function(err) {
				if (err) {
					next(err);
				} else {
					next(null,'saved successfully');
				}
			});
		}
};

module.exports=signUpServices;