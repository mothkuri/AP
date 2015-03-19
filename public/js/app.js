angular.module('sampleApp', [ 'ngRoute', 'appRoutes', 'LoginCtrl', 'LoginService', 'RegistrationCtrl','RoomMgmtCtrl',
		'RegistrationService', 'MainCtrl', 'AssociateListingCtrl','RoomBookCtrl','AssociateListingService','AdminCtrl','AdminService','CommonService','ProfileCtrl','AssetCtrl','AssetService','ProfileService']);


angular.module('loginApp', [ 'ngRoute', 'appRoutes', 'LoginCtrl', 'LoginService', 'RegistrationCtrl',
                      		'RegistrationService']);