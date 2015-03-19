var express = require('express');
var router = express.Router();
var authController = require('./authorization/auth');

// login
router.get('/', function(req, res) {
	req.session.destroy();
	res.status(200).end();
});

module.exports = router;
