var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var loginSchema = new Schema(
	{
		username:{type:Number,required:true,unique:true},
		password:{type:String,required:true},
		status:{type:String,enum:['active','inactive','suspended','locked'],required:true},
		isAdmin:{type:Boolean,'default':false},
		isProfileComplete:{type:Boolean,'default':false},
		firstName:{type:String,required:true},
		lastName:{type:String,required:true},
		email:{type:String, validate: /^[a-zA-Z0-9._%+-]+@tcs.com$/, required: true},
		program:{type:String,enum:['CAS','ITHR','Omnitracs','BI','EIS'],required:true},
		passwordExpiry:{type:Date,'default':Date.now},
		lastLoggedIn:{type:Date}
	},{ versionKey: false });



//Execute before each login.save() call
loginSchema.pre('save', function(callback) {
  var login = this;
  // Break out if the password hasn't changed
  if (!login.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(login.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      login.password = hash;
      callback();
    });
  });
});

loginSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('loginDetails',loginSchema);