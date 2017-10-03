$(document).ready(function () {

	var currentPage = "indexPage";
	axios.get("http://localhost:9000/dims" + "/" + currentPage)
		.then((response) => {
			console.log(response);
			buildElements(response.data.menuItems, true);
			buildElements(response.data.helpInfo, true);

			var pageOn = document.createElement('div');
			pageOn.setAttribute('id', 'pageOn');
			pageOn.setAttribute('data-current-page', currentPage);
			var docBody = document.getElementsByTagName('body');
			docBody[0].appendChild(pageOn);
			/*console.log(response);
			attachGalleryOptions = "attach";
			createPanels(response.data, "initial");*/
			$(document).trigger('sceneLoaded');
		});

	/*var BlackBottomCircle = document.querySelector('a-entity#BlackBottomCircle');
	var navcubeRot = document.querySelector('a-entity#navcubeRot');
	var HelpNav = document.querySelector('a-entity#HelpNav');
	var searcj_rot = document.querySelector('a-entity#searcj_rot');
	var profile_rot = document.querySelector('a-entity#profile_rot');
	var myPassport_rot = document.querySelector('a-entity#myPassport_rot');*/

	$(document).on('rebuildEntity', function (event, pageContext, contentObject) {
		loadReloadElements(pageContext, contentObject);
	})


});


function buildPicGrid(container, pics) {
	var i, content, prop, attach, scene;
	var rowcount = 0;
	attach = document.querySelector('a-entity#' + container.id);
	if (!attach) {
		scene = document.querySelector('a-scene');
		attach = document.createElement('a-entity');
		/*if (data[i].id) {
			attach.setAttribute('id', data[i].id);
		}*/
		for (prop in container) {
			if (prop !== "element" && prop !== "content") {
				attach.setAttribute(prop, container[prop])
			}

		}
		scene.appendChild(attach);
		if (_.has(container, "content")) {
			for (var j = 0; j < container.content.length; j++) {
				var plane = document.createElement(container.content[j].element);
				for (prop in container.content[j]) {
					if (prop !== "element" && prop !== "content") {
						plane.setAttribute(prop, container.content[j][prop])
					}
					attach.appendChild(plane);
				}
			}
		}
	}
	for (i = 0; i < pics.length; i++) {


		//content = document.createElement(data[i].element);
		/*		for (prop in data[i]) {
					if (prop !== "id" && prop !== "element") {
						content.setAttribute(prop, data[i][prop])
					}
					console.log('prop= ', prop);
				}*/
		//content =
		buildPicGridTiles(pics[i], attach);
		//attach.appendChild(content);
	}

}


function buildPicGridTiles(data, attach, initial) {
	var i, content, prop, scene;
	attach = document.querySelector('a-entity#' + data.id);
	var container = document.createElement(data.element);
	/*if (data[i].id) {
		attach.setAttribute('id', data[i].id);
	}*/
	for (prop in data) {
		if (prop !== "element" && prop !== "content") {
			container.setAttribute(prop, data[prop])
		}

	}
	attach.appendChild(container);
	if (_.has(data, "content")) {
		console.log('not initial| prop= ', prop);
		for (var j = 0; j < data.content.length; j++) {
			var pic = document.createElement(data.content[j].element);
			for (prop in data.content[j]) {
				if (prop !== "element" && prop !== "content") {
					if (prop == "data-for") {
						console.log('has data for');
						var forActions = data[j][prop].split(" ");
						if (forActions.includes("close")) {
							console.log('add event listener');
							$(pic).click(removeCloseItem);
						}
						if (forActions.includes("open")) {
							$(pic).click(addedOpenItem);
						}
						if (forActions.includes("set")) {
							$(pic).click(setItem)
						}
					}
				}
			}


			container.appendChild(pic);
		}
	}
	// return container;
}

function buildElements(data, initial, everything) {
	var i, content, prop, attach, scene;
	for (i = 0; i < data.length; i++) {
		attach = document.querySelector('a-entity#' + data[i].id);
		if (!attach) {
			if (everything && _.has(everything, data[i].id)) {
				scene = document.querySelector('a-scene');
				var containerInfo = everything[data[i].id];
				var elem = containerInfo.element || 'a-entity';
				attach = document.createElement(elem);
				if (data[i].id) {
					attach.setAttribute('id', data[i].id);
				}
				attach = attachAttributes(containerInfo, attach, initial);
			} else {
				scene = document.querySelector('a-scene');
				attach = document.createElement('a-entity');
				if (data[i].id) {
					attach.setAttribute('id', data[i].id);
				}
			}
			scene.appendChild(attach);
		}
		content = document.createElement(data[i].element);
		for (prop in data[i]) {
			if (prop !== "id" && prop !== "element" && prop !== "class") {
				content.setAttribute(prop, data[i][prop])
			} else if(prop === "class"){
				content.setAttribute(prop, data[i][prop]);
			//	content.setState("active");
			}
			console.log('prop= ', prop);
			if (!initial) {
				console.log('not initial| prop= ', prop);
				if (prop == "data-for") {
					console.log('has data for');
					var forActions = data[i][prop].split(" ");
					if (forActions.includes("close")) {
						console.log('add event listener');
						$(content).click(removeCloseItem);
					}
					if (forActions.includes("open")) {
						$(content).click(addedOpenItem);
					}
					if (forActions.includes("set")) {
						$(content).click(setItem)
					}
				}
			}

		}
		attach.appendChild(content);
	}

	//var BlackBottomCircle = document.querySelector('a-entity#BlackBottomCircle')
}

