var attachGalleryOptions;

$(document).ready(function () {

	var base = window.location.href;
	axios.get("http://localhost:9000/gallery" + "/" + "tileData")
		.then((response) => {
			console.log(response);
			attachGalleryOptions = "attach";
			createPanels(response.data, "initial");
		});
	document.querySelector('a-entity#attach').addEventListener('animation__remove-complete', removeCurrentPanelsFromSceneGraph)
	document.querySelector('.maximizer').addEventListener('click', clickedShow);
	document.querySelector('.getNewItems').addEventListener('click', clickedRemoveReload);
	/*	var sky= document.querySelector('a-sky');
		console.log(sky);
		sky.setAttribute('opacity', '0');*/
	//panels(tileData)
});


function thumbs(items, attach) {
	for (var i = 0; i < items.length; i++) {
		var pos = {x: 0, y: 0, z: 0};
		var phiAng = i * 0.1 + Math.PI;
		pos.x = .1 * Math.sin(phiAng);
		pos.y = -1;
		pos.z = .1 * Math.cos(phiAng);
		var posString = pos.x + " " + pos.y + " " + pos.z;
		$('a-entity#sky')
			.append('<a-sky id="loc_' + i + '" data-array-link-id="loc_' + i + '" data-array="room" src="' + items[i].image + '" visible="true" rotation="0 -90 0"></a-sky>');
		$('a-entity#NavThumbs')
			.append('<a-plane><a-image id="loc_' + i + '_thumb" data-array-link="loc_' + i + '" data-is-room-button-for="navclick" data-array-poi-link="panelhide" data-poi-array="panelhide" opacity="0" rotation="-10 0 0" width="12" height="6" position="' + posString + '" scale="0.2 0.2 0.2"></a-image></a-plane>')
	}
}

function createPanels(items, animate) {
	//var attach = attachmentPoint || 'attach';
	var linkEl = document.createElement('a-entity');
	linkEl.setAttribute('id', 'links');
	linkEl.setAttribute('layout', {
		type: "circle",
		radius: 1,
		margin: 1
	});
	linkEl.setAttribute('position', {x: 0, y: 0, z: 0});
	var container = document.querySelector('a-entity#attach');
	container.appendChild(linkEl);

	for (var i = 0; i < items.length; i++) {
		var newThumb = document.createElement('a-entity');
		newThumb.setAttribute('template', "src: #link");
		newThumb.setAttribute('data-src', '#' + items[i]);
		newThumb.setAttribute('data-thumb', '#' + items[i] + '-thumb');
		newThumb.addEventListener('click', clickedHide);
		// === EXP ==========

		//var phiAng = i * .5 + Math.PI;
		var phiAng = i * 2 * (Math.PI / items.length);
		console.log(phiAng);
		var xMin = 1 * Math.sin(phiAng);
		var xFin = 1 * Math.sin(phiAng);
		var y = 0;
		var zMin = 1 * Math.cos(phiAng);
		var zFin = 1 * Math.cos(phiAng);

		newThumb.setAttribute("animation__loading", {
			property: "position",
			easing: "easeOutCubic",
			from: {x: 0, y: -5, z: 0},
			to: {x: xFin, y: 0, z: zFin},
			dur: 1500,
			startEvents: "loaded",
			dir: "normal"
		});
		newThumb.setAttribute("animation__remove", {
			property: "position",
			easing: "easeInCubic",
			from: {x: xFin, y: 0, z: zFin},
			to: {x: 0, y: 11, z: 0},
			dur: 2000,
			startEvents: "removal",
			dir: "normal"
		});
		newThumb.setAttribute("animation__minimize", {
			property: "position",
			easing: "easeOutCubic",
			from: {x: xFin, y: 0, z: zFin},
			to: {x: xMin, y: -0.5, z: zMin },
			dur: 1500,
			startEvents: "minimize",
			dir: "normal"
		});
		newThumb.setAttribute("animation__maximize", {
			property: "position",
			easing: "easeOutCubic",
			from: {x: xMin, y: -0.5, z: zMin},
			to: {x: xFin, y: 0, z: zFin},
			dur: 1500,
			startEvents: "maximize",
			dir: "normal"
		});
		//newThumb.addState('maximize');
		newThumb.addEventListener('stateadded', (evt) => {
			if (evt.detail.state === 'maximize') {
				console.log('Entity now maximized!');
				//this.emit("maximize")
			}
			if (evt.detail.state === 'minimize') {
				console.log('Entity now minimized!');
				//this.emit("minimize")
			}
		});
		linkEl.appendChild(newThumb);
	}


}

