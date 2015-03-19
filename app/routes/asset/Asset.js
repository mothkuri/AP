var constants = require('../../services/commons/Constants');
var express = require('express');
var app=express();
var router = express.Router();
var assetService = require('../../services/AssetService');
var extend = require('util')._extend;
// create new asset
router.post('/', function(req, res) {
		var assetDetails = req.body;
		assetService.save(assetDetails,function(err){
			if(err){
				res.send(err);
			}
			else{
				res.send(200);
			}
		});
		
});

// get all assets sorted by their ID
router.get('/', function(req, res) {
	var response = extend({}, constants.RESPONSE);
	assetService.getAll(function(err,result){
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

// get asset by ID
router.get('/:id', function(req, res) {
	assetService.getById(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

// update asset
router.put('/', function(req, res) {
	var assetDetails = req.body;
	assetService.edit(assetDetails,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(200);
		}
	});


});

//lock asset
router.put('/lock/:id', function(req, res) {
	var assetDetails = req.body;
	assetService.lock(req.params.id,req.session.user.username,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(200);
		}
	});


});


router.put('/unlock/:id', function(req, res) {
	var assetDetails = req.body;
	assetService.unlock(req.params.id,req.session.user.username,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});


});


router.put('/approve/:id', function(req, res) {
	var assetDetails = req.body;
	assetService.approve(req.params.id,req.session.user.username,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(200);
		}
	});
});

router.put('/deny/:id', function(req, res) {
	var assetDetails = req.body;
	assetService.deny(req.params.id,req.session.user.username,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(200);
		}
	});
});

// deletes asset by id
router.delete('/:id', function(req, res) {
	
	assetService.delete(req.params.id,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});



module.exports = router;
