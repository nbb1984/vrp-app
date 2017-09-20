$(document).ready(function(){
	console.log("hello");

	if (window.location.search.substring(1) === "error"){
		console.log('got this far');
		$('.message').html("<div class='alert alert-danger text-center' role='alert'>There was an error with your username and/or password.  Please re-enter.</div>");
	}
	else if (window.location.search.substring(1) === "success") {
		console.log("success");
		$("<div class='alert alert-success text-center' role='alert'>").text("Congratulations! You are registered. You may now login.").appendTo(".message");
	}
});
