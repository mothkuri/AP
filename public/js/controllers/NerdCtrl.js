angular.module('NerdCtrl', []).controller('NerdController', function($scope,$http,$routeParams) {
	console.log($routeParams.param);
	$scope.tagline = 'Nothing beats a pocket protector!';
	console.log('in nerd ctrl');
	/*var res = $http.get('/api/data');
	res.success(function(data, status, headers, config) {
		alert(data);
	});
	res.error(function(data, status, headers, config) {
	});*/
});