var registrationService = angular.module('RegistrationService', []);

registrationService.factory('User', [function() {
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


registrationService.service('RegistrationService', function($http,User) {
	//delete $http.defaults.headers.common['X-Requested-With'];
	this.postData = function(callbackFunc) {
		console.log(User.getUser());
		var res = $http.post('/signUp',
				User.getUser());
		res.success(function(data, status, headers, config) {
			console.log(data);
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			console.log(data);
			callbackFunc(data);
		});
	}
	});