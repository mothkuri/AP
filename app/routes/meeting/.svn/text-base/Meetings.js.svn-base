var express = require('express');
var router = express.Router();
var meetingService = require('../../services/MeetingService');

//create new event/booking
router.post('/', function(req, res) {
	var meetingDetails = req.body;
	var loggedInUserId = req.session.user.username; 
	meetingService.newMeeting(meetingDetails,loggedInUserId,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get All Bookings
router.get('/', function(req, res) {
	meetingService.getAllMeeting(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get By Room Id
router.get('/:room', function(req, res) {
	var meetingByRoom = req.params.room;
	console.log('meetingByRoom'+meetingByRoom);
	meetingService.getMeetingByRoom(meetingByRoom,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get the bookings by boked by Name
router.get('/meetingCreated/:meetingCreated', function(req, res) {
	var meetingCreated =req.params.meetingCreated;
	console.log("meetingCreated:"+req.params.userCreated);
	meetingService.getAllMeetingsByName(meetingCreated,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get the booking by date
router.get('/date/:meetingStart', function(req, res) {
	var meetingDate = req.params.meetingStart;
	console.log('bookingDate'+meetingDate);
	meetingService.getMeetingByDate(meetingDate,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get  booking by type 
router.get('/meeting/:type', function(req, res) {
	var meetingByType = req.params.type
	console.log('meetingByType'+meetingByType);
	meetingService.getMeetingByType(meetingByType,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//edit bookings  by meeting
router.put('/edit/:Id', function(req, res) {
	var meetingDetails = req.body;
	var loggedInUserId = req.session.user.username; 
	console.log("meeting id is::"+meetingDetails._id);
	meetingService.editByMeetingId(meetingDetails,loggedInUserId,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//delete the booking by roomId
router.delete('/:Id', function(req, res) {
	console.log('coming here');
	var Id = req.params.Id;
	console.log('meeting Id'+Id);
	meetingService.deleteById(Id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

module.exports = router;
