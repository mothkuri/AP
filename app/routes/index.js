var express = require('express');
var router = express.Router();
var cryptoService = require('../services/CryptoServices');
var authController = require('./authorization/auth');
var extend = require('util')._extend;
var constants = require('../services/commons/Constants');
var _=require('lodash');
/* GET home page. */
/*router.get('/home', authController.isLoggedin, function(req, res) {
	if (req.query.code) {
		res.send(req.query.code);
	} else {
		res.sendfile('./public/main/home.html');
	}
});*/

router.get('/register', function(req, res) {
		res.sendfile('./public/main/register.html');
});


router.get('/session', authController.isLoggedin, function(req, res) {
	console.log('in session');
	var response = extend({}, constants.RESPONSE);
	response.status = constants.SUCCESS;
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
	res.send(response);
});

router.post('/upload', function(req, res) {
var file = req.files.file.path.split('uploads');
var fileName = file[file.length-1];
console.log(fileName);
	res.send({"fileName":fileName});
});

/*exports.create = function (req, res, next) {
    var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize(cfg.data + '/uploads')
        , file = req.files.file;

        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
};*/

module.exports = router;
