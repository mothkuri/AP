var Programme = require('../models/Programme');
var Associate=require('../models/AssociateDetails');
var _=require('lodash');

var serviceFunctions = {
	save : function(programmeDetails,next) {
		programmeDetails.primaryAdminHead=JSON.parse(programmeDetails.primaryAdminHead);
		programmeDetails.adminHeads=JSON.parse(programmeDetails.adminHeads);
		var programme = new Programme(programmeDetails);
		//var nonExistentAssociate=programme.primaryAdminHead.concat(programmeDetails.adminHeads);
		var nonExistentAssociate=_.union(programme.primaryAdminHead,programme.adminHeads);
		Associate.find({_id:{$in:nonExistentAssociate}},{_id:1},function(err,associate){
			if(err){
				next(err);
			}
			else if(nonExistentAssociate.length==associate.length){
					programme.save(function(err) {
						if (err) {
							next(err);
						} else {
							next(null);
						}
					});	
				}
			else{
				var index=0;
				for(var i=0;i<associate.length;i++){
					index=nonExistentAssociate.indexOf(associate[i]._id);
					if(index>-1){
						nonExistentAssociate.splice(index,1);
					}
				}
				next("Associate/s "+nonExistentAssociate+" not found");
			}
			});
	},
	getAll : function(next) {
		var query = Programme.find().sort({_id:1});
		query.exec(function(err, programme) {
			if (err){
				next(err);
			}
			else if(programme.length!=0){
				next(null,programme);
			}
			else{
				next(null,'No Programmes Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = Programme.findOne({
			_id : id
		});
		query.exec(function(err, programme) {
			if (err){
				next(err);
			}
			else if(programme){
				next(null,programme);
			}
			else{
				next(null,'No Programme Found with ID: '+id);
			}
		});
	},
	
	edit : function(programmeDetails,next) {
		var query = Programme.findOne({
			_id : programmeDetails._id
		});
		query.exec(function(err, programme) {
			if(err) {
				next(err);
			}
			else if (programme) {
				for ( var field in Programme.schema.paths) {
					if ((field !== '_id') && (field !== '__v')) {
						if (programmeDetails[field] !== undefined) {
							programme[field] = programmeDetails[field];
						}
					}
				}
				programme.save(function(err) {
					if (err) {
						next(err);
					} else {
						next(null,'Programme Updated:'+programmeDetails._id);
					}
				});

			}
			else{
				next(null,'Programme Not Found with Id:'+programmeDetails._id);
			}
		});
	},
	
	delete : function(id,next) {
		Programme.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Programme Deleted');
			}
		});
	}
	
	
}

module.exports = serviceFunctions;