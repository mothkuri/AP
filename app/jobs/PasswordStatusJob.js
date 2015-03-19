var schedule = require('node-schedule');
var Login = require('../models/login');

//Scheduler to change the status of the login to 'suspended' if the password is expired(unchanged for 3 months)
var rule = new schedule.RecurrenceRule();
//Runs at 2 AM daily
rule.hour = 2;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function(){
	var now = new Date();
	Login.update({passwordExpiry:{$lt: now}},{$set:{status:'suspended'}},{multi: true},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('Password Status Scheduler Ran Successfully at: '+ now);
		}
		
	});
});