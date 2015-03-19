// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

// importing models
var User = require('../../models/User');
var Login = require('../../models/login');
var Client = require('../../models/Client').ClientModel;
var Token = require('../../models/Token').TokenModel;

var log4js = require('log4js');
var logger = log4js.getLogger('AssociatePortal');

passport.use(new BasicStrategy(function(username, password, callback) {
	Login.findOne({
		username : username,
		active:true
	}, function(err, user) {
		if (err) {
			return callback(err);
		}

		// No user found with that username
		if (!user) {
			return callback(null, false);
		}

		// Make sure the password is correct
		user.verifyPassword(password, function(err, isMatch) {
			if (err) {
				return callback(err);
			}

			// Password did not match
			if (!isMatch) {
				return callback(null, false);
			}

			// Success
			return callback(null, user);
		});
	});
}));

passport.use('client-basic', new BasicStrategy(function(username, password,
		callback) {
	Client.findOne({
		id : username
	}, function(err, client) {
		if (err) {
			return callback(err);
		}

		// No client found with that id or bad password
		if (!client || client.secret !== password) {
			return callback(null, false);
		}

		// Success
		return callback(null, client);
	});
}));

passport.use(new BearerStrategy(function(accessToken, callback) {

	Token.findOne({
		value : accessToken
	}, function(err, token) {
		console.log('in bearer:' + token);
		if (err) {
			return callback(err);
		}

		// No token found
		if (!token) {
			return callback(null, false);
		}

		Login.findOne({
			_id : token.userId
		}, function(err, user) {
			if (err) {
				return callback(err);
			}

			// No user found
			if (!user) {
				return callback(null, false);
			}

			// Simple example with no scope
			callback(null, user, {
				scope : '*'
			});
		});
	});
}));

passport.use(new LocalStrategy(function(username, password, callback) {
	Login.findOne({
		username : username
	}, function(err, user) {
		if (err) {
			logger.error(err);
			return callback(null);
		}

		// No user found with that username
		if (!user) {
			return callback(null, false);
		}

		// Make sure the password is correct
		user.verifyPassword(password, function(err, isMatch) {
			if (err) {
				return callback(err);
			}
			// Password did not match
			if (!isMatch) {
				return callback(null, false);
			}
			
			// Success
			user.lastLoggedIn = Date.now();
			user.save();
			return callback(null, user);
		});
	});
}));

passport.serializeUser(function(login, done) {
	done(null, login.id); 
	}); 

passport.deserializeUser(function(id, done) { 
	Login.findById(id, function(err, user) { 
		done(err, user);
	});
});
	


/*
 * exports.isAuthenticated = passport.authenticate([ 'basic', 'bearer' ], {
 * session : false });
 */

// As with any middleware it is quintessential to call next()
// if the user is authenticated
exports.isLoggedin = function(req, res, next) {
	if (typeof req.session !=="undefined" && typeof req.session.user !=="undefined") {
		req.user=req.session.user;
		return next();
	}
	else{
		res.status(401).render('error401');        
	}
}


exports.isUserAdmin = function(req, res, next) {
	if (typeof req.session !=="undefined" && typeof req.session.user !=="undefined" && req.session.user.isAdmin===true) {
		req.user=req.session.user;
		return next();
	}
	else{
		res.status(401).render('error401');        
	}
}


exports.isAuthenticated = passport.authenticate('basic', {
	session : false
});

exports.isClientAuthenticated = passport.authenticate('client-basic', {
	session : false
});
exports.isBearerAuthenticated = passport.authenticate('bearer', {
	session : false
});

exports.isLocalAuthenticated = passport.authenticate('local', {
	session : true
});
