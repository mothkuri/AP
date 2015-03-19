var express = require('express');
var router = express.Router();
var roomService = require('../../services/RoomService');

//save new room
router.post('/', function(req, res) {
	var roomDetails = req.body;
	roomService.save(roomDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get all rooms
router.get('/', function(req, res) {
	roomService.getAll(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get all rooms by buildings
router.get('/building/:building', function(req, res) {
	var roomByBuilding = req.params.building
	roomService.getAllByBuilding(roomByBuilding,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get all rooms by locations
router.get('/location/:location', function(req, res) {
	var roomByLocation = req.params.location
	roomService.getAllByLocation(roomByLocation,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});


//get all rooms by type
router.get('/type/:type', function(req, res) {
	roomService.getAllByType(req.params.type,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get by id
router.get('/id/:id', function(req, res) {
	roomService.getById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});


//edit by id
router.put('/', function(req, res) {
	var roomDetails = req.body;
	roomService.editById(roomDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//delete by id
router.delete('/:id', function(req, res) {
	roomService.deleteById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

module.exports = router;
