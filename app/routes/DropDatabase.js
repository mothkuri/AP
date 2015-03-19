var express = require('express');
var router = express.Router();
var utils = require('../services/commons/Utils');
var constants = require('../services/commons/Constants');

// drops complete db
router.get('/', function(req, res) {
	var response = {
			"status" : "",
			"data" : null,
			"message" : ""
		};

	utils.dropDatabase(function(err, result) {
		if (err) {
			response.status = constants.ERROR;
			response.message = err;
		} else {
			response.status = constants.SUCCESS;
		}
		res.send(response);
	});

});

module.exports = router;