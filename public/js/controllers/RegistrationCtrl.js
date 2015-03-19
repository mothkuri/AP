angular.module('RegistrationCtrl', []).controller('RegistrationController', function($scope,$http,User,RegistrationService) {
	console.log('in registration ctrl');
	
	
	
	$scope.register = function(){
		var isFormValid = validateRegistration();
		User.setUser($scope.user);
		if(isFormValid){
			RegistrationService.postData(function(result){
				if(result.status == "error" && result.data.code==11000){
					$("#employee_id").addClass('error');
					$('.msg').append('<li>Employee ID already Exists.</li>')
					$("#myModal").modal('show');
				}
				else{
					if(result.status =='success'){
						$('.modal-title').html('Success');
						$('.msg').append('<li>Registration Successful! Please wait for the Admin to activate your account.</li>')
						$('.close').hide();
						$('#loginButton').show();
						$("#myModal").modal({
							backdrop: 'static',
				            keyboard: false
				        });
						}
				}
			});
		}
		
		//console.log($scope.user);
	}
});