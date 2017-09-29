$(document).ready(function(){
	let button = document.querySelector('a-button');
	let toast = document.querySelector('a-toast');
	toast.addEventListener('actionclick', ()=>{
		toast.hide();
	})
	button.addEventListener('click', ()=> {
		toast.show();
	})
})