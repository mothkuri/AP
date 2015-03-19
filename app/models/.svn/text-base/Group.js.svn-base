var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var groupSchema = new Schema(
	{
		name:{type:String,required:true},
		description : {type:String,required:true},
		members:{type:[Number],required:true},
		owner:{type:Number,required:true},
		createdDate:{type:Date,'default':new Date()},
		modifiedDate:{type:Date},
		createdBy:{type:Number,required:true},
		modifiedBy:{type:Number},
		active:{type:Boolean,'default':true}
	},{ versionKey: false });


groupSchema.plugin(autoIncrement.plugin, 'Groups');
exports.groupModel = mongoose.model('Groups',groupSchema);