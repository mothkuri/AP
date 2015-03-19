var express = require('express');
var router = express.Router();
var eventService = require('../../services/EventService');
// create new associate
router.post('/', function(req, res) {
		var eventDetails = req.body;
		var loggedInUserId = req.session.user.username;
		eventService.save(eventDetails,loggedInUserId,function(err){
			if(err){
				res.send(err);
			}
			else{
				res.send(200);
			}
		});
});

//get all events sorted by their ID
router.get('/', function(req, res) {

	eventService.getAll(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});

});

// get event by ID
router.get('/:id', function(req, res) {
	eventService.getById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

// update event
router.put('/', function(req, res) {
	var associateDetails = req.body;
	var loggedInUserId = req.session.user.username;
	eventService.edit(associateDetails,loggedInUserId,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});


});

// deletes event by id
router.delete('/:id', function(req, res) {
	
	eventService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
