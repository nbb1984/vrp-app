/**
 *

 *
 */


$(document).on('loaded', function () {


	document.on('userSignUp', function (event, userDetails) {
		userSignUp(userDetails);
	})


});

function userSignUp(userDetails) {
	if (userDetails.username.length > 0 && userDetails.password.length > 0 && userDetails.password2.length > 0) {
		console.log(userDetails);
		console.log(window.location);
		axios.post(window.location.origin + '/registerUser', userDetails)
			.then(function (response) {
				if(response.data.)
				if(Array.isArray(response.data)){
					var data = response.data;
					for(var i=0; i<data.length; i++){
						if(data[i].msg){

						}
					}
				}

				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

}

