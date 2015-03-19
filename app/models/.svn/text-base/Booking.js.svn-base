var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema(
	{
		meetingId:{type:Number,required:true},
		room:{type:Number,required:true},
		date:{type: Date,required:true},
		startTime : {type: Date,required:true},
    	endTime : {type: Date,required:true},
    	ptOfContact : {type:String,required:true},
    	mtgShortDescr : {type:String,required:true},
    	slotKeys:[{type:String}]
	},{ versionKey: false });



module.exports = mongoose.model('Bookings',bookingSchema);
