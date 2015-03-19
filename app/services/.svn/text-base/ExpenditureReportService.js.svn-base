var ExpenditureReport = require('../models/ExpenditureReport').expenditureReportModel;
var Event = require('../models/Event').eventModel;
var Group = require('../models/Group').groupModel;
var serviceFunctions = {
	save : function(expenditureDetails,loggedInUserId,next) {
		expenditureDetails.enteredBy=loggedInUserId;
		
		Event.count({ _id: expenditureDetails.eventId },function(err,count){
			if(err){
				next(err);
				return;
			}
			else{
				if(count===0){
					next('Event not found with ID:'+expenditureDetails.eventId);
					return;
				}
			}
			//checking whether all groups are present
			var groups = expenditureDetails.groupId.split(',');
			Group.count({ _id: {$in : groups} },function(err,count){
				if(err){
					next(err);
					return;
				}
				else{
					if(count!==groups.length){
						next('Invalid Groups');
						return;
					}
				}
				
				
				var expenditureReport = new ExpenditureReport(expenditureDetails);
				
				var query = ExpenditureReport.find({eventId:expenditureDetails.eventId}).sort({_id:-1}).limit(1);
				query.exec(function(err,report){
					if(err){
						next(err);
						return;
					}
					else if(report.length===0){
						expenditureReport.totalExpenses = expenditureReport.debit;
					}
					else {
						var expenses = report[0].totalExpenses;
						expenses += expenditureReport.debit;
						expenditureReport.totalExpenses = expenses;
					}
					expenditureReport.save(function(err) {
						if (err) {
							next(err);
						} else {
							next(null);
						}
					});
						
				});
				
				
				
				
			});
		});
		
		
				
	},

	getAll : function(next) {
		var query = ExpenditureReport.find().sort({_id:-1});
		query.exec(function(err, events) {
			if (err){
				next(err);
			}
			else if(events.length!=0){
				next(null,events);
			}
			else{
				next(null,'No ExpenditureReports Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = ExpenditureReport.findOne({
			_id : id
		});
		query.exec(function(err, expenditureReport) {
			if (err){
				next(err);
			}
			else if(expenditureReport){
				next(null,expenditureReport);
			}
			else{
				next(null,'No ExpenditureReport Found with ID: '+id);
			}
		});
	},
	
	edit : function(expenditureDetails,next) {
		var query = ExpenditureReport.findOne({
			_id : expenditureDetails._id
		});
		query.exec(function(err, expenditureReport) {
			if(err) {
				next(err);
			}
			else if (expenditureReport) {
				for ( var field in ExpenditureReport.schema.paths) {
					if ((field !== '_id') && (field !== '__v')) {
						if (associateDetails[field] !== undefined) {
							expenditureReport[field] = expenditureDetails[field];
						}
					}
				}
				expenditureReport.save(function(err) {
					if (err) {
						next(err);
					} else {
						next(null,'ExpenditureReport Updated:'+expenditureDetails._id);
					}
				});

			}
			else{
				next(null,'ExpenditureReport Not Found with Id:'+expenditureDetails._id);
			}
		});
	},
	
	delete : function(id,next) {
		ExpenditureReport.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'ExpenditureReport Deleted');
			}
		});
	}
	
	
}

module.exports = serviceFunctions;