var express = require('express');
var router = express.Router();
var authController = require('./authorization/auth');
var extend = require('util')._extend;
var constants = require('../services/commons/Constants');
// login
router.post('/', authController.isLocalAuthenticated, function(req, res) {
	var response = extend({}, constants.RESPONSE);
			var redirectUri=req.session.url;
			delete req.session.url;
			response.status = constants.SUCCESS;
			if(req.user.status==="active"){
				req.session.user=req.user;
				response.data={
						"firstName":req.user.firstName,
						"lastName":req.user.lastName,
						"userName":req.user.username,
						"status":req.user.status,
						"isAdmin":req.user.isAdmin,
						"email":req.user.email,
						"program":req.user.program,
						"isProfileComplete":req.user.isProfileComplete
						}
			}
			else{
				response.data={
						"userName":req.user.username,
						"status":req.user.status
						}
			}
		
			res.send(response);
});

router.get('/', function(req, res) {
	console.log('in login');
	res.sendfile('./public/main/login.html');
});

module.exports = router;
