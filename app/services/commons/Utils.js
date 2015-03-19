var mongoose = require('mongoose');

var utils={
		dropDatabase : function(next){
			mongoose.connection.db.dropDatabase(function (err) {
				  if(err){
					  next(err);
				  }
				  else{
					  next(null);
				  }
				});
		}
}
module.exports = utils;