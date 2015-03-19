angular.module('GeekCtrl', []).controller(
		'GeekController',
		function($scope, $http) {
			$scope.tagline = 'The square root of life is pi!';
			$scope.login = function() {
				var dataObj = {
					username : $scope.username,
					password : $scope.password
				};
				var res = $http.post('/login',
						dataObj);
				res.success(function(data, status, headers, config) {/*
                   // console.log(data.firstName);
                    Geek.setUser(data);
                    var userData = Geek.getUser();
                    //console.log(userData.firstName);
                    $location.path( "/" );
				*/});
				res.error(function(data, status, headers, config) {
				});
			}
		});