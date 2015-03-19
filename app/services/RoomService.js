var Room = require('../models/Room');

var roomServices = {
		save: function(roomDetails,next){
			var room = new Room(roomDetails);
			getNextId(function(err,nextId){
				room._id = nextId;
				room.save(function(err) {
					if (err) {
						next(err);
					} else {
						next(null,'Saved new room with id:'+ nextId);
					}
				});
			}); 
		},
	//Get All Roooms	
		getAll: function(next){
				var query = Room.find().sort({_id:1});
				query.exec(function(err,rooms){
					if(err){
						next(err);
					}
					else{
						next(rooms);
					}
				});
		},
	
//Get All Rooms By Building
		
		getAllByBuilding: function(roomByBuilding,next){
			var query = Room.find({building:roomByBuilding}).sort({_id:1});
			query.exec(function(err,rooms){
				if(err){
					next(err);
				}
				else if(rooms.length>0){
					next(rooms);
				}else{
					next('No Rooms are added to this building');
				}
			});
		},
	
//Get All Rooms By Locations		
		getAllByLocation:function(roomByLocation,next){
			var query = Room.find({location:roomByLocation}).sort({_id:1});
			query.exec(function(err,rooms){
				if(err){
					next(err);
				}
				else if(rooms.length>0){
					next(rooms);
				}else{
					next('No Rooms are added to this location');
				}
			});
		},		
		
//Get All Rooms by Type
		getAllByType: function(type,next){
			var query = Room.find({type:type}).sort({_id:1});
			query.exec(function(err,rooms){
				if(err){
					next(err);
				}
				else{
					next(rooms);
				}
			});
		},

//Get Rooms by Id		
		getById: function(id,next){
			var query = Room.find({_id:id}).sort({_id:1});
			query.exec(function(err,rooms){
				if(err){
					next(err);
				}
				else{
					next(rooms);
				}
			});
		},
		
//Edit Rooms By Id
		
		editById: function(roomDetails,next){
			console.log(roomDetails);
			var query = Room.findOne({
				_id : roomDetails._id
			});
			query.exec(function(err, room) {
				if(err) {
					next(err);
				}
				else if (room) {
					for ( var field in Room.schema.paths) {
						if ((field !== '_id') && (field !== '__v')) {
							if (roomDetails[field] !== undefined) {
								room[field] = roomDetails[field];
							}
						}
					}
					room.save(function(err) {
						if (err) {
							next(err);
						} else {
							next(null,'Room Updated:'+roomDetails._id);
						}
					});

				}
				else{
					next(null,'roomDetails Not Found with Id:'+roomDetails._id);
				}
			});
		},
	//Delete Room By Id	
		deleteById : function(id,next) {
			Room.remove({_id : id},function(err) {
				if (err) {
					next(err);
				} else{
					next(null,'Room Deleted');
				}
			});
		}
}
		

module.exports = roomServices;

function getNextId(next){
	var nextId = 1;
	var query = Room.find({}, {
		_id : true
	}).sort({
		_id : -1
	}).limit(1);
	query.exec(function(err, oldRoom) {
		if(err){
			next(err);
		}
		else if (oldRoom.length > 0) {
			nextId = oldRoom[0]._id + 1;
			next(null,nextId);
		}
		else{
			next(null,nextId);
		}
	});
}