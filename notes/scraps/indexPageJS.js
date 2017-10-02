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


function buildElements(data, initial) {
	var i, content, prop, attach;
	for (i = 0; i < data.length; i++) {
		attach = document.querySelector('a-entity#' + data[i].id);
		if (!attach) {
			var scene = document.querySelector('a-scene');
			attach = document.createElement('a-entity');
			if (data[i].id) {
				attach.setAttribute('id', data[i].id);
			}
			scene.appendChild(attach);
		}
		content = document.createElement(data[i].element);
		for (prop in data[i]) {
			if (prop !== "id" && prop !== "element") {
				content.setAttribute(prop, data[i][prop])
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
			if (_.has(response.data[contentObject], "nestedInstructions")) {
				if (response.data[contentObject].nestedInstructions.root === "this") {
					var detachedNestedElement = buildDetachedNestedElement(response.data[contentObject], response.data);
					var attachTo = document.querySelector(response.data[contentObject].nestedInstructions.rootedTo);
					attachTo.appendChild(detachedNestedElement);
				}
			//	var toBuild = response.data
			} else {
				buildElements(response.data[contentObject], false);
				$(document).trigger('elementBuiltForAction');
			}

		})
}


function removeCloseItem() {
	console.log("data-for");
	var target;
	if (this.hasAttribute('data-target')) {
		target = document.querySelector('#' + $(this).attr('data-target'));
	} else if (this.hasAttribute('data-target-close')) {
		target = document.querySelector('#' + $(this).attr('data-target-close'));
	} else {
		target = this;
	}
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

function buildDetachedNestedElement(rootContent, everything) {
	var instructions = rootContent.nestedInstructions;
	//var root = document.createElement(rootContent.element);
	//root.id = rootContent.id;
	//root = attachAttributes(rootContent, root, false);

	var levelRoots = {};
	for (var i = 0; i < instructions.depth; i++) {
		levelRoots['level' + i] = buildLevel(instructions['level' + i], everything)
	}

	for(var j=1; j<instructions.depth; j++){
		levelRoots.level0.appendChild(levelRoots['level' + j])
	}
	return levelRoots.level0;
}

function buildLevel(keys, everything) {
	var root = document.createElement(everything[keys.root].element);
	root.id = everything[keys.root].id;
	root = attachAttributes(everything[keys.root], root, false);
	if(_.has(everything, keys.content)){
		//for(var i=0; i<everything[keys.content].length; i++){
			buildNestedParts(root, everything[keys.content], false)
		//}
	}

}

function attachAttributes(data, content, initial) {
	var prop;
	for (prop in data[i]) {
		if (prop !== "id" && prop !== "element" && prop !== "nestedInstructions") {
			content.setAttribute(prop, data[i][prop])
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
			}
		}
	}
	return content;
}


function buildNestedParts(root, data, initial) {
	var i, content, prop, attach;
	for (i = 0; i < data.length; i++) {
		//attach = document.querySelector('a-entity#' + data[i].id);
		/*if (!attach) {
			var scene = document.querySelector('a-scene');
			attach = document.createElement('a-entity');
			if (data[i].id) {
				attach.setAttribute('id', data[i].id);
			}
			scene.appendChild(attach);
		}*/
		content = document.createElement(data[i].element);
		for (prop in data[i]) {
			if (prop !== "id" && prop !== "element") {
				content.setAttribute(prop, data[i][prop])
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
				}
			}

		}
		root.appendChild(content);
	}
	return root;

	//var BlackBottomCircle = document.querySelector('a-entity#BlackBottomCircle')
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























