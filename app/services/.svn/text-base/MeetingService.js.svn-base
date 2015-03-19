var mongoose = require('mongoose');
var async = require('async');

//importing models

var Meetings = require('../models/Meetings');
var Room = require('../models/Room');
var Booking = require('../models/Booking');
var Associate = require('../models/AssociateDetails');
var Login = require('../models/login');
var User = require('../models/User');
var Login = require('../models/login');
var Client = require('../models/Client').ClientModel;
var Token = require('../models/Token').TokenModel;

var RRule = require('rrule').RRule;
var moment = require('moment');
var conflict=false;
moment().format();

var meetingService = {
		newMeeting : function(meetingDetails,loggedInUserId, next) {
			
			if(!Object.keys(meetingDetails).length){
				next(null, "Booking not allowed with null values");
			}else {
			var fromDate = meetingDetails.meetingStart;
			fromDate =new Date(fromDate);
			var toDate =  meetingDetails.meetingEnd;
			toDate = new Date(toDate);
			
			if( meetingDetails.duration == null){
				
				var startTimeKey=fromDate.getHours()*4*15+fromDate.getMinutes();
				var toTimeKey=toDate.getHours()*4*15+toDate.getMinutes()-15;
				
				var timeSlotKeys=[];
				for(var timeSlotKey=startTimeKey,i=0;timeSlotKey<=toTimeKey;timeSlotKey=timeSlotKey+15){
					timeSlotKeys[i++]=timeSlotKey;
				}
				
				var dateWithToTime = new Date(meetingDetails.meetingStart);
				dateWithToTime.setHours(toDate.getHours());
				dateWithToTime.setMinutes(toDate.getMinutes());
				dateWithToTime.setSeconds(toDate.getSeconds());
				
				var	ruleString =	RRule.fromText("Every weekday");
							
					var rule = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(meetingDetails.meetingStart),
						until: new Date(meetingDetails.meetingEnd)
						});
					
					var dateArray = rule.all();
					
					
					var ruleTo = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(dateWithToTime),
						until: new Date(meetingDetails.meetingEnd)
						});
					
					var dateArrayTo = ruleTo.all();
			}else{
				var  duration = meetingDetails.duration;
				 var hoursMinutes = duration.split(/[.:]/);
				  var hours = parseInt(hoursMinutes[0], 10);
				  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
				  
				  
				var hoursTime = fromDate.getHours();
				
				var newHour = hoursTime + hours;
				
				var minTime = fromDate.getMinutes();
				
				var newMin = minTime + minutes;
				if(newMin == 60){
					newMin = 00;
					newHour = newHour+1;
				}
				
				var newSec = fromDate.getSeconds();
				var newMeetingend = new Date(meetingDetails.meetingStart);
				newMeetingend.setHours(newHour);
				newMeetingend.setMinutes(newMin);
				newMeetingend.setSeconds(newSec);
				
				var startTimeKey=fromDate.getHours()*4*15+fromDate.getMinutes();
				var toTimeKey=newMeetingend.getHours()*4*15+newMeetingend.getMinutes()-15;
				
				
				var timeSlotKeys=[];
				for(var timeSlotKey=startTimeKey,i=0;timeSlotKey<=toTimeKey;timeSlotKey=timeSlotKey+15){
					timeSlotKeys[i++]=timeSlotKey;
				}
				
				var dateWithToTime = new Date(meetingDetails.meetingStart);
				dateWithToTime.setHours(newMeetingend.getHours());
				dateWithToTime.setMinutes(newMeetingend.getMinutes());
				dateWithToTime.setSeconds(newMeetingend.getSeconds());
				
				var	ruleString =	RRule.fromText("Every weekday");
			
				var frequencyOfMeeting = meetingDetails.frequency;
				
				
					var rule = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(meetingDetails.meetingStart),
						until: newMeetingend
						});
					
					var dateArray = rule.all();
					
					
					var ruleTo = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(dateWithToTime),
						until: newMeetingend
						});
					
					var dateArrayTo = ruleTo.all();
			}
		
			
				

	
			var recurrenceEXP = rule.toString();
		
			var date=new Date();
			var dayOfWeek=date.getDay();
			
			var queryRoom = Room.findOne({
				_id : meetingDetails.room
			});
			
			var attendeesList  = JSON.parse(meetingDetails.attendees);
			var queryAttendees = Associate.find({
				_id:{$in: attendeesList}
			});
			
			
			if(meetingDetails.userCreated == loggedInUserId) {
					queryRoom.exec(function(err,rooms){
							if(err){
								next(err);
							}else if(rooms) {
								if ((dayOfWeek == 6 || dayOfWeek == 0) && fromDate == date && toDate == date) {
									next(null, "Booking not allowed for Weekends");
								} else {
									var queryBetweenTime = Booking.find({
										room : meetingDetails.room,
										startTime: fromDate
									});
									if (fromDate >= new Date() && toDate >= new Date()) {
										queryBetweenTime.exec(function(err, timeBtw) {
												if (err) {
													next(err);
												} else if (timeBtw != null && timeBtw.length != 0) {
													 timeBtw.forEach(function(doc){
														       var dbSlot = [];
														       dbSlot = doc.slotKeys;
														       for(var a = 0;a<dbSlot.length;a++){
														    	   for(var b = 0;b<timeSlotKeys.length;b++){
														    		   if(timeSlotKeys[b] == dbSlot[a]){
														    			 conflict=true;	
														    			 break;
														    		   }
														    	   }
														       }
														});
												}
											if(conflict==false){
													queryAttendees.exec(function (err,attendees){
														if (err) {
															next(err);
														} else if (attendees.length != attendeesList.length) {
															next(null,'The attendees are not regristered associates');
														} else{	
													meetingDetails.recurrenceExpression = recurrenceEXP;
													meetingDetails.attendees=attendeesList;
													var meeting = new Meetings(meetingDetails);
													getNextId(function(err,nextId){
														meeting._id = nextId;
														var bookingObj = [];
														var newBooking;
														for(var k = 0;k<dateArray.length;k++){
															newBooking = new Booking();
															newBooking.meetingId = meeting._id;
															newBooking.room = meeting.room;
															newBooking.date = new Date();
															newBooking.startTime = dateArray[k];
															newBooking.endTime = dateArrayTo[k];
															newBooking.ptOfContact =meeting.userCreated;
															newBooking.mtgShortDescr = meeting.shortDesc;
															newBooking.slotKeys=timeSlotKeys;
															bookingObj.push(newBooking);
															
														}
														Booking.create(bookingObj,function(err){
															if(err)
																next(err);
															else{
																meeting.save(function(err){
																	if (err) {
																		next(err);
																	} else {
																		next(null,'New Meeting  is created with details.');
																	}
																});
															}
														});
														
														});													
												}
											});
											}
											else{
												next(null,'Your time slot will fall in a already booked slot. Please select another.');
											}
											});
								} else {
									next(null,'Booking cannot be done for older dates.');
								}
							}
						}else{
							next(null,'Please check the Room Id , Room Id should be a valid one .');
				} 
			});
				}else{
							next(null,'Logged in user is only allowed to create a meeting .');
				} 

			}
		},	
		
		getMeetingByRoom :  function(meetingByRoom,next){
			var query = Meetings.find({room:meetingByRoom});
			query.exec(function(err,result){
				if(err){
					next(err);
				}
				else if(result.length>0){
					next(null,result);
				}else{
					next(null,"No Meeting Details for this Room Id");
				}
			});
		},
		
		

		getAllMeetingsByName :  function(meetingCreated,next){
			var query = Meetings.find({userCreated:meetingCreated}).sort({roomId:1});
			query.exec(function(err,result){
				if(err){
					next(err);
				}
				else if(result.length>0){
					next(null,result);
				}else{
					next(null,"No Meeting created by this user");
				}
			});
		},
		
		
		getMeetingByDate: function(meetingDate,next){
			var formattedDate = new Date(meetingDate);
			var query = Meetings.find({meetingStart:formattedDate});
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
		},
		
		getMeetingByType:function(meetingByType,next){
			var query = Meetings.find({ type: meetingByType } );
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
		
		deleteById: function(Id,next) {
			Meetings.remove({_id : Id},function(err) {
				if (err) {
					next(err);
				} else{
					Booking.remove({meetingId : Id},function(err) {
						if(err){
							
						}else{
							next(null,'Meeting and corresponding Booking also Deleted');
						}
					});
				}
			});
		},
		
		
		editByMeetingId: function(meetingDetails,loggedInUserId,next){
			var fromDate = meetingDetails.meetingStart;
			fromDate =new Date(fromDate);
			var toDate =  meetingDetails.meetingEnd;
			toDate = new Date(toDate);
			
			if( meetingDetails.duration == null){
				
				var startTimeKey=fromDate.getHours()*4*15+fromDate.getMinutes();
				var toTimeKey=toDate.getHours()*4*15+toDate.getMinutes()-15;
				
				
				var timeSlotKeys=[];
				for(var timeSlotKey=startTimeKey,i=0;timeSlotKey<=toTimeKey;timeSlotKey=timeSlotKey+15){
					timeSlotKeys[i++]=timeSlotKey;
				}
				
				var dateWithToTime = new Date(meetingDetails.meetingStart);
				dateWithToTime.setHours(toDate.getHours());
				dateWithToTime.setMinutes(toDate.getMinutes());
				dateWithToTime.setSeconds(toDate.getSeconds());
				
				var	ruleString =	RRule.fromText("Every weekday");
							
					var rule = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(meetingDetails.meetingStart),
						until: new Date(meetingDetails.meetingEnd)
						});
					
					var dateArray = rule.all();
					
					
					var ruleTo = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(dateWithToTime),
						until: new Date(meetingDetails.meetingEnd)
						});
					
					var dateArrayTo = ruleTo.all();
			}else{
				var  duration = meetingDetails.duration;
				 var hoursMinutes = duration.split(/[.:]/);
				  var hours = parseInt(hoursMinutes[0], 10);
				  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
				  
				  
				var hoursTime = fromDate.getHours();
				
				var newHour = hoursTime + hours;
				
				var minTime = fromDate.getMinutes();
				
				var newMin = minTime + minutes;
				if(newMin == 60){
					newMin = 00;
					newHour = newHour+1;
				}
				
				var newSec = fromDate.getSeconds();
				var newMeetingend = new Date(meetingDetails.meetingStart);
				newMeetingend.setHours(newHour);
				newMeetingend.setMinutes(newMin);
				newMeetingend.setSeconds(newSec);
				
				var startTimeKey=fromDate.getHours()*4*15+fromDate.getMinutes();
				var toTimeKey=newMeetingend.getHours()*4*15+newMeetingend.getMinutes()-15;
				
				

				var timeSlotKeys=[];
				for(var timeSlotKey=startTimeKey,i=0;timeSlotKey<=toTimeKey;timeSlotKey=timeSlotKey+15){
					timeSlotKeys[i++]=timeSlotKey;
				}
				
				var dateWithToTime = new Date(meetingDetails.meetingStart);
				dateWithToTime.setHours(newMeetingend.getHours());
				dateWithToTime.setMinutes(newMeetingend.getMinutes());
				dateWithToTime.setSeconds(newMeetingend.getSeconds());
				
				var	ruleString =	RRule.fromText("Every weekday");
			
				var frequencyOfMeeting = meetingDetails.frequency;
				
				
					var rule = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(meetingDetails.meetingStart),
						until: newMeetingend
						});
					
					var dateArray = rule.all();
					
					
					var ruleTo = new RRule({
						freq: RRule.DAILY,
						interval: 1,
						byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
						dtstart: new Date(dateWithToTime),
						until: newMeetingend
						});
					
					var dateArrayTo = ruleTo.all();
			}
		
			var recurrenceEXP = rule.toString();
		
			var date=new Date();
			var dayOfWeek=date.getDay();
			
			var queryCreatedUser = Meetings.find({
				_id:meetingDetails._id,
				userCreated : loggedInUserId
			});
			
			var queryRoom = Room.findOne({
				_id : meetingDetails.room
			});
			
			var queryMeeting = Meetings.findOne({
				_id : meetingDetails._id
			});
			
			var attendeesList  = JSON.parse(meetingDetails.attendees);
			var queryAttendees = Associate.find({
				_id:{$in: attendeesList}
			});
			
			
			if(!Object.keys(meetingDetails).length){
				next(null, "Booking not allowed with null values");
			}else {
				queryMeeting.exec(function(err,meeting){
					if(err){
						next(err);
					}else if(!meeting){
						next(null, "No meeting with this meeting id");
					}else{
		
						var queryBooking = Booking.find({
							meetingId : meetingDetails._id
						});
						queryBooking.exec(function(err,booking){
							if(err){
								next(err)
							}else if(booking){
								queryCreatedUser.exec(function(err,user){
									if(err){
										next(err);
									}
									else if(user.length>0){
										queryRoom.exec(function(err,room){
											if(err){
												next(err);
											}else if(room.length == 0){
												next(null,"Meetings can be edited with a valid room id");
											}else{
												queryAttendees.exec(function(err,attendees){
													if(err){
														next(err);
													}else if(attendees.length != attendeesList.length){
														next(null,"Meetings can be edited with registered attendees");
													}else{
														if ((dayOfWeek == 6 || dayOfWeek == 0) && fromDate == date && toDate == date) {
															next(null, "Booking not allowed for Weekends");
														} else {
															if (fromDate >= new Date() && toDate >= new Date()) {
																if(((fromDate.toDateString()) != (meeting.meetingStart.toDateString())) || ((toDate.toDateString() ) != (meeting.meetingEnd.toDateString())) || 
																		((newMeetingend.toDateString()) != (meeting.meetingEnd.toDateString()))){
																		 booking.forEach(function(doc){
																			       var dbSlot = [];
																			       dbSlot = doc.slotKeys;
																			       for(var a = 0;a<dbSlot.length;a++){
																			    	   for(var b = 0;b<timeSlotKeys.length;b++){
																			    		   if(timeSlotKeys[b] == dbSlot[a]){
																			    			 conflict=true;	
																			    		   }
																			    	   }
																			       }
																			});
																	}
																if(conflict==false){
																	queryAttendees.exec(function (err,attendees){
																		if (err) {
																			next(err);
																		} else if (attendees.length != attendeesList.length) {
																			next(null,'The attendees are not regristered associates');
																		} else{
																			Booking.remove({meetingId : meetingDetails._id},function(err) {
																				if(err){
																					next(err);
																				}else{
																				}
																			});
																			var bookingObj = [];
																			var newBooking;
																			for(var k = 0;k<dateArray.length;k++){
																				newBooking = new Booking();
																				newBooking.meetingId = meeting._id;
																				newBooking.room = meeting.room;
																				newBooking.date = new Date();
																				newBooking.startTime = dateArray[k];
																				newBooking.endTime = dateArrayTo[k];
																				newBooking.ptOfContact =meeting.userCreated;
																				newBooking.mtgShortDescr = meeting.shortDesc;
																				newBooking.slotKeys=timeSlotKeys;
																				bookingObj.push(newBooking);
																				
																			}	
																		meetingDetails.recurrenceExpression = recurrenceEXP;
																		meetingDetails.attendees=attendeesList;
																		var changeVal;
																		var noChange;
																		if(meeting.shortDesc != meetingDetails.shortDesc){
																			changeVal = 'shortDesc';
																		}else if(meeting.description != meetingDetails.description){
																			changeVal = 'description';
																		}else if(meeting.priority != meetingDetails.priority){
																			changeVal = 'priority';
																		}else if(meeting.type != meetingDetails.type){
																			changeVal = 'type';
																		}else if(meeting.room != meetingDetails.room){
																			changeVal = 'room';
																		}else if(meeting.isRecurring != ((meetingDetails.isRecurring=='yes')?true:false)){
																			changeVal = 'isRecurring';
																		}else if((meeting.meetingStart.toDateString() != fromDate.toDateString())||
																				(meeting.meetingEnd.toDateString() != toDate.toDateString()) || (meeting.meetingEnd.toDateString() != newMeetingend.toDateString())){
																			changeVal = 'meetingdate';
																		}else if(attendeesList != meetingDetails.attendees){
																			changeVal = 'attendees';
																		}else{
																			noChange = 'No Change'
																		}
																	    for ( var field in Meetings.schema.paths) {
																		    if (field !== '__v') {
																			if (meetingDetails[field] !== undefined) {
																				meeting[field] = meetingDetails[field];
																			}
																		}
																	}
																		Booking.create(bookingObj,function(err){
																			if(err)
																				next(err);
																			else{
																				meeting.save(function(err){
																					if (err) {
																						next(err);
																					} else {
																						if(changeVal){
																							next(null,'Meeting has been edited succesfully .');
																						}else if(noChange){
																							next(null,'No values has changed .');
																						}
																					}
																				});
																			}
																		});
																}
															});
															}else{
																next(null,'Your time slot will fall in a already booked slot. Please select another.');
															}
														
														}else {
															next(null,'Booking cannot be done for older dates.');
														}	
													}
													}
											});
											}
										});
										
									}else{
										next(null,"Meetings can be edited by the created user only");
									}
							
								});
							}
						});
					}
				});
			}
		}
}



module.exports = meetingService;


function getNextId(next){
			var nextId = 1;
			var query = Meetings.find({}, {
				_id : true
			}).sort({
				_id : -1
			}).limit(1);
			query.exec(function(err, oldMeeting) {
				if(err){
					next(err);
				}
				else if (oldMeeting.length > 0) {
					nextId = oldMeeting[0]._id + 1;
					next(null,nextId);
				}
				else{
					next(null,nextId);
				}
			});
		}

function getNextBookingId(next){
	var nextBookingId = 1;
	var queryBookingId = Booking.find({}, {
		_id : true
	}).sort({
		_id : -1
	}).limit(1);
	queryBookingId.exec(function(err, oldBooking) {
		if(err){
			next(err);
		}
		else if (oldBooking.length > 0) {
			nextBookingId = oldBooking[0]._id + 1;
			next(null,nextBookingId);
		}
		else{
			next(null,nextBookingId);
		}
	});
}

