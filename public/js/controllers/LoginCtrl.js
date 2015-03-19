angular.module('LoginCtrl', []).controller(
		'LoginController',
		function($scope, $http ,User, LoginService, $location) {
			$scope.login = function(){
				console.log('in login ctrl')
				var isFormValid = validateLogin();
				console.log('$scope.user')
				if(isFormValid){
					User.setUser($scope.user);
					LoginService.postData(function(result){
						if(result=="Unauthorized"){
							$('.msg').append('<li>Invalid Login. Please Try Again.</li>');
							$("#myModal").modal('show');
						}
						else if(result.data.status == 'inactive'){
							$('.msg').append('<li>Inactive user. Please Contact Admin.</li>');
							$("#myModal").modal('show');
						}
						else{
							User.setUser(result.data);
							console.log(result.data.firstName);
							window.location.href="/home";
						}
						
					});
				}
				
			}
			
		});