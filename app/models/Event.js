var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');
//var connection = mongoose.createConnection("mongodb://localhost/AssociatePortal");
var connection = mongoose.createConnection('mongodb://associate:associate@ds027771.mongolab.com:27771/associateportal');

autoIncrement.initialize(connection);


var eventSchema = new Schema(
	{
		name:{type:String,required:true},
		type : {type:String,required:true,enum:['Technical','Fun','Game','Forum','Discussion']},
		hosts:{type:[Number],required:true},
		startDate:{type:Date,required:true},
		endDate:{type:Date,required:true},
		isRecurring:{type:Boolean,required:true},
		description:{type:String,required:true},
		galleryId:{type:Number},
		eventAdmins:{type:[Number],required:true},
		createdDate:{type:Date,required:true,'default':new Date()},
		modifiedDate:{type:Date},
		createdBy:{type:Number,required:true},
		modifiedBy:{type:Number},
		groupId:{type:Number,required:true},
		expenditureId:{type:Number}
	},{ versionKey: false });

eventSchema.plugin(autoIncrement.plugin, 'Events');
exports.eventModel = mongoose.model('Events',eventSchema);

