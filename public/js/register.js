$(document).ready(function(){
	$('form').on('submit',function(){
		let username=$("#username").val();
		let password=$("#password").val();
		let cpassword=$("#cpassword").val();
		if(!username || !password ||!cpassword){
			$('#error').text("Please complete the whole form!");
			return false;}
		if(username.length<3){
		 	$('#error').text("Username must be at least 3 characters long!");
			return false;}
		if(password.length<8){
			$('#error').text("Password must be at least 8 characters long!");
			return false;}
		if(password !== cpassword){
			$('#error').text("Both passwords must match!");
			return false;}
		return true;
		});
	});
