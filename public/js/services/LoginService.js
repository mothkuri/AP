var loginService = angular.module('LoginService', []);

loginService.factory('User', function() {
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
});


loginService.service('LoginService', function($http,User) {
	//delete $http.defaults.headers.common['X-Requested-With'];
	this.postData = function(callbackFunc) {
		console.log(User.getUser());
		var res = $http.post('/login',
				User.getUser());
		res.success(function(data, status, headers, config) {
			User.setUser(data.data);
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	});