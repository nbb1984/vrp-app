
$(document).ready(function(){
	console.log("hello");
	
	// $(".username").val("nickbole");
	// $(".email").val("nick@thing.com");
	// $(".password").val("google34");
	// $(".password2").val("google34");
	$(".submit-button").on("click", function() {
		$(".msg").html("");
		registerUser();
	});
	
	var registerUser = function() {
		
		var username = $(".username").val(),
			email = $(".email").val(),
			password = $(".password").val(),
			password2 = $(".password2").val();

	    $.post("/registerUser", {username: username, password: password, password2: password2, email: email}).then(function(result) {
	    	console.log(result);
	    	if (result.constructor === Array){
		    	for (var i = 0; i < result.length; i++){
		    		$("<div class='alert alert-danger text-center' role='alert'>)").text(result[i].msg).appendTo(".msg");
		    	}
	    	}
	    	else {	    		
	    		window.location.replace("http://localhost:3000/login?success");
	    	}

	    });	    
	}
});

