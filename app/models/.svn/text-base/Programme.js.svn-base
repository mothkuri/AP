var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var programmeSchema = new Schema({
	name : {
		type : String,
		required : true,
		validate : validate({
			validator : 'isLength',
			arguments : [ 2, 10 ],
			message : 'Name should be between 2 and 10 characters'
		})
	},
	primaryAdminHead : [ {
		type : Number,
		required : true
	} ],
	adminHeads : [ {
		type : Number,
		required : true
	} ]

}, {
	versionKey : false
});

module.exports = mongoose.model('programmeDetails', programmeSchema);