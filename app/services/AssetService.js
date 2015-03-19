var Asset = require('../models/asset').assetModel;
var AssetHistory = require('../models/AssetHistory').assetHistoryModel;

var serviceFunctions = {
	save : function(assetDetails,next) {
		var asset = new Asset(assetDetails);
		//Asset.DOJ = new Date(assetDetails.DOJ);

		asset.save(function(err) {
			if (err) {
				next(err);
			} else {
				next(null);
			}
		});
	},

	getAll : function(next) {
		var query = Asset.find().sort({_id:1});
		query.exec(function(err, Asset) {
			if (err){
				next(err);
			}
			else if(Asset.length!=0){
				next(null,Asset);
			}
			else{
				next(null,'No Assets Found');
			}
		});
	},
	
	getById : function(id,next) {
		var query = Asset.findOne({
			_id : id
		});
		query.exec(function(err, Asset) {
			if (err){
				next(err);
			}
			else if(Asset){
				next(null,Asset);
			}
			else{
				next(null,'No Asset Found with ID: '+id);
			}
		});
	},
	
	edit : function(assetDetails,next) {
		var id= assetDetails._id;
		delete assetDetails._id;
		Asset.update({_id:id},assetDetails,{},function(err) {
			if (err) {
				next(err);
			} else {
				next(null);
			}
		});
	},
	
	
	
	lock : function(id,userId,next) {
		var query = Asset.findOne({
			_id : id
		});
		query.exec(function(err, asset) {
			if (err){
				next(err);
			}
			else if(!asset.isLocked){
				asset.isLocked = true;
				asset.lockedBy=userId;
				asset.requestStatus='Pending';
				asset.lockedDate= new Date();
				
				asset.save(function(err){
					if(err){
						next(err);	
					}
					else{
						var assetHistory = new AssetHistory();
						assetHistory.assetId=id;
						assetHistory.modifiedDate=asset.lockedDate;
						assetHistory.action='Locked';
						assetHistory.modifiedBy=userId;
						assetHistory.save(function(err){
							if(err){
								next(err);
							}
							else{
								next(null);
							}
						});
					}
				});
				
			}
			else{
				next(null,'No Asset Found or already locked by someone: '+id);
			}
		});
	},
	
	approve : function(id,userId,next) {
		var query = Asset.findOne({
			_id : id
		});
		query.exec(function(err, asset) {
			if (err){
				next(err);
			}
			else if(asset.isLocked){
				asset.requestStatus='Approved';
				asset.save(function(err){
					if(err){
						next(err);	
					}
					else{
						var assetHistory = new AssetHistory();
						assetHistory.assetId=id;
						assetHistory.modifiedDate=new Date();
						assetHistory.action='Approved';
						assetHistory.modifiedBy=userId;
						assetHistory.save(function(err){
							if(err){
								next(err);
							}
							else{
								next(null);
							}
						});
					}
				});
				
			}
			else{
				next(null,'Asset not found or not locked yet '+id);
			}
		});
	},
	
	
	deny : function(id,userId,next) {
		var query = Asset.findOne({
			_id : id
		});
		query.exec(function(err, asset) {
			if (err){
				next(err);
			}
			else if(asset.isLocked){
				asset.requestStatus='';
				asset.isLocked=false;
				asset.save(function(err){
					if(err){
						next(err);	
					}
					else{
						var assetHistory = new AssetHistory();
						assetHistory.assetId=id;
						assetHistory.modifiedDate=new Date();
						assetHistory.action='Rejected';
						assetHistory.modifiedBy=userId;
						assetHistory.save(function(err){
							if(err){
								next(err);
							}
							else{
								next(null);
							}
						});
					}
				});
				
			}
			else{
				next(null,'Asset not found or not locked yet '+id);
			}
		});
	},
	
	
	unlock : function(id,userId,next) {
		var query = Asset.findOne({
			_id : id
		});
		query.exec(function(err, asset) {
			if (err){
				next(err);
			}
			else if(asset.isLocked){
				asset.isLocked = false;
				asset.lockedBy='';
				asset.lockedDate= '';
				asset.requestStatus='';
				asset.save(function(err){
					if(err){
						next(err);	
					}
					else{
						var assetHistory = new AssetHistory();
						assetHistory.assetId=id;
						assetHistory.modifiedDate=new Date();
						assetHistory.action='Unlocked';
						assetHistory.modifiedBy=userId;
						assetHistory.save(function(err){
							if(err){
								next(err);
							}
							else{
								next(null);
							}
						});
					}
				});
				
			}
			else{
				next(null,'Asset not found or already unlocked '+id);
			}
		});
	},
	
	delete : function(id,next) {
		Asset.remove({_id : id},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Asset Deleted');
			}
		});
	}
	
	
}

module.exports = serviceFunctions;