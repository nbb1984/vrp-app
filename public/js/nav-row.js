/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('nav-row', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		page: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		this.buildAndAttach();
		// el.addEventListener(data.on, function () {

		/*el.addEventListener("click", function () {
			console.log("on click")
			// Fade out image.
/!*			data.target.emit('set-image-fade');
			// Wait for fade to complete.
			setTimeout(function () {
				// Set image.
				data.target.setAttribute('material', 'src', data.src);
			}, data.dur);*!/
		});*/
	},

	/**
	 * Setup fade-in + fade-out.
	 */
	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var basePath = "assets/ui/";
		var btns = [
			{page: "explore", file: "explore.png", class:"clickable",position: {x: -1.6, y: -2, z: -3.8}},
			{page: "help", file:"help.png", class:"clickable", position: {x: 1.6, y: -2, z: -3.8}},
			{page: "search", file:"search.png", class:"clickable",position: {x: -0.8, y: -2, z: -3.8}},
			{page: "profile", file:"Profile.png", class:"clickable",position: {x: 0, y: -2, z: -3.8}},
			{page: "profile-expanded",  file:"myPassport.png", class:"clickable",position: {x: .8, y: -2, z: -3.80}},
		];

		var selectedHighlight = "selected.png";

		var width = 0.5;
		var height = 0.5;

		for(var i=0; i<btns.length; i++){
			var newEl = document.createElement('a-image');
			newEl.setAttribute('src', basePath + btns[i].file);
			newEl.setAttribute("position", btns[i].position);
			if(data.page !== btns[i].page && btns[i].page !== "help"){
				newEl.setAttribute('linking', "target:"+ btns[i].page +";");
			}
			newEl.setAttribute("class", btns[i].class);
			newEl.setAttribute("width", width);
			newEl.setAttribute("height", height);
			if(data.page === btns[i].page){
				var selected = document.createElement("a-ring");
				var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
				selected.setAttribute('radius-inner', width/2);
				selected.setAttribute('radius-outer', (width + 0.1)/2);
				selected.setAttribute('color', 'teal');
				//selected.setAttribute('data-current', btns[i].comp);
				selected.setAttribute('id', 'selectedHighlighter');
				selected.setAttribute("position", position);
				el.appendChild(selected);
			}

			if(btns[i].page === "help"){
				newEl.addEventListener("click", (event) => {
					var displayedHelpMenu = document.getElementById('helpMenuContainer');
					if(displayedHelpMenu){
						displayedHelpMenu.parentNode.removeChild(displayedHelpMenu);
					} else {
						this.buildHelpMenu();
					}

					console.log("on click", event.detail.target.getAttribute('data-page'));
					var indexSelected = event.detail.target.getAttribute('data-page');

				});
			}


			el.appendChild(newEl);
		}
	},

	buildHelpMenu: function(){
		var scene = document.querySelector('a-scene');
		var container = document.createElement('a-entity');

		//var helpMenu = document.createElement('a-help-menu');
		container.setAttribute('id', 'helpMenuContainer');
		//helpMenu.setAttribute('help-menu');

		var basePath = "assets/ui/";

		var elems = [
			{'data-label': 'info', element: "a-image", file: "HelpMenu.png", height: 6, width: 10, position: {x: -1.6, y: -1, z: -2}, rotation: {x: -10, y: 0, z:0}, scale: {x: 0.5, y: 0.5, z: 0.5}},
			{'data-label': 'logout',element: "a-image", file:"login_signup_Btn.png", class:"clickable", position: {x: 1.6, y: -2, z: -1.8}}, // will be logout
			{'data-label': 'hideMenus',element: "a-image", file: "ic_visibility_off_black_48dp_2x.png", class: "clickable",   position:  {x: 1.6, y: -1, z: -1.8}}
			/*			{page: "search", file:"search.png", class:"clickable",position: {x: -0.8, y: -2, z: -3.8}},
						{page: "profile", file:"Profile.png", class:"clickable",position: {x: 0, y: -2, z: -3.8}},
						{page: "profile-expanded",  file:"myPassport.png", class:"clickable",position: {x: .8, y: -2, z: -3.80}},
						{element: "a-image", id: "info", class: "clickable", placeholder: "Username", color: "black", width: 1, position: {x: -1.2, y: -0.75, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
						{element: "a-input", id: "password", class: "clickable", placeholder: "Password", type: "password", width: 1, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
						{element: "a-text", id: "", value: "Login",  position: {x: -1.176, y: -0.45, z: -2.944}, text: {height: 3}},
						{element: "a-button", id: "submit", class: "clickable", value: "Login", name: "stuff", color: "white", position: {x: 0.337, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
						{element: "a-text", id: "", value: " or Sign up, now.",  position: {x: -0.53, y: -0.49, z: -2.944}, text: {height: 1}, scale: {x: 0.5, y: 0.5, z: 0.5}},*/
		];

		for(var i=0; i<elems.length; i++){
			var newEl = document.createElement(elems[i].element);
			for(var prop in elems[i]){
				if(prop !== "element" && prop !== "file"){
					newEl.setAttribute(prop, elems[i][prop])
				}
				if(prop === "file"){
					newEl.setAttribute('src', basePath + elems[i].file);
				}
			}
/*			if(elems[i]['data-label'] === 'hideMenus'){
				newEl.addEventListener('click', function(event){
					var allMenus = document.querySelectorAll('a-entity.nav-content');
					for(var n=0; n<allMenus.length; n++){
						allMenus[n].setAttribute('visible', 'false');
					}
					var helpMenu = document.querySelector('a-entity#helpMenuContainer');
					helpMenu.parentNode.removeChild(helpMenu);
					var sceneEl = document.querySelector('a-scene');
					var showBtn = document.createElement('a-image');
					showBtn.setAttribute('position', {x: 1.6, y: -2, z: -3.8});
					showBtn.setAttribute('id', 'showBtn');
					showBtn.setAttribute('class', 'showclick');
					showBtn.setAttribute('src', basePath + "ic_visibility_black_48dp_2x.png");
					showBtn.addEventListener('click', function(event){
						var allMenus = document.querySelectorAll('a-entity.nav-content');
						for(var n=0; n<allMenus.length; n++){
							allMenus[n].setAttribute('visible', 'true');
						}
						document.querySelector('a-cursor#cursor').components.raycaster.objects = '.clickable';
						var showIcon = document.querySelector('a-image#showBtn');
						showIcon.parentNode.removeChild(showIcon);
					});
					sceneEl.appendChild(showBtn);
					document.querySelector('a-cursor#cursor').components.raycaster.objects = '.showclick';
				})
			}*/
			container.appendChild(newEl);
		}

		scene.appendChild(container);
	}
});