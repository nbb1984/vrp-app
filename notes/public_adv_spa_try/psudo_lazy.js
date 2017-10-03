(function(){

	var js = [
		"https://aframe.io/releases/0.3.2/aframe.min.js",
		"https://npmcdn.com/aframe-event-set-component@3.0.1",
		"https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js",
		"https://aframe.io/releases/0.3.0/aframe.min.js",
		"https://npmcdn.com/aframe-animation-component@3.0.1",
		"https://npmcdn.com/aframe-event-set-component@3.0.1",
		"https://npmcdn.com/aframe-layout-component@3.0.1",
		"https://npmcdn.com/aframe-template-component@3.1.1",
		"components/set-image.js"
	];

	var head = document.querySelector('head');
	for(var i=0; i<js.length; i++){
		var elem = document.createElement("script");
		elem.setAttribute('src', js[i]);
		head.appendChild(elem);
	}



})();

var lslsls = ["https://aframe.io/releases/0.7.0/aframe.min.js",
	"https://rawgit.com/mayognaise/aframe-mouse-cursor-component/master/dist/aframe-mouse-cursor-component.min.js",
	"https://cdn.rawgit.com/etiennepinchon/aframe-material/master/dist/aframe-material.min.js",
	"https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js",


	"https://unpkg.com/aframe-animation-component@3.2.5/dist/aframe-animation-component.min.js",
	"https://unpkg.com/aframe-layout-component@4.2.0/dist/aframe-layout-component.min.js",
	"https://unpkg.com/aframe-template-component@^3.2.1/dist/aframe-template-component.min.js",
];




