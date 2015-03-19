angular.module('AssetCtrl', ['ngAnimate','angularFileUpload'])

.controller('AssetController', function($upload,$scope,$route,$http,$location,CommonService,AssetService,Asset) {
	$scope.asset={};
	$scope.addAsset = function(){
		var isFormValid = validateAsset($scope.files);
		if(isFormValid){
			var ownerId= $scope.asset.ownerId;
			$scope.asset.ownerId=ownerId.split('-')[1];
			Asset.setAsset($scope.asset);
			$('.loader-fade').show();
			AssetService.addAsset(function(result){
				$('.loader-fade').hide();
				if(typeof result.isProfileComplete!='undefined' && result.isProfileComplete==false){
					$location.path('/completeProfile');
				}
				else{
					$location.path('/assets');
				}
			
			});
		}
	}
	
	$scope.userAutoComplete = function(event){
		if (event.keyCode != 13) {
			$("#owner").autocomplete({
				source : "/app/associate/autoComplete/param",
				minLength : 3,
				datatype : "json",
				mtype : "POST",
				select : function(event, ui) {
					$scope.asset.ownerId = ui.item.value;
					if (ui.item.label == "No matches found.") {
					}
				},
				open : function() {
					$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
				},
				close : function() {
					$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				}
			});
		}

	}
	
	$scope.resetForm = function(){
		$('#assetForm')[0].reset();
	}
	
	//file upload
	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if(file.size>204800){
                	$('.modal-title').html('Error');
                	$('.msg').html('<li>Image Size is more than 200KB. Please upload a smaller image.</li>')
    				$('.close').hide();
    				$('#loginButton').show();
    				$("#myModal").modal();
                }
                else{
                	 $upload.upload({
                         url: 'upload',
                         fields: {
                         },
                         file: file
                     }).progress(function (evt) {
                    	 $('.loader-fade').show();
                         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                         console.log('progress: ' + progressPercentage + '% ' +
                                     evt.config.file.name);
                     }).success(function (data, status, headers, config) {
                    	 $('.loader-fade').hide();
                     	$scope.asset.imgName = data.fileName;
                         console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                     JSON.stringify(data));
                     });
                }
            }
        }
    };
	
})


.controller('AssetListingController', function($scope,$route,$http,$location,AssetService,CommonService,Asset,$rootScope) {
	$scope.user = $rootScope.user;	
	$('.loader-fade').show();
	AssetService.getAssets(function(result){
		$('.loader-fade').hide();
		if(typeof result.isProfileComplete!='undefined' && result.isProfileComplete==false){
			$location.path('/completeProfile');
		}
		else{
			$scope.assets = result.data;
		}
		
	});
	
	
})

.controller('AssetDetailsController', function($upload,$scope,$route,$routeParams,$http,$location,AssetService,CommonService,Asset,$rootScope) {
	$scope.user = $rootScope.user;	
	$('.loader-fade').show();
	AssetService.getAssetById($routeParams.id,function(result){
		$('.loader-fade').hide();
		if(typeof result.isProfileComplete!='undefined' && result.isProfileComplete==false){
			$location.path('/completeProfile');
		}
		else{
			$scope.asset = result;	
		}
		
	});
	
	
	$scope.updateAsset = function(){
		var isFormValid = validateAsset(false);
		if(isFormValid){
			var ownerId= $scope.asset.ownerId.toString();
			var splitted = ownerId.split('-');
			if(splitted.length>1){
				$scope.asset.ownerId=ownerId.split('-')[1];
			}
			Asset.setAsset($scope.asset);
			$('.loader-fade').show();
			AssetService.updateAsset(function(result){
				$('.loader-fade').hide();
				$('.modal-title').html('Success');
				$('.msg').html('<li>Successfully Updated.</li>')
				$('.close').hide();
				$('#loginButton').show();
				$('.independant').hide();
				$('.dependant').show();
				$("#myModal").modal();
			});
		}
	}
	
	$scope.request = function(){
		$('.loader-fade').show();
			AssetService.lockAsset($scope.asset._id,function(result){
				$('.loader-fade').hide();
				$scope.isLocked=true;
				$scope.requestStatus='Pending';
				$route.reload();
				/*$('.modal-title').html('Success');
				$('.msg').html('<li>Successfully Requested.</li>')
				$('.close').hide();
				$('#loginButton').show();
				$('.dependant').hide();
				$('.independant').show();
				$("#myModal").modal();*/
			});
	}
	
	
	$scope.approve = function(){
		$('.loader-fade').show();
		AssetService.approveAsset($scope.asset._id,function(result){
			$('.loader-fade').hide();
			$scope.requestStatus='Approved';
			$route.reload();
			/*$('.modal-title').html('Success');
			$('.msg').html('<li>Successfully Approved.</li>')
			$('.close').hide();
			$('#loginButton').show();
			$('.dependant').hide();
			$('.independant').show();
			$("#myModal").modal();*/
		});
	}
	
	$scope.deny = function(){
		$('.loader-fade').show();
		AssetService.denyAsset($scope.asset._id,function(result){
			$('.loader-fade').hide();
			$scope.asset.requestStatus='';
			$route.reload();
			/*$('.modal-title').html('Success');
			$('.msg').html('<li>Successfully Approved.</li>')
			$('.close').hide();
			$('#loginButton').show();
			$('.dependant').hide();
			$('.independant').show();
			$("#myModal").modal();*/
		});
	}
	
	$scope.returned = function(){
		$('.loader-fade').show();
		AssetService.unlockAsset($scope.asset._id,function(result){
			$('.loader-fade').hide();
			$scope.isLocked=false;
			$scope.requestStatus='';
			$route.reload();
		/*	$('.modal-title').html('Success');
			$('.msg').html('<li>Successfully Updated.</li>')
			$('.close').hide();
			$('#loginButton').show();
			$('.dependant').hide();
			$('.independant').show();
			$("#myModal").modal();*/
		});
	}
	
	$scope.userAutoComplete = function(event){
		if (event.keyCode != 13) {
			$("#owner").autocomplete({
				source : "/app/associate/autoComplete/param",
				minLength : 3,
				datatype : "json",
				mtype : "POST",
				select : function(event, ui) {
					$scope.asset.ownerId = ui.item.value;
					if (ui.item.label == "No matches found.") {
					}
				},
				open : function() {
					$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
				},
				close : function() {
					$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				}
			});
		}

	}

	
	
	$scope.resetForm = function(){
		$('#assetForm')[0].reset();
	}
	
	//file upload
	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if(file.size>200000){
                	$('.modal-title').html('Error');
                	$('.msg').html('<li>Image Size is more than 200KB. Please upload a smaller image.</li>')
    				$('.close').hide();
    				$('#loginButton').show();
    				$('.dependant').hide();
    				$('.independant').show();
    				$("#myModal").modal();
                }
                else{
                	 $upload.upload({
                         url: 'upload',
                         fields: {
                         },
                         file: file
                     }).progress(function (evt) {
                    	 $('.loader-fade').show();
                         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                         console.log('progress: ' + progressPercentage + '% ' +
                                     evt.config.file.name);
                     }).success(function (data, status, headers, config) {
                    	 $('.loader-fade').hide();
                     	$scope.asset.imgName = data.fileName;
                         console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                     JSON.stringify(data));
                     });
                }
            }
        }
    };
	
	
});


//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['angularFileUpload']);

app.controller('MyCtrl', ['$scope', '$upload', function ($scope, $upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                                evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                JSON.stringify(data));
                });
            }
        }
    };
}]);