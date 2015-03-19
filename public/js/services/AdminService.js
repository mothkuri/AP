var adminModule = angular.module('AdminService', []);

adminModule.factory('User', [function() {
	   var user ='';
	  var setUser = function(newObj) {
	      user = newObj;
	  }
	  var getUser = function(){
		  return user;
	  }
	  return {
		    setUser: setUser,
		    getUser: getUser
		  };
}]);


adminModule.service('AdminService', function($http,User) {
	
	this.getAllInactive = function(callbackFunc) {
		var res = $http.get('/app/admin?date='+new Date().getTime());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	
	this.activateUsers = function(callbackFunc) {
		var res = $http.post('/app/admin',
				{'ids':User.getUser()});
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	});