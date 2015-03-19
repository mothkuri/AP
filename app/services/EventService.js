var Event = require('../models/Event').eventModel;
var ExpenditureReport = require('../models/ExpenditureReport').expenditureReportModel;
var Group = require('../models/Group').groupModel;
var Associate = require('../models/AssociateDetails');
var _=require('lodash');
var serviceFunctions = {
	save : function(eventDetails,loggedInUserId,next) {
		eventDetails.hosts = eventDetails.hosts.split(',');
		eventDetails.eventAdmins = eventDetails.eventAdmins.split(',');
		eventDetails.createdBy=loggedInUserId;
		var users = _.union(eventDetails.hosts,eventDetails.eventAdmins);
		console.log(users);
		//checking whether all hosts are registered associates
		Associate.count({ _id: { $in: users } },function(err,count){
			if(err){
				next(err);
				return;
			}
			else{
				if(count !== users.length){
					next('Invalid Hosts or Event Admins');
					return;
				}
			}
			//checking whether all event admins are registered associates
			Group.count({ _id: eventDetails.groupId },function(err,count){
				if(err){
					next(err);
					return;
				}
				else if(count === 0){
					next('Invalid Group: '+eventDetails.groupId);
					return;
				}
				
				if(typeof eventDetails.expenditureId!=='undefined'){
					ExpenditureReport.count({ _id: eventDetails.expenditureId },function(err,count){
						if(err){
							next(err);
							return;
						}
						else if(count === 0){
							next('Invalid Expenditure :'+eventDetails.expenditureId);
							return;
						}
						saveEvent(eventDetails,next);
					});
				}
				else{
					saveEvent(eventDetails,next);
				}
					
				
			});
		});
		
	},

	getAll : function(next) {
		var query = Event.find().sort({_id:-1});
		query.exec(function(err, events) {
			if (err){
				next(err);
			}
			else if(events.length!=0){
				next(null,events);
			}
			else{
				next(null,'No Events Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = Event.findOne({
			_id : id
		});
		query.exec(function(err, event) {
			if (err){
				next(err);
			}
			else if(event){
				next(null,event);
			}
			else{
				next(null,'No Event Found with ID: '+id);
			}
		});
	},
	
	edit : function(eventDetails,loggedInUserId,next) {
		var users=[];
		var query = Event.findOne({
			_id : eventDetails._id
		});
		query.exec(function(err, event) {
			if(err) {
				next(err);
			}
			else if (event) {
				event.modifiedBy=loggedInUserId;
				for ( var field in Event.schema.paths) {
					if ((field !== '_id') && (field !== '__v')) {
						if (eventDetails[field] !== undefined) {
							if(field==='hosts' || field==='eventAdmins'){
								event[field] = eventDetails[field].split(',');
								users = _.union(event[field],users);
							}
							else
							event[field] = eventDetails[field];
						}
					}
				}
				Associate.count({ _id: { $in: users } },function(err,count){
					if(err){
						next(err);
						return;
					}
					else if(count !== users.length){
						next('Invalid Users in Hosts or Event Admins');
						return;
					}
					event.save(function(err) {
						if (err) {
							next(err);
						} else {
							next(null,'Event Updated:'+eventDetails._id);
						}
					});

				});
				
			}
			else{
				next(null,'Event Not Found with Id:'+eventDetails._id);
			}
		});
	},
	
	delete : function(id,next) {
		Event.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Event Deleted');
			}
		});
	}
	
	
}

function saveEvent(eventDetails,next){
	var event = new Event(eventDetails);
	event.save(function(err) {
		if (err) {
			next(err);
		} else {
			next(null);
		}
	});
}
module.exports = serviceFunctions;