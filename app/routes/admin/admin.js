var express = require('express');
var router = express.Router();
var adminService = require('../../services/AdminServices');
var extend = require('util')._extend;
var constants = require('../../services/commons/Constants');
var authController = require('../authorization/auth');

router.post('/',authController.isUserAdmin, function(req, res) {
	var response = extend({}, constants.RESPONSE);
	var ids = req.body.ids;
	adminService.changeStatus(ids, function(err, result) {
		if (err) {
			response.status=constants.ERROR;
			response.data=err;
			res.send(response);
		} else {
			response.status=constants.SUCCESS;
			response.data=result;
			res.send(response);
		}
	});
});

router.get('/',authController.isUserAdmin, function(req, res) {
	adminService.checkAllInactive(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;
