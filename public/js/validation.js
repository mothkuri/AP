$(document).ready(function(){
});
	function validateRegistration(){
		var isFormValid=true;
		var isModalRequired=false;
		//remove error on key press on all input type=text
		$('[type="text"],[type="password"],select').keypress(function(){
			$(this).removeClass('error');
		});
		
		$('select').change(function(){
			$(this).removeClass('error');
		});
		
		$('[type="text"],[type="password"],select').removeClass('error');

		
		$('.msg').html('');
		
		
		if($('#first_name').val().length==0){
			$('#first_name').addClass('error');
			isFormValid=false;
		}
		
		if($('#last_name').val().length==0){
			$('#last_name').addClass('error');
			isFormValid=false;
		}
		
		if($('#employee_id').val().length==0){
			$('#employee_id').addClass('error');
			isFormValid=false;
		}
		
		if(isNaN($('#employee_id').val())){
			$('#employee_id').addClass('error');
			$('.msg').html('<li>Employee Number Must be a Number.</li>');
			isModalRequired=true;
			isFormValid=false;
		}
		if($('#email').val().length==0){
			$('#email').addClass('error');
			isFormValid=false;
		}
		else if($('#email').val().match(/^[a-zA-Z0-9._%+-]+@tcs.com$/) == null){
			$('#email').addClass('error');
			$('.msg').append('<li>Give a valid TCS Email ID.</li>');
			isModalRequired=true;
			isFormValid=false;
		}
		else{
			$('#email').removeClass('error');
		}
		
		
		if($('#password').val().length==0){
			$('#password').addClass('error');
			isFormValid=false;
		}
		else if($('#password').val().length<8){
			$('#password').addClass('error');
			$('.msg').append('<li>Password Min Length is 8.</li>');
			isModalRequired=true;
			isFormValid=false;
		}
		else if($('#password').val() != $('#password_confirmation').val()){
			$('#password').addClass('error');
			$('#password_confirmation').addClass('error');
			$('.msg').append('<li>Passwords Didnot Match.</li>');
			isModalRequired=true;
			isFormValid=false;
		}
		
		if($('#password_confirmation').val().length==0){
			$('#password_confirmation').addClass('error');
			isFormValid=false;
		}
		
		
		
		
		if(isModalRequired){
			$('#myModal').modal('show');
		}
		
		return isFormValid;
	}
	
	function validateLogin(){
		var isFormValid=true;
		var isModalRequired=false;
		//remove error on key press on all input type=text
		$('[type="text"],[type="password"]').keypress(function(){
			$(this).removeClass('error');
		});
		
		$('[type="text"],[type="password"]').removeClass('error');

		
		$('.msg').html('');
		
		if($('#username').val().length==0){
			$('#username').addClass('error');
			isFormValid=false;
		}
		
		if($('#password').val().length==0){
			$('#password').addClass('error');
			isFormValid=false;
		}
		
		if(isNaN($('#username').val())){
			$('#username').addClass('error');
			$('.msg').append('UserID should be your Employee ID.');
			isModalRequired=true;
			isFormValid=false;
		}
		
		if(isModalRequired){
			$('#myModal').modal('show');
		}
		
		return isFormValid;
	}

	
	function validateAsset(files){
		$('.msg').html('');
		var isFormValid=true;
		var isModalRequired=false;
		//remove error on key press on all input type=text
		//remove error on key press on all input type=text
		$('[type="text"],[type="password"],select').keypress(function(){
			$(this).removeClass('error');
		});
		
		$('select').change(function(){
			$(this).removeClass('error');
		});
		
		$('[type="text"],[type="password"],select').removeClass('error');
		
		if(typeof files=='undefined'){
			$('.msg').html('<li>Please Select Image for the Asset.</li>');
			isModalRequired=true;
			isFormValid=false;
		}
		
		if($('#deviceName').val().length==0){
			$('#deviceName').addClass('error');
			isFormValid=false;
		}
		
		if($('#deviceType').val().length==0){
			$('#deviceType').addClass('error');
			isFormValid=false;
		}
		
		if($('#description').val().length==0){
			$('#description').addClass('error');
			isFormValid=false;
		}
		
		if($('#assetID').val().length==0){
			$('#assetID').addClass('error');
			isFormValid=false;
		}
		
		
		if($('#owner').val().length==0){
			$('#owner').addClass('error');
			isFormValid=false;
		}
		
		
		if(isModalRequired){
			$('#myModal').modal('show');
		}
		
		return isFormValid;
	}

	
	function validateCompleteProfile(){
		$( "li.item-ii" ).find( "li" ).css( "background-color", "red" );
	}
	
