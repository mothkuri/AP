var AssociateListingCtrl=angular.module('AssociateListingCtrl', []);

	AssociateListingCtrl.controller('AssociateListingController', ['$scope','$http','Associates','$location',function($scope,$http,Associates,$location) {
		console.log("Associate Listing Controller");
		$scope.tagline = 'My Associates';
		$scope.formData = {};

        // when landing on the page, get all associates and show them
		$('.loader-fade').show();
		Associates.get()
         .success(function(data) {
        	 $('.loader-fade').hide();
        	 if(typeof data.isProfileComplete!='undefined' && data.isProfileComplete==false){
					$location.path('/completeProfile');
				}
        	 else{
        		   $scope.associates = data.data;
        	 }
           
         })
		.error(function(){
			$('.loader-fade').hide();
			window.location.href = "/login";
		});
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {
				// validate the formData to make sure that something is there
				// if form is empty, nothing will happen
				// people can't just hold enter to keep adding the same to-do anymore
				if (!$.isEmptyObject($scope.formData)) {
					$('.loader-fade').show();
	                // call the create function from our service (returns a promise object)
	            	Associates.create($scope.formData)

	                    // if successful creation, call our get function to get all the new todos
	                    .success(function(data) {
	                    	$('.loader-fade').hide();
	                    	if(typeof data.isProfileComplete!='undefined' && data.isProfileComplete==false){
	        					$location.path('/completeProfile');
	        				}
	                    	else{
	                    		$scope.formData = {}; // clear the form so our user is ready to enter another
	                    		$scope.associates = data; // assign our new list of todos
	                    	}
	                    
	                    })
	                    .error(function(){
	                    	$('.loader-fade').hide();
	                    	window.location.href = "/login";
	            		});
	            }
	        };

	        // DELETE ==================================================================
	        // delete a todo after checking it
	        $scope.deleteTodo = function(id) {
	        	$('.loader-fade').show();
	        	Associates.delete(id)
	                // if successful creation, call our get function to get all the new todos
	                .success(function(data) {
	                	$('.loader-fade').hide();
	                    $scope.associates = data; // assign our new list of todos
	                })
	                .error(function(){
	                	$('.loader-fade').hide();
	                	window.location.href = "/login";
	        		});
	        };
	        
	        $scope.clicked= function(id){
				alert(id);
			}
			
	}]);



	AssociateListingCtrl.controller('AssociateDetailsController',['$scope','$routeParams','Associates','$location',
	        function($scope,$routeParams,Associates,$location){
				$('.loader-fade').show();
				Associates.getById($routeParams.associateId)
		         .success(function(data) {
		        	 $('.loader-fade').hide();
		        	 if(typeof data.isProfileComplete!='undefined' && data.isProfileComplete==false){
							$location.path('/completeProfile');
						}
		        	 else{
		        		 $scope.associateDetails = data;
			        	 var DOB = $scope.associateDetails.DOB;
			        	 var DOJTcs = $scope.associateDetails.DOJTcs;
			        	 var DOJQualcomm = $scope.associateDetails.DOJQualcomm
			        	 
			        	 //formatting DOB
			        	 var d = new Date(DOB);
			        	 var curr_date = d.getDate();
			        	 var curr_month = d.getMonth();
			        	 var curr_year = d.getFullYear();
			        	 if(curr_month+1<10){
			        		 curr_month = '0'+(curr_month+1);
			        	 }
			        	 $scope.associateDetails.DOB = (curr_month) + "-" + curr_date
			        	 + "-" + curr_year;

			        	//formatting DOJTcs
			        	 d = new Date(DOJTcs);
			        	 var curr_date = d.getDate();
			        	 var curr_month = d.getMonth();
			        	 var curr_year = d.getFullYear();
			        	 if(curr_month+1<10){
			        		 curr_month = '0'+(curr_month+1);
			        	 }
			        	 $scope.associateDetails.DOJTcs = (curr_month) + "-" + curr_date
			        	 + "-" + curr_year;
			        	 
			        	//formatting DOJQualcomm
			        	 d = new Date(DOJQualcomm);
			        	 var curr_date = d.getDate();
			        	 var curr_month = d.getMonth();
			        	 var curr_year = d.getFullYear();
			        	 if(curr_month+1<10){
			        		 curr_month = '0'+(curr_month+1);
			        	 }
			        	 $scope.associateDetails.DOJQualcomm = (curr_month) + "-" + curr_date
			        	 + "-" + curr_year;
			        	 
			        	 
			        	 var oneMonth = 24*60*60*1000*30;	// hours*minutes*seconds*milliseconds
			        	 var firstDate = new Date( $scope.associateDetails.DOJTcs);
			        	 var secondDate = new Date();

			        	var expInMonths = Math.abs((firstDate.getTime() - secondDate.getTime())/(oneMonth));
			        	
			        	var years = (expInMonths/12).toString().split('.')[0];
			        	var months = (expInMonths%12).toString().split('.')[0];
			        	
			        	 $scope.experience = years + ' Years ' + months + ' Months (Approx) ';
//			        	 $scope.experience = moment( $scope.associateDetails.DOJTcs, "MM-DD-YYYY").fromNow();
		        	 }
		         })
		         .error(function(){
		        	 $('.loader-fade').hide();
		        	 window.location.href = "/login";
		         	});
				
				
				$scope.save=function(){
						Associates.save($scope.associateDetails);
						var oneMonth = 24*60*60*1000*30;	// hours*minutes*seconds*milliseconds
			        	 var firstDate = new Date( $scope.associateDetails.DOJTcs);
			        	 var secondDate = new Date();

			        	var expInMonths = Math.abs((firstDate.getTime() - secondDate.getTime())/(oneMonth));
			        	
			        	var years = (expInMonths/12).toString().split('.')[0];
			        	var months = (expInMonths%12).toString().split('.')[0];
			        	
			        	 $scope.experience = years + ' Years ' + months + ' Months (Approx) ';
				}
//				$scope.associateId=$routeParams.associateId;
			}]);