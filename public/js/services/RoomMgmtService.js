angular.module('RoomMgmtService', [])

	.factory('Room', function($http) {
		return {
            get : function() {
                return $http.get('/app/room');
            }
        }

});