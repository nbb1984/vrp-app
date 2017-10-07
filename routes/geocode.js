var https = require("https");

module.exports.getCoordsAndAddress = function(search, callback) {
    return new Promise((resolve, reject) => {
	    var searchResult = search;
	    var url =
		    "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchResult;
	    https.get(url, res => {
		    res.setEncoding("utf8");
		    let body = "";
		    res.on("data", data => {
			    body += data;
		    });
		    res.on("end", () => {
			    body = JSON.parse(body);
			    /*console.log(
				  `City: ${body.results[0].formatted_address} -`,
				  `Latitude: ${body.results[0].geometry.location.lat} -`,
				  `Longitude: ${body.results[0].geometry.location.lng}` */

			    let lat = body.results[0].geometry.location.lat;
			    let lng = body.results[0].geometry.location.lng;
			    let location = body.results[0].formatted_address;
			    console.log(location);
			    resolve({lat: lat, lng: lng, address: location});
			    //callback(null, {lat: lat, lng: lng, address: location});


		    });

		    res.on('error', () => {
		    	reject();
			})
	    });

    });

};


// USE SOMETHING LIKE OPEN CAGE DATA TO GET ADDRESS FROM LAT & LNG
/*

module.exports.getAddressFromCoords = function(lat, lng, callback){

}*/
