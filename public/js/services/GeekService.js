angular.module('GeekService', []).factory('Geek', ['$http', function($http) {
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