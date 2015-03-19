var assetModule = angular.module('AssetService', []);

assetModule.factory('Asset', [function() {
	   var asset ='';
	  var setAsset = function(newObj) {
	      asset = newObj;
	  }
	  var getAsset = function(){
		  return asset;
	  }
	  return {
		    setAsset: setAsset,
		    getAsset: getAsset
		  };
}]);


assetModule.service('AssetService', function($http,Asset) {
	
	this.addAsset = function(callbackFunc) {
		var res = $http.post('/app/asset',Asset.getAsset());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	
	this.updateAsset = function(callbackFunc) {
		var res = $http.put('/app/asset',Asset.getAsset());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	this.getAssets = function(callbackFunc) {
		var res = $http.get('/app/asset?date='+new Date().getTime());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	this.getAssetById = function(id,callbackFunc) {
		var res = $http.get('/app/asset/'+id +'?date='+new Date().getTime());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	
	this.lockAsset = function(id,callbackFunc) {
		var res = $http.put('/app/asset/lock/'+id);
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	this.approveAsset = function(id,callbackFunc) {
		var res = $http.put('/app/asset/approve/'+id);
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	this.denyAsset = function(id,callbackFunc) {
		var res = $http.put('/app/asset/deny/'+id);
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	this.unlockAsset = function(id,callbackFunc) {
		var res = $http.put('/app/asset/unlock/'+id);
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	});