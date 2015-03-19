angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		
		.when('/associateListing', {
			templateUrl: '/views/associateListing.html',
			controller: 'AssociateListingController'
		})
		
		.when('/associateListing/:associateId', {
			templateUrl: '/views/associate_details.html',
			controller: 'AssociateDetailsController'
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
	
		.when('/approveUsers', {
			templateUrl: 'views/Approve_Users.html',
			controller: 'AdminController'
		})

		.when('/bookroom', {
			templateUrl: 'views/bookroom.html',
			controller: 'RoomBookController'
		})

		.when('/rooms', {
			templateUrl: 'views/rooms.html',
			controller: 'RoomManagementController'
		})
		
		.when('/completeProfile', {
			templateUrl: 'views/Complete_Profile.html',
			controller: 'ProfileController'
		})
		
		.when('/addAsset', {
			templateUrl: 'views/add_asset.html',
			controller: 'AssetController'
		})
		
		.when('/assets', {
			templateUrl: 'views/asset_listing.html',
			controller: 'AssetListingController'
		})
		
		.when('/assets/:id', {
			templateUrl: 'views/asset_details.html',
			controller: 'AssetDetailsController'
		})

		
		.when('/projects', {
			templateUrl: 'views/under_construction.html',
			controller: 'MainController'	
		})
		
		.when('/404', {
			templateUrl: 'views/404.html',
			controller: 'MainController'
		})
		
		.otherwise({
        redirectTo: '/404'
      });

	$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		}); 

}]);