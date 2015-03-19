var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema(
	{
		_id : {type: Number,min:1, required:true},
		shortDesc:{type:String,required:true},
		description:{type:String,required:true},
		priority : {type:String,required:true},
    	type : {type:String,required:true},
    	room : {type:Number,required:true},
    	isRecurring :Boolean,
    	recurrenceExpression : {type: String,required:true},
    	meetingStart : {type: Date,required:true},
    	meetingEnd : {type:Date},
    	duration : {type:Number},
    	frequency:{type:String},
    	userCreated : {type:Number,required:true},
    	userModified : {type:Number,required:true},
    	createdDate: {type: Date,default:new Date(),required:true},
    	modifiedDate: {type: Date,default:new Date(),required:true},
    	attendees : [{type:Number,
    	             required:true}
    	             ]
	},{ versionKey: false });



module.exports = mongoose.model('Meetings',meetingSchema);