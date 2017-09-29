$(document).ready(function(){
	let button = document.querySelector('a-button');
	let toast = document.querySelector('a-toast');
	let queryText = document.getElementById("searchText");
	let query = document.getElementById("runSearch");

	query.addEventListener('click', (event) => {
		console.log("Event", event);
		alert(queryText.getAttribute("value"));
		console.log(queryText.getAttribute("value"));
	});
	toast.addEventListener('actionclick', () => {
		toast.hide();

	}, false);
	button.addEventListener('click', () => {
		toast.show();

	}, false);
})