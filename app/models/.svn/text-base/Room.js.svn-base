var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema(
	{
		_id:{type:Number, min:1, required:true},
		ODC:{type:Number,required:true},
		location:{type:String,required:true},
		building:{type:String,required:true},
		floor:{type:Number,required:true},
		type:{type:String,required:true}
	},{ versionKey: false });



module.exports = mongoose.model('rooms',roomSchema);
