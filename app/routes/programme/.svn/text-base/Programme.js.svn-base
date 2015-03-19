var express = require('express');
var router = express.Router();
var programmeService = require('../../services/ProgrammeService');

// create new programme
router.post('/', function(req, res) {
	var programmeDetails = req.body;
	
		programmeService.save(programmeDetails,function(err){
			if(err){
				res.send(err);
			}
			else{
				res.send(200);
			}
		});
		
});

// get all programmes sorted by their ID
router.get('/', function(req, res) {

	programmeService.getAll(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});

});

// get programme by ID
router.get('/:id', function(req, res) {
	programmeService.getById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

// update programme
router.put('/', function(req, res) {
	var programmeDetails = req.body;
	programmeService.edit(programmeDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});


});

// deletes programme by id
router.delete('/:id', function(req, res) {
	
	programmeService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
