var commonService = angular.module('CommonService', []);

commonService.service('CommonService', function($http,User) {
	this.getSession = function(callbackFunc) {
		var res = $http.get('/session?date='+new Date().getTime());
		res.success(function(data, status, headers, config) {
			callbackFunc(data.data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(null);
			});
	}
	
	
	this.getUsers = function(callbackFunc) {
		var res = $http.get('/app/associate');
		res.success(function(data, status, headers, config) {
			callbackFunc(data.data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(null);
			});
	}
	});