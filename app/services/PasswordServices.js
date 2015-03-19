var Login = require('../models/login');
var bcrypt = require('bcrypt-nodejs');
var passwordServices = {
	updatePassword : function(loginDetails,username, callback) {
		var newPassword = loginDetails.newPassword;
		Login
				.findOne(
						{
							username : username
						},
						function(err, login) {
							if (err) {
								callback(err);
							} else {
								login.verifyPassword(
												loginDetails.password,
												function(err, isMatch) {
													if (err) {
														callback(err);
													} else if (!isMatch) {
														callback('Old Password is Wrong. Please Try Again!')
													} else {
														if (loginDetails.password === loginDetails.newPassword) {
															callback('New Password is same as Old Password. Please choose a different Password.');
														} else {
															login.password = newPassword;
															login.status = 'active';
															login.save(function(err) {
																		if (err) {
																			callback(err);
																		} else {
																			callback(null);
																		}
																	});
														}

													}
												});
							}
						});

	}
};

module.exports = passwordServices;