


/*
<a-cursor id="cursor" cursor="fuse: false" scale="1.3 1.3 1.3"
              animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150"
              animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
              event-set__1="_event: mouseenter; color: #549ad5"
              event-set__2="_event: mouseleave; color: #ededed"
              raycaster="far: 20; objects: .clickable">
    </a-cursor>
 */
/*

$(document).ready(function(){
	let isMobile = AFRAME.utils.device.isMobile();
	if(!isMobile) {
		var cursor = document.createElement('a-cursor');
		cursor.setAttribute('id', 'cursor');
		cursor.setAttribute('cursor', "fuse: true; fuseTimeout: 500");
		cursor.setAttribute('scale', '1.3 1.3 1.3');
		cursor.setAttribute('animation__click', "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150");
		cursor.setAttribute('animation__fusing', "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
		cursor.setAttribute('animation__fusingColor', "property: color; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
		cursor.setAttribute('event-set__1', "_event: mouseenter; color: #549ad5");
		cursor.setAttribute('event-set__2', "_event: mouseleave; color: #ededed");
		cursor.setAttribute('raycaster', "far: 20; objects: .clickable");
		var camera = document.querySelector('a-entity#camera');
		camera.appendChild(cursor);
	} else {
		/!*var cursor = document.createElement('a-cursor');
		cursor.setAttribute('id', 'cursor');
		cursor.setAttribute('cursor', "fuse: false");
		cursor.setAttribute('scale', '1.3 1.3 1.3');
		cursor.setAttribute('animation__click', "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150");
		cursor.setAttribute('animation__fusing', "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
		cursor.setAttribute('event-set__1', "_event: mouseenter; color: #549ad5");
		cursor.setAttribute('event-set__2', "_event: mouseleave; color: #ededed");
		cursor.setAttribute('raycaster', "far: 20; objects: .clickable");
		var camera = document.querySelector('a-entity#camera');
		camera.appendChild(cursor);*!/
	}
});*/
