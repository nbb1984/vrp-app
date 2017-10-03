

$(document).ready(function(){
	let keyboard = document.querySelector("a-keyboard");
	var str = "";
	keyboard.open();
	keyboard.addEventListener('input', (e)=>{
		str += e.detail;
		console.log(str);
	});
	keyboard.addEventListener('enter', (e)=>{
		console.log("Enter key pressed!")
	})
	keyboard.addEventListener('dismiss', (e)=>{
		console.log("Dismiss: ", e);
		keyboard.dismiss();
	});
	keyboard.addEventListener('backspace', (e)=>{
		str = str.slice(0, -1);
		console.log(str);
	});
})