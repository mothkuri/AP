var schedule = require('node-schedule');
var Login = require('../models/login');
/*var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 17;
rule.minute = 0;*/


var rule = new schedule.RecurrenceRule();
//Runs at 2 AM daily
rule.hour = 2;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function(){
	Login.update({passwordExpiry:{$lt: new Date()}},{$set:{status:'suspended'}},{multi: true},function(err,records){
		if(err){
			console.log(err);
		}
		else{
			console.log(records.length+' Records Updated!');
		}
		
	});
});