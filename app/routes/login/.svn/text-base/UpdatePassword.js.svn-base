var express = require('express');
var router = express.Router();
var authController = require('../authorization/auth');
var passwordService = require('../../services/PasswordServices');
// login
router.post('/' ,function(req, res) {
	passwordService.updatePassword(req.body,req.session.username,function(err){
		if(err){
			res.send(err);
		}
		else{
			res.redirect('/');
		}
	});
});

router.get('/' ,function(req, res) {
	res.send('redirect to update password page.');
});


module.exports = router;
