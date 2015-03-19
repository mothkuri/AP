var Login = require('../models/login');
var signUpServices=require('./SignUpServices');

var adminServices={
		changeStatus:function(ids,next){
			console.log('ids');
			console.log(ids);
			var currentDate = new Date();
			currentDate.setMonth(currentDate.getMonth() + 3);
			Login.update(
					{
						"username":{$in:ids}
					},
					{
				        "$set": { "status": 'active' ,"passwordExpiry":currentDate }
				    },
				    { multi: true },
				    function(err,numAffected){
				    	if(err){
				    		next(err);
				    	}
				    	else{
				    		next(null,numAffected);
				    	}
				    }	    
			);
		},
		checkAllInactive : function(next) {
			var query = Login.find({'status':'inactive'});
			query.exec(function(err, login) {
				if (err){
					next(err);
				}
				else if(Login.length!=0){
					next(null,login);
				}
				else{
					next(null,'No Associates Found');
				}
			});
		}
};
module.exports=adminServices;

