var RoomMgmtCtrl=angular.module('RoomMgmtCtrl', []);


RoomMgmtCtrl.controller('RoomManagementController', ['$scope','$http','Room','$location',function($scope,$http,Room,$location) {
	console.log("Inside Room Controller");
	$scope.formData = {};
	
	 // when landing on the page, get all associates and show them
	Room.get()
    .success(function(data) {
        $scope.room = data.data;
    })
	.error(function(){
		window.location.href = "/login";
	});
	
	
}]);