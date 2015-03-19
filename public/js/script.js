function clickAll() {
	$(".checkboxes").click();
}

function closeIndependant() {
	$('#myModal').modal('toggle');
}

function closeModal() {
	$('#myModal').modal('toggle');
	toggleEdit();
}

function toggleEdit() {
	$('#static').toggle('slow');
	$('#assetForm').toggle('slow');
	$('.edit').toggle();
}

function showLoader(){
	$('.loader-fade').show();
}

function hideLoader(){
	$('.loader-fade').hide();
}