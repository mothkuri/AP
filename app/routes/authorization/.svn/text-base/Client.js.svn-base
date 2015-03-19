// Load required packages
var mongoose = require('mongoose');
var Client = require('../../models/Client').ClientModel;
var authController = require('./auth');
var express = require('express');
var router = express.Router();

// Create endpoint /api/client for POST
router.post('/', authController.isAuthenticated, function(req, res) {
	// Create a new instance of the Client model
	var client = new Client();

	// Set the client properties that came from the POST data
	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;

	// Save the client and check for errors
	client.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json({
				message : 'Client added to the locker!',
				data : client
			});
		}
	});
});
/*
 * exports.postClients = function(req, res) { // Create a new instance of the
 * Client model var client = new Client();
 *  // Set the client properties that came from the POST data client.name =
 * req.body.name; client.id = req.body.id; client.secret = req.body.secret;
 * client.userId = req.user._id;
 *  // Save the client and check for errors client.save(function(err) { if (err)
 * res.send(err);
 * 
 * res.json({ message: 'Client added to the locker!', data: client }); }); };
 */

// Create endpoint /api/clients for GET
router.get('/', authController.isAuthenticated, function(req, res) {
	// Use the Client model to find all clients
	Client.find({
		userId : req.user._id
	}, function(err, clients) {
		if (err)
			res.send(err);
		else
			res.json(clients);
	});
});
/*
 * exports.getClients = function(req, res) { // Use the Client model to find all
 * clients Client.find({ userId: req.user._id }, function(err, clients) { if
 * (err) res.send(err);
 * 
 * res.json(clients); });};
 */

module.exports = router;