function clickedHide() {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		if(!linkPanels[i].is('minimized')){
			console.log('Entity will minimize!');
			linkPanels[i].addState('minimized');
			linkPanels[i].emit("minimize");
		} /*else {
			linkPanels[i].addState('minimized');
			linkPanels[i].emit("minimize");
		}*/
		//linkPanels[i].removeState('maximize');

		/*var linkContainer = linkPanels[i].parentNode;
		linkContainer.removeChild(linkPanels[i]);*/
	}
	document.querySelector('.maximizer').setAttribute('visible', 'true');
	//document.querySelector('.getNewItems').setAttribute('visible', 'true');
}

function clickedShow(event) {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		if(linkPanels[i].is('minimized')){
			console.log('Entity will maximize!');
			linkPanels[i].removeState('minimized');
			linkPanels[i].emit("maximize");
		}/* else {
			linkPanels[i].addState('minimized');
			linkPanels[i].emit("minimize");
		}*/
		//linkPanels[i].addState('maximize');
		//linkPanels[i].removeState('minimize');
		/*var linkContainer = linkPanels[i].parentNode;
		linkContainer.removeChild(linkPanels[i]);*/
	}

	document.querySelector('.maximizer').setAttribute('visible', 'false');
	document.querySelector('.getNewItems').setAttribute('visible', 'true');
}

function clickedRemoveReload(event) {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		linkPanels[i].emit("removal");
		//linkPanels[i].addState('maximize');
		//linkPanels[i].removeState('minimize');
		/*var linkContainer = linkPanels[i].parentNode;
		linkContainer.removeChild(linkPanels[i]);*/
	}
	console.log("REMOVING ANIMATION");
	document.querySelector('.getNewItems').setAttribute('visible', 'false');
}

function removeCurrentPanelsFromSceneGraph(){
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		var linkContainer = linkPanels[i].parentNode;
		linkContainer.removeChild(linkPanels[i]);
	}
	links.parentNode.removeChild(links);
	console.log("REMOVING PANELS");
	axios.get("http://localhost:9000/gallery" + "/" + "tileData")
		.then((response) => {
			console.log(response);
			createPanels(response.data, "show");
		});
	document.querySelector('.maximizer').setAttribute('visible', 'false');
	document.querySelector('a-entity#attach').flushToDOM(true);

}

// =====

function clickedHideOrig() {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		var linkContainer = linkPanels[i].parentNode;
		linkContainer.removeChild(linkPanels[i]);
	}
	links.parentNode.removeChild(links);
	document.querySelector('.maximizer').setAttribute('visible', 'true');
}

function clickedShowOrig(event) {
	console.log(event);
	axios.get("http://localhost:9000/gallery" + "/" + "tileData")
		.then((response) => {
			console.log(response);
			createPanels(response.data, "show");
		});
	document.querySelector('.maximizer').setAttribute('visible', 'false');
	document.querySelector('a-entity#attach').flushToDOM(true);
}


function panelsBefore(items, animate) {
	//var attach = attachmentPoint || 'attach';
	var linkEl = document.createElement('a-entity');
	linkEl.setAttribute('id', 'links');
	linkEl.setAttribute('layout', "type: circle; radius: 1; margin: 1");
	linkEl.setAttribute('position', "0 0 0");
	var container = document.querySelector('a-entity#attach');
	container.appendChild(linkEl);
	for (var i = 0; i < items.length; i++) {
		var newThumb = document.createElement('a-entity');
		newThumb.setAttribute('template', "src: #link");
		newThumb.setAttribute('data-src', '#' + items[i]);
		newThumb.setAttribute('data-thumb', '#' + items[i] + '-thumb');
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
		if (animate === "initial") {
			newThumb.setAttribute("animation", "property: position; easing: easeInSine;  from:" + xFin + " " + y + " " + zFin + "; to:" + x + " " + y + " " + z + "; dur: 2000; dir: reverse; ");
		} else if (animate === "show") {
			newThumb.setAttribute("animation", "property: position; easing: easeInSine;  from:" + xFin + " " + y + " " + zFin + "; to: -5 0 0 ; dur: 2000; dir: reverse; ");
		}


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