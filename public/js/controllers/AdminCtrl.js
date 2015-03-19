angular.module('AdminCtrl', []).controller('AdminController', function($scope,$route,$http,$location,AdminService,CommonService,User) {
	
	CommonService.getSession(function(result){
		if(result==null){
			window.location.href = "/login";
		}
		else if(!result.isAdmin){
			window.location.href = "/login";
		}
		else{
			$scope.user = result;
		}
	});
	
	
	$scope.activateUserIds=[];
	
	
	$('.loader-fade').show();
	AdminService.getAllInactive(function(result){
		$('.loader-fade').hide();
		if(result.isProfileComplete==false){
			$location.path('/completeProfile');
		}
		else{
			$scope.inactiveUsers = result;
		}
		
	});
	
	$scope.submitActivateUsers = function(){
		angular.forEach($scope.inactiveUsers, function(value, key) {
			    if(value.status==true){
			    	$scope.activateUserIds.push(value.username);
			    }
			});
		User.setUser($scope.activateUserIds);
		AdminService.activateUsers(function(result){
			console.log(result.data.data);
			$route.reload();
		});
	}

	
	
	
});