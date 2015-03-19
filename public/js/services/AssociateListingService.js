angular.module('AssociateListingService', [])

	.factory('Associates', function($http) {
		return {
            get : function() {
                return $http.get('/app/associate?date='+new Date().getTime());
            },
            
            getById: function(id){
            	return $http.get('/app/associate/'+id);
            },
            save: function(associateDetails){
            	return $http.put('/app/associate/',associateDetails);
            },
            delete : function(id) {
                return $http.delete('/app/associate/' + id);
            }
        }

});