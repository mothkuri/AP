angular.module('MainCtrl', []).controller('MainController',
		function($scope, $http,$rootScope, $location,CommonService,User) {
			
			CommonService.getSession(function(result) {
				if(result==null){
					window.location.href = "/login";
				} else {
					$rootScope.user = result;
				}
			});


			$scope.logout = function() {
				console.log('logout')
				var res = $http.get('/logout');
				res.success(function(data, status, headers, config) {
					window.location.href = "/";
				});
				res.error(function(data, status, headers, config) {
				});
			}

		});
