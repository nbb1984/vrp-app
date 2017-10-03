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
				newEl.setAttribute('id', 'helpMenu');
				newEl.addEventListener("click", function (event) {
					this.buildHelpMenu();
					console.log("on click", event.detail.target.getAttribute('data-page'));
					var indexSelected = event.detail.target.getAttribute('data-page');

				});
			}


			el.appendChild(newEl);
		}
	},

	buildHelpMenu: function(){
		var help = document.getElementById('help-menu');
		var helpMenu = document.createElement('a-entity');
		helpMenu.setAttribute('help-menu');
		help.appendChild(helpMenu);
	}
});