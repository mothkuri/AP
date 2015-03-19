var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
/* var fs = require('fs'); */
// validate: /^.{5,30}$/
var associateSchema = new Schema(
	{
		_id:{type:Number, required: true},
		firstName:{type:String, required: true,validate: validate({
		    validator: 'isLength',
		    arguments: [3, 50],
		    message: 'Name should be between 3 and 50 characters'
		  })  },
		lastName:{type:String, required: true,validate: validate({
			    validator: 'isLength',
			    arguments: [3, 50],
			    message: 'Name should be between 3 and 50 characters'
			  })  },
		designation:{type:String, enum:['ASE(T)','ASE','SE','ITA','AST','ASOC','CON','SCON','PCON'],required: true},
//		privilege:{type:String, required: true},
//		group:{type:String, required: true},
		cardNumber:{type:Number, required: true},
		DOJTcs:{type:Date, required: true},
		DOJQualcomm:{type:Date, required: true},
		DOB:{type:Date, required: true},
		createdDate:{ type: Date, 'default': new Date() },
		modifiedDate:{ type: Date, 'default': new Date() },
		H1B_Eligible:Boolean,
		visaStatus:{type:String,enum:['Eligible','Applied','Granted','Expired']},
		visaType:{type:String,enum:['H1B','L1B','B1','L1A']},
//		location:{type:String, required: true},
		phone:{type:Number, required: true},
		extension:{type:Number, required: true},
		email:{type:String, validate: /^[a-zA-Z0-9._%+-]+@tcs.com$/, required: true},
		qualEmail:{type:String, validate: /^[a-zA-Z0-9._%+-]+@qualcomm.com$/},
		cubicleNumber:{type:String},
		assetID:{type:String},
		ipAddress:{type:String},
		ODC:{type:String,enum:['2F 1','2F 4','2F 5','3F 2','3F 3']},
		program:{type:String, required: true},
		supervisorID:{type:Number, required: true},
		status:{type:String,enum:['Offshore','Onsite','Released']},
		experiencePreTCS:{type:Number, required: true},
		role:{type:String,enum:['GL','PL','PM','TM','TL','TW'],required: true},
		wonNo:{type:Number},
		highestQual:{type:String,enum:['BA/BSc','BBA','BCA','BE/B.Tech','MA/MSc','MCA','ME/M.Tech','MBA']},
		specialization:{type:String}
		
	},{ versionKey: false });

module.exports = mongoose.model('associateDetails',associateSchema);