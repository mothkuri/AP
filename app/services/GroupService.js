var Group = require('../models/Group').groupModel;
var Associate = require('../models/AssociateDetails');

var serviceFunctions = {
	save : function(groupDetails,loggedInUserId,next) {
		if(typeof groupDetails.members !=='undefined'){
			groupDetails.members = groupDetails.members.split(',');
			groupDetails.createdBy=loggedInUserId;
			// checking whether all members are registered associates
			Associate.count({ _id: { $in: groupDetails.members } },function(err,count){
				if(err){
					next(err);
					return;
				}
				else{
					if(count !== groupDetails.members.length){
						next('Invalid Members');
						return;
					}
				}
				
				Associate.count({ _id: groupDetails.owner },function(err,count){
					if(err){
						next(err);
						return;
					}
					else{
						if(count === 0){
							next('Owner is not yet registered: '+ groupDetails.owner);
							return;
						}
					}
					
					var group = new Group(groupDetails);
					group.save(function(err) {
						if (err) {
							next(err);
						} else {
							next(null);
						}
					});
					
				});
				
				
			});
		}
		else{
			var group = new Group(groupDetails);
			group.save(function(err) {
				if (err) {
					next(err);
				} else {
					next(null);
				}
			});
		}
		
		
	},

	getAll : function(next) {
		var query = Group.find().sort({_id:-1});
		query.exec(function(err, groups) {
			if (err){
				next(err);
			}
			else if(groups.length!=0){
				next(null,groups);
			}
			else{
				next(null,'No Groups Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = Group.findOne({
			_id : id
		});
		query.exec(function(err, group) {
			if (err){
				next(err);
			}
			else if(group){
				next(null,group);
			}
			else{
				next(null,'No Group Found with ID: '+id);
			}
		});
	},
	
	edit : function(groupDetails,next) {
		var query = Group.findOne({
			_id : groupDetails._id
		});
		query.exec(function(err, group) {
			if(err) {
				next(err);
			}
			else if (group) {
				for ( var field in Group.schema.paths) {
					if ((field !== '_id') && (field !== '__v')) {
						if (associateDetails[field] !== undefined) {
							group[field] = groupDetails[field];
						}
					}
				}
				group.save(function(err) {
					if (err) {
						next(err);
					} else {
						next(null,'Group Updated:'+groupDetails._id);
					}
				});

			}
			else{
				next(null,'Group Not Found with Id:'+groupDetails._id);
			}
		});
	},
	
	delete : function(id,next) {
		Group.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Group Deleted');
			}
		});
	}
	
	
}

module.exports = serviceFunctions;