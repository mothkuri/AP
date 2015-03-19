var express = require('express');
var router = express.Router();
var bookingService = require('../../services/BookingService');

//create new event/booking
router.post('/', function(req, res) {
	var bookingDetails = req.body;
	console.log('bookingDetails'+ bookingDetails);
	bookingService.newBooking(bookingDetails,function(err,result){
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
	bookingService.getAllbooking(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get By Room Id
router.get('/:roomId', function(req, res) {
	var bookingByRoomId = req.params.roomId
	console.log('bookingByRoomId'+bookingByRoomId);
	bookingService.getBookingByRoomId(bookingByRoomId,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get the bookings by boked by Name
router.get('/bookedByName/:bookedByName', function(req, res) {
	var bookedByName =req.params.bookedByName
	bookingService.getAllbookedByName(bookedByName,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get the booking by date
router.get('/date/:date', function(req, res) {
	var bookingDate = req.params.date;
	console.log('bookingDate'+bookingDate);
	bookingService.getBookingByDate(bookingDate,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//get  booking by type 
router.get('/events/:type', function(req, res) {
	var eventsByType = req.params.type
	console.log('eventsByType'+eventsByType);
	bookingService.getBookingByType(eventsByType,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//edit bookings  by roomId
router.put('/edit/:roomId', function(req, res) {
	var bookingDetails = req.body;
	bookingService.editByRoomId(bookingDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//delete the booking by roomId
router.delete('/:roomId', function(req, res) {
	console.log('coming here');
	var roomId = req.params.roomId;
	console.log('roomId'+roomId);
	bookingService.deleteByRoomId(roomId,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

module.exports = router;
