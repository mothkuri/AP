angular.module('ProfileCtrl', []).controller('ProfileController', function($scope,$route,$rootScope,User,ProfileService,Profile,$location) {
	
	$scope.user = $rootScope.user;
	if($rootScope.user.isProfileComplete){
		$location.path('/associateListing/'+$rootScope.user.userName);
	}
	$scope.today = new Date();
	$scope.saveAssociate = function(){
		$scope.user._id = $scope.user.userName;
		Profile.setProfile($scope.user);
		ProfileService.addAssociate(function(result){
			if(result=='OK'){
				$location.path('/associateListing/'+$scope.user._id);
			}
			else{
				$location.path('/login');
			}
		});
	}
});