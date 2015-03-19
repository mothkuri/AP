var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var expenditureReportSchema = new Schema(
	{
		groupId:{type:[Number],required:true},
		totalExpenses : {type:Number,required:true},
		eventId:{type:Number,required:true},
		expenseDetails:{type:String,required:true},
		credit:{type:Number},
		debit:{type:Number},
		date:{type:Date,required:true},
		enteredBy:{type:Number,required:true},
		enteredOn:{type:Date,required:true,'default' : new Date()}
	},{ versionKey: false });


expenditureReportSchema.plugin(autoIncrement.plugin, 'ExpenditureReports');
exports.expenditureReportModel = mongoose.model('ExpenditureReports',expenditureReportSchema);