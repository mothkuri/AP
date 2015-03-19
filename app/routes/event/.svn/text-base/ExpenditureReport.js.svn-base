var express = require('express');
var router = express.Router();
var expenditureReportService = require('../../services/ExpenditureReportService');
// create new associate
router.post('/', function(req, res) {
		var expenditureDetails = req.body;
		var loggedInUserId = req.session.user.username;
		expenditureReportService.save(expenditureDetails,loggedInUserId,function(err){
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

	expenditureReportService.getAll(function(err,result){
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
	expenditureReportService.getById(req.params.id,function(err,result){
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
	var expenditureDetails = req.body;
	var loggedInUserId = req.session.user.username;
	expenditureReportService.edit(expenditureDetails,loggedInUserId,function(err,result){
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
	
	expenditureReportService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