function loadReloadElements(pageContext, contentObject) {
	axios.get("http://localhost:9000/dims" + "/" + pageContext)
		.then((response) => {
		console.log('pageContext: ', pageContext, 'contentObject: ', contentObject);
		if(contentObject ==="NavThumbs"){
			buildPicGrid(response.data[contentObject], response.data.indexExplore);
			$(document).trigger('elementBuiltForAction', [contentObject]);
		} else if(contentObject === "helpLink"){
			buildElements(response.data[contentObject], false, response.data);
			$(document).trigger('elementBuiltForAction', [contentObject]);
		}

		})
}


function removeCloseItem() {
	console.log("data-for");
	var target;
	if (this.hasAttribute('data-target-close')) {
		target = document.querySelector('#' + $(this).attr('data-target-close'));
	} else if (this.hasAttribute('data-target')) {
		target = document.querySelector('#' + $(this).attr('data-target'));
	} else {
		target = this;
	}
	console.log(target);
	var recursive = $(this).attr("data-recursive");
	for (var i = 0; i < target.children.length; i++) {
		console.log(target.children[i]);
		var inner = target.children[i];
		inner.parentNode.removeChild(inner);
	}
	target.parentNode.removeChild(target);
}

function addedOpenItem() {
	console.log("data-for opening from added item");
	var target = document.querySelector('#' + $(this).attr('data-target-open'));
	/*var target = document.querySelector('#' + $(this).attr('data-target'));
	var recursive = $(this).attr("data-recursive");
	for (var i = 0; i < target.children.length; i++) {
		console.log(target.children[i]);
		var inner = target.children[i];
		inner.parentNode.removeChild(inner);
	}
	target.parentNode.removeChild(target);*/
}

function setItem() {
	var target;
	if (this.hasAttribute('data-target-set')) {
		target = document.querySelector('#' + $(this).attr('data-target-set'));
	} else if (this.hasAttribute('data-target')) {
		target = document.querySelector('#' + $(this).attr('data-target'));

	} else {
		target = this;
	}
}


function attachAttributes(data, content, initial) {
	var prop;
	for (prop in data) {
		if (prop !== "id" && prop !== "element" && prop !== "nestedInstructions") {
			content.setAttribute(prop, data[prop])
		}
		console.log('prop= ', prop);
		if (!initial) {
			console.log('not initial| prop= ', prop);
			if (prop == "data-for") {
				console.log('has data for');
				var forActions = data[prop].split(" ");
				if (forActions.includes("close")) {
					console.log('add event listener');
					$(content).click(removeCloseItem);
				}
				if (forActions.includes("open")) {
					$(content).click(addedOpenItem);
				}
			}
		}
	}
	return content;
}

/*

$('[data-for=close]').click(function () {
	console.log("data-for");
	var target = document.querySelector('#' + $(this).attr('data-target'));
	var recursive = $(this).attr("data-recursive");
	console.log(target.components);
	if (recursive) {
		//	console.log(target[0].children);
		/!*	if ($(this).hasClass('clickable')) {
	$(this).removeClass("clickable");
	$(this).addClass('noClickable');
  } else if ($(this).hasClass('noClickable')) {
	$(this).removeClass('noClickable');
	$(this).addClass('clickable');
  }*!/
		for (var i = 0; i < target.children.length; i++) {
			console.log(target.children[i]);
			var inner = target.children[i];
			if (inner.getAttribute('opacity') == 1) {
				console.log("hide");
				inner.setAttribute('opacity', 0);
				inner.components.visible.flushToDOM();
			} else {
				console.log("show");
				inner.setAttribute('opacity', 1);
				inner.flushToDOM(true);
			}
		}
		if (target.getAttribute('visible') == true) {
			console.log("hide");
			target.setAttribute('visible', false);
			target.flushToDOM();
		} else {
			console.log("show");
			target.setAttribute('visible', true);
			target.flushToDOM();
		}
	} else {
		if (target.getAttribute('visible') == true) {
			console.log("hide");
			target.setAttribute('visible', false);
		} else {
			console.log("show");
			target.setAttribute('visible', true);
		}
	}
	console.log(document.querySelector('a-cursor').components);
	document.querySelector('a-cursor').components.raycaster.refreshObjects();
})
});*/























