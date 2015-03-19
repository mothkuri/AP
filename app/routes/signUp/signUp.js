var express = require('express');
var router = express.Router();
var signUpService = require('../../services/SignUpServices');
var constants = require('../../services/commons/Constants');
var extend = require('util')._extend;
//save new room
router.post('/', function(req, res) {
	var response = extend({}, constants.RESPONSE);
	var signUpDetails = req.body;
	signUpService.save(signUpDetails,function(err,result){
		if(err){
			response.status=constants.ERROR;
			response.data = err;
			console.log(response);
			res.send(response);
		}
		else{
			response.status=constants.SUCCESS;
			response.data = result;
			res.send(response);
		}
	});
});
module.exports = router;