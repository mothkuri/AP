var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildingLocationSchema = new Schema(
	{
		_id:{type:Number,required:true},
		name:{type:String,required:true},
		buildings:{type:String,required:true}
	},{ versionKey: false });



module.exports = mongoose.model('BuildingLocation',buildingLocationSchema);