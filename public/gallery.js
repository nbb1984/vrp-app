
var attachGalleryOptions;

$(document).ready(function () {

	var base = window.location.href;
	axios.get("http://localhost:9000/gallery" + "/" + "tileData")
		.then((response) => {
			console.log(response);
			attachGalleryOptions = "attach";
			panels(response.data, true);
		});
	document.querySelector('.showOptions').addEventListener('click', clickedShow);
/*	var sky= document.querySelector('a-sky');
	console.log(sky);
	sky.setAttribute('opacity', '0');*/
	//panels(tileData)
});


function thumbs(items, attach) {
	for (var i = 0; i < items.length; i++) {
		var pos = {x: 0, y:0, z: 0};
		var phiAng = i * 0.1 + Math.PI;
		pos.x = .1 * Math.sin(phiAng);
		pos.y = -1;
		pos.z = .1 * Math.cos(phiAng);
		var posString = pos.x +" "+ pos.y + " " + pos.z;
		$('a-entity#sky').append('<a-sky id="loc_' + i + '" data-array-link-id="loc_' + i + '" data-array="room" src="' + items[i].image + '" visible="true" rotation="0 -90 0"></a-sky>');
		$('a-entity#NavThumbs').append('<a-plane><a-image id="loc_' + i + '_thumb" data-array-link="loc_' + i + '" data-is-room-button-for="navclick" data-array-poi-link="panelhide" data-poi-array="panelhide" opacity="0" rotation="-10 0 0" width="12" height="6" position="'+ posString +'" scale="0.2 0.2 0.2"></a-image></a-plane>')
	}
}




function panels(items, initial) {
	//var attach = attachmentPoint || 'attach';
	var linkEl = document.createElement('a-entity');
	linkEl.setAttribute('id','links');
	linkEl.setAttribute('layout', "type: circle; radius: 1; margin: 1");
	linkEl.setAttribute('position', "0 0 0");
	var container = document.querySelector('a-entity#attach');
	container.appendChild(linkEl);
	for (var i = 0; i < items.length; i++) {
		var newThumb = document.createElement('a-entity');
		newThumb.setAttribute('template', "src: #link");
		newThumb.setAttribute('data-src', '#'+ items[i]);
		newThumb.setAttribute('data-thumb', '#'+ items[i] +'-thumb');
		newThumb.addEventListener('click', clickedHide);
		// === EXP ==========

		//var phiAng = i * .5 + Math.PI;
		var phiAng = i * 2 * (Math.PI / items.length);
		console.log(phiAng);
		var x = 10 * Math.sin(phiAng);
		var xFin = 1 * Math.sin(phiAng);
		var y = 0;
		var z = 10 * Math.cos(phiAng);
		var zFin = 1 * Math.cos(phiAng);
		if(initial) newThumb.setAttribute("animation", "property: position; easing: easeInSine;  from:"+ xFin + " " + y + " " + zFin +"; to:"+ x + " " + y + " "  + z +"; dur: 2000; dir: reverse; ");
		// ============
	//	newThumb.setAttribute('position', posString);

		linkEl.appendChild(newThumb);
		//optionContainer.appendChild(newThumb);
		//$('a-entity#links').append('<a-entity template="src: #link" data-src="#'+ items[i] +'" data-thumb="#'+ items[i] +'-thumb" position="'+posString+'"></a-entity>')
	}

	/*document.querySelector('a-entity#'+ attach).appendChild(optionContainer);
	setTimeout(function(){
		document.querySelector('a-scene').flushToDOM(true);
	}, 500);*/

}

function clickedHide(){

	var links = document.querySelector('a-entity#links');
	//console.log(links.getFirstChild);
	var linkPanels = links.components.layout.children;
	//var links = document.querySelectorAll('.option');
	console.log(links.components);
	console.log(linkPanels);
	console.log(linkPanels.length);
	for(var i = 0; i< linkPanels.length; i++){
		var linkContainer = linkPanels[i].parentNode;
		console.log(linkContainer);
		linkContainer.removeChild(linkPanels[i]);
	}
	links.parentNode.removeChild(links);
	document.querySelector('.showOptions').setAttribute('visible', 'true');
	//document.querySelector('a-entity#attach').flushToDOM(true);


}

function clickedShow(event){
	console.log(event);
	//var links = document.querySelector('#links');
	axios.get("http://localhost:9000/gallery" + "/" + "tileData")
		.then((response) => {
			console.log(response);
			panels(response.data, false);
		});
	/*console.log(links.components.layout.children);
	var linkPanels = links.components.layout.children;
	for(var i = 0; i< linkPanels.length; i++){
		linkPanels[i].setAttribute('visible', 'true');
		console.log(linkPanels[i]);
	}*/
	document.querySelector('.showOptions').setAttribute('visible', 'false');
	document.querySelector('a-entity#attach').flushToDOM(true);
	//document.querySelector('a-scene').flushToDOM(true);

}

function panelsExp(items, attachmentPoint) {
	var attach = attachmentPoint || 'attach';
	var optionContainer = document.querySelector('a-entity#'+ attach);
	/*	var optionContainer = document.createElement('a-entity');
		optionContainer.setAttribute('id','links');
		optionContainer.setAttribute('layout', "type: circle; radius: 1,  margin: 1");
		optionContainer.setAttribute('position', "0 0 0");*/
	for (var i = 0; i < items.length; i++) {
		var pos = {x: 0, y:0, z: 0};
		var phiAng = i * .5 + Math.PI;
		console.log(phiAng);
		pos.x = 1 * Math.sin(phiAng);
		pos.y = 0;
		pos.z = 1 * Math.cos(phiAng);
		var posString = pos.x +" "+ pos.y + " " + pos.z;
		console.log(posString);
		var startString = pos.x + " " + pos.y + " " + pos.z +1;
		var newThumb = document.createElement('a-entity');
		//newThumb.setAttribute("animate-each", "property: position; easing: easeInSine; from:"+ posString +"; to:"+ startString +"; dur: 2000; dir: reverse; ");
		newThumb.setAttribute('template', "src: #link");
		newThumb.setAttribute('data-src', '#'+ items[i]);
		newThumb.setAttribute('data-thumb', '#'+ items[i] +'-thumb');
		newThumb.addEventListener('click', clickedHide);
		newThumb.setAttribute('position', posString);
		//	var linkEl = document.querySelector('a-entity#links');
		optionContainer.appendChild(newThumb);
		//$('a-entity#links').append('<a-entity template="src: #link" data-src="#'+ items[i] +'" data-thumb="#'+ items[i] +'-thumb" position="'+posString+'"></a-entity>')
	}

	//document.querySelector('a-entity#'+ attach).appendChild(optionContainer);
}
