var Associate = require('../models/AssociateDetails');
var Login = require('../models/login');

var serviceFunctions = {
	save : function(associateDetails,next) {
		var associate = new Associate(associateDetails);
		//associate.DOJ = new Date(associateDetails.DOJ);

		associate.save(function(err) {
			if (err) {
				next(err);
			} else {
				Login.update({username:associate._id},{$set:{"isProfileComplete":true}},{},function(err,numAffected){
					if(err){
						next(err);
					}
					else{
						next(null);
					}
				});
			}
		});
	},

	getAll : function(next) {
		var query = Associate.find().sort({_id:1});
		query.exec(function(err, associate) {
			if (err){
				next(err);
			}
			else if(associate.length!=0){
				next(null,associate);
			}
			else{
				next(null,'No Associates Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = Associate.findOne({
			_id : id
		});
		query.exec(function(err, associate) {
			if (err){
				next(err);
			}
			else if(associate){
				next(null,associate);
			}
			else{
				next(null,'No Associate Found with ID: '+id);
			}
		});
	},
	
	
	getAutoComplete : function(name,next) {
		var reg = new RegExp('^'+name,'i');
		var query = Associate.find( { firstName : reg },{_id:1,firstName:1,lastName:1});
		query.exec(function(err, associates) {
			if (err){
				console.log('in err'+err)
				next(err);
			}
			else if(associates){
				var response=[];
				
				for(var i=0;i<associates.length;i++){
					response.push({'label': associates[i].firstName+' '+associates[i].lastName+'-'+associates[i]._id,'value': associates[i].firstName+' '+associates[i].lastName+'-'+associates[i]._id});
				}
				next(null,response);
			}
			else{
				console.log('in else')
				next(null,'No Associate Found with ID: '+id);
			}
		});
	},
	
	edit : function(associateDetails,next) {
		
		Associate.update({_id:associateDetails._id},associateDetails,{},function(err) {
					if (err) {
						next(err);
					} else {
				next(null);
			}
		});
	},
	
	delete : function(id,next) {
		Associate.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Associate Deleted');
			}
		});
	}
	
	
}

module.exports = serviceFunctions;