$(document).ready(function(){
	let button = document.querySelector('a-button');
	let toast = document.querySelector('a-toast');
	let queryText = document.getElementById("searchText");
	let query = document.getElementById("runSearch");

	query.addEventListener('click', (event) => {
		console.log("Event", event);
		alert(queryText.getAttribute("value"));
		console.log(queryText.getAttribute("value"));
		getPic();
	});
	toast.addEventListener('actionclick', () => {
		toast.hide();

	}, false);
	button.addEventListener('click', () => {
		toast.show();

	}, false);
});


function getPic(){
	var zoom = 1;
	var location = [ 51.50700703827454, -0.12791916931155356 ];
	panoramaByLocation(location, function (err, result) {
		if (err) throw err;
		var data = equirect(zoom, result.tiles);

		// tile size
		console.log(data);

		// canvas size
		console.log(data.width, data.height)
	})
}