var profileModule = angular.module('ProfileService', []);

profileModule.factory('Profile', [function() {
	   var profile ='';
	  var setProfile = function(newObj) {
		  profile = newObj;
	  }
	  var getProfile = function(){
		  return profile;
	  }
	  return {
		    setProfile: setProfile,
		    getProfile: getProfile
		  };
}]);


profileModule.service('ProfileService', function($http,Profile) {
	
	this.addAssociate = function(callbackFunc) {
		var res = $http.post('/app/associate',Profile.getProfile());
		res.success(function(data, status, headers, config) {
			callbackFunc(data);
		});
		res.error(function(data, status, headers, config) {
			callbackFunc(data);
		});
	}
	
	});