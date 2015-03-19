var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');
//var connection = mongoose.createConnection("mongodb://localhost/AssociatePortal");
var connection = mongoose.createConnection('mongodb://associate:associate@ds027771.mongolab.com:27771/associateportal');
autoIncrement.initialize(connection);
var assetSchema = new Schema(
	{
		name:{type:String,required:true},
		type : {type:String,required:true,enum:['Mobile','Tablet','Other']},
		description:{type:String,required:true},
		assetId:{type:String,required:true},
		ownerId:{type:Number,required:true},
		imgName:{type:String,required:true},
		isActive:{type:Boolean,required:true,'default':true},
		isLocked:{type:Boolean,required:true,'default':false},
		lockedDate:{type:Date},
		lockedBy:{type:Number},
		createdDate:{type:Date,'default':Date.now},
		modifiedDate:{type:Date,'default':Date.now},
		requestStatus:{type:String,enum:['Pending','Approved','']}
	},{ versionKey: false });

assetSchema.plugin(autoIncrement.plugin, 'assets');
exports.assetModel = mongoose.model('assets',assetSchema);

