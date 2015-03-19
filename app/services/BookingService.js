var Booking = require('../models/Booking');
var Room = require('../models/Room');
var Associate = require('../models/AssociateDetails');
var mongoose = require('mongoose');

var bookingService = {
	newBooking : function(bookingDetails, next) {

		//var date = new Date(bookingDetails.roomBookingDate);
	
		var fromDate = bookingDetails.from;
		fromDate =new Date(fromDate);
		var toDate =  bookingDetails.to;
		toDate = new Date(toDate);
		
		var date=new Date();
		var dayOfWeek=date.getDay();
		
		var queryAssociate = Associate.findOne({
			_id :bookingDetails.bookedBy,
			name :	bookingDetails.bookedByName
		});
		
		var queryRoom = Room.findOne({
			_id : bookingDetails.roomId
		});
		if(bookingDetails.length == null){
			next(null, "Booking not allowed with null values");
		}else if(bookingDetails.length != null){
		queryAssociate.exec(function(err,associate){
			if(err){
				next(err);
			}else if(associate) {
				queryRoom.exec(function(err,rooms){
					console.log("rooms::"+rooms);
						if(err){
							next(err);
						}else if(rooms) {
							console.log("rooms::"+rooms);
						if ((dayOfWeek == 6 || dayOfWeek == 0)
								&& fromDate == date && toDate == date) {
							next(null, "Booking not allowed for Weekends");
						} else {
							var queryBetweenTime = Booking.find({
								roomId : bookingDetails.roomId,
								$or : [ 
								   {$and : [ {from : {$lte : fromDate}}, {to : {$gt : fromDate}} ]},
								   {$and : [ {from : {$lt : toDate}}, {to : {$gte : toDate}} ]}, 
								   {$and : [ {from : {$gte : fromDate}}, {to : {$lte : toDate}} ]},
									]
							});
							if (fromDate >= new Date() && toDate >= new Date()) {
								queryBetweenTime.exec(function(err, timeBtw) {
											if (err) {
												next(err);
											} else if (timeBtw != null && timeBtw.length != 0) {
												next(null,'Your time slot will fall in a already booked slot. Please select another.');
											} else {
												booking = new Booking(bookingDetails);
												console.log('booking::'+ booking);
												getNextId(function(err,nextId){
													booking._id = nextId;
													booking.save(function(err) {
														if (err) {
															next(err);
														} else {
															next(null,'New Booking is created with event details.');
														}
													});
												}); 
											}
										});
							} else {
								next(null,
										'Booking cannot be done for older dates.');
							}
						}
					}else{
						next(null,'Please check the Room Id , Room Id should be a valid one .');
			} 
		});
			}else{
						next(null,'Associate entered is not a registered associate .');
			} 
		 });
		}
	},
	
	getAllbooking:function(next){
		var query = Booking.find().sort({roomId:1});
		query.exec(function(err,results){
			if(err){
				next(err);
			}
			else{
				next(results);
			}
		});
},
			
getBookingByRoomId :  function(roomId,next){
	var query = Booking.find({roomId:roomId});
	query.exec(function(err,result){
		if(err){
			next(err);
		}
		else if(result.length>0){
			next(null,result);
		}else{
			next(null,"No Booking Details for this Room Id");
		}
	});
},

getBookingByType: function(eventsByType,next){
	var query = Booking.find({  type: eventsByType } );
	query.exec(function(err,result){
		if(err){
			next(err);
		}
		else if(result.length>0){
			next(null,result);
		}else{
			next(null,"No Booking  Details for this Type");
		}
	});
},


	getAllbookedByName :  function(bookedByName,next){
		var query = Booking.find({bookedByName:bookedByName}).sort({roomId:1});
		query.exec(function(err,result){
			if(err){
				next(err);
			}
			else{
				next(null,result);
			}
		});
	},
	
	deleteByRoomId: function(roomId,next) {
		Booking.remove({roomId : roomId},function(err) {
			if (err) {
				next(err);
			} else{
				next(null,'Booking Deleted');
			}
		});
	},
	
	editByRoomId:function(bookingDetails,next){
		var fromDate = bookingDetails.from;
		fromDate =new Date(fromDate);
		var toDate =  bookingDetails.to;
		toDate = new Date(toDate);
		var queryRoom = Room.findOne({
			roomId : bookingDetails.roomId
		});
		queryRoom.exec(function(err,rooms){
			if(err){
				next(err);
			}else if(rooms) {
		var query = Booking.findOne({ 
			_id : bookingDetails._id,
			bookedBy:bookingDetails.bookedBy
		});
		var queryBetweenTime = Booking.findOne({
			roomId : bookingDetails.roomId,
			$or: [ 
			         {$and : [{ from: { $lte: fromDate } }, { from: { $gte: toDate } } ]},
			         {$and : [{ to: { $lte: fromDate } }, { to: { $gte: toDate } } ]},
			         {$and : [{ from: { $gte: fromDate } }, { to: { $lte: toDate } } ]},
		] } );	
		query.exec(function(err, booking) {
			if(err) {
				next(err);
			}
			else if (booking) {
				if(fromDate >= new Date() && toDate >= new Date()){
				queryBetweenTime.exec(function(err,timeBtw){
					if(err){
						next(err);
					}else if(timeBtw){
						next(null,'Your new time slot will fall in a already booked slot. Please selet another.');
					}else{
				    for ( var field in Booking.schema.paths) {
					    if (field !== '__v') {
						if (bookingDetails[field] !== undefined) {
							booking[field] = bookingDetails[field];
						}
					}
				}
				booking.save(function(err) {
					if (err) {
						next(err);
					} else {
						next(null,'Booking details has been Updated.');
					}
				});
			     }
			});
			}else{
				next(null,'Booking cannot be edited to older dates.');
			}	
			}else{
				next(null,'Booking Details Not Found with specified Id:'+bookingDetails._Id+" : Or Booking Details can be edited By the Booked Associate Only");
			}
		});
		}else{
				next(null,'Please check the Room Id , Room Id should be a valid one .');
		} 
		});
	},
	
	getBookingByDate: function(bookingDate,next){
		var formattedDate = new Date(bookingDate);
		var query = Booking.find({bookingDate:formattedDate});
		query.exec(function(err,result){
			if(err){
				next(err);
			}
			else if(result.length>0){
				next(null,result);
			}else{
				next(null,"No Booking Details for this Date");
			}
		});
	}
}

module.exports = bookingService;

function getNextId(next){
	var nextId = 1;
	var query = Booking.find({}, {
		_id : true
	}).sort({
		_id : -1
	}).limit(1);
	query.exec(function(err, oldBooking) {
		if(err){
			next(err);
		}
		else if (oldBooking.length > 0) {
			nextId = oldBooking[0]._id + 1;
			next(null,nextId);
		}
		else{
			next(null,nextId);
		}
	});
}