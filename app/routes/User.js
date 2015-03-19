// Load required packages
var User = require('../models/User');
var express = require('express');
var router = express.Router();

// Create endpoint /api/users for POST
router.post('/',function(req,res){
	var user = new User({
		username : req.body.username,
		password : req.body.password
	});

	user.save(function(err) {
		if (err){
			res.send(err);
		}
		else{
		res.json({
			message : 'New User added!'
		});
		}
	});
});

// Create endpoint /api/users for GET
router.get('/',function(req,res){
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
});


module.exports = router;