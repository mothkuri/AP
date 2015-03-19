var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetHistorySchema = new Schema(
	{
		assetId:{type:String,required:true},
		modifiedDate:{type:Date},
		action:{type:String,enum:['Locked','Unlocked','Approved','Rejected']},
		modifiedBy:{type:Number,required:true}
	},{ versionKey: false });

exports.assetHistoryModel = mongoose.model('assetHistory',assetHistorySchema,'AssetHistory');

