var express = require('express');
var router = express.Router();
var groupService = require('../../services/GroupService');
// create new associate
router.post('/', function(req, res) {
		var groupDetails = req.body;
		var loggedInUserId = req.session.user.username;
		groupService.save(groupDetails,loggedInUserId,function(err){
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

	groupService.getAll(function(err,result){
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
	groupService.getById(req.params.id,function(err,result){
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
	var groupDetails = req.body;
	groupService.edit(groupDetails,function(err,result){
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
	
	groupService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
