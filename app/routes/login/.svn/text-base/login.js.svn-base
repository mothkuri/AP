var express = require('express');
var router = express.Router();
var loginService = require('../../services/LoginServices');

//save new room
router.post('/', function(req, res) {
	var loginDetails = req.body;
	
	loginService.find(loginDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

module.exports = router;
