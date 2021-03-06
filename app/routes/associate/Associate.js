var constants = require('../../services/commons/Constants');
var express = require('express');
var app=express();
var router = express.Router();
var associateService = require('../../services/AssociateService');
var extend = require('util')._extend;
// create new associate
router.post('/', function(req, res) {
		var associateDetails = req.body;
		associateService.save(associateDetails,function(err){
			if(err){
				res.send(err);
			}
			else{
				req.session.user.isProfileComplete=true;
				res.send(200);
			}
		});
		
});

// get all associates sorted by their ID
router.get('/', function(req, res) {
	var response = extend({}, constants.RESPONSE);
	associateService.getAll(function(err,result){
		if(err){
			response.status=constants.Error;
			response.data = err;
			res.send(response);
		}
		else{
			response.data=result;
			response.status=constants.SUCCESS;
			res.send(response);
		}
	});

});

// get associate by ID
router.get('/:id', function(req, res) {
	console.log('by id');
	associateService.getById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

//get associate by ID
router.get('/autoComplete/param', function(req, res) {
	console.log('in autocomplete'+ req.query.term)
	associateService.getAutoComplete(req.query.term,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

// update associate
router.put('/', function(req, res) {
	var associateDetails = req.body;
	associateService.edit(associateDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});


});

// deletes associate by id
router.delete('/:id', function(req, res) {
	
	associateService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
