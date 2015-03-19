$(document).ready(function() {
		// 		$('#collapseOne').collapse();
		// 		$('#collapseTwo').collapse();
		// 		$('#collapseThree').collapse();
		// 		$('#collapseFour').collapse();
  
    

		$('.open2').click(function() {
			var err = 0;
			$('#panel1').find('[type="text"],select').each(function(key,val){
				if($(val).val()==''){
					err++;
					$(val).addClass('error');
				}
			});
			if(err==0){
				$('#panel1').hide('slow');
				$('#panel2').show('slow');
			}
			
		});
		
		$('.open3').click(function() {
			var err = 0;
			$('#panel2').find('[type="text"],select').each(function(key,val){
				if($(val).val()==''){
					err++;
					$(val).addClass('error');
				}
			});
			if(err==0){
				$('#panel2').hide('slow');
				$('#panel3').show('slow');
			}
		});
		
		$('.open4').click(function() {
			var err = 0;
			$('#panel3').find('[type="text"],select').each(function(key,val){
				$(val).removeClass('error');
				if($(val).val().length==0){
					err++;
					$(val).addClass('error');
				}
			});
			if(err==0){
				$('#panel3').hide('slow');
				$('#panel4').show('slow');
			}
			
		});
		
		$('.back1').click(function() {
			$('#panel2').hide('slow');
			$('#panel1').show('slow');
		});
		
		$('.back2').click(function() {
			$('#panel3').hide('slow');
			$('#panel2').show('slow');
		});
		
		$('.back3').click(function() {
			$('#panel4').hide('slow');
			$('#panel3').show('slow');
		});
	});
	
	 