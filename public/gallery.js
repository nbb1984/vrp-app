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
});

function createPanels(items) {
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
		newThumb.addEventListener('stateadded', (evt) => {
			if (evt.detail.state === 'maximize') {
				console.log('Entity now maximized!');
			}
			if (evt.detail.state === 'minimize') {
				console.log('Entity now minimized!');
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
		}
	}
	document.querySelector('.maximizer').setAttribute('visible', 'true');
}

function clickedShow(event) {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		if(linkPanels[i].is('minimized')){
			console.log('Entity will maximize!');
			linkPanels[i].removeState('minimized');
			linkPanels[i].emit("maximize");
		}
	}
	document.querySelector('.maximizer').setAttribute('visible', 'false');
	document.querySelector('.getNewItems').setAttribute('visible', 'true');
}

function clickedRemoveReload(event) {
	var links = document.querySelector('a-entity#links');
	var linkPanels = links.components.layout.children;
	for (var i = 0; i < linkPanels.length; i++) {
		linkPanels[i].emit("removal");
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

