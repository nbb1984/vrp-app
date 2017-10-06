AFRAME.registerComponent('loading', {
	schema: {
		dur: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
		var loadingScreen = document.createElement('a-torus-knot');
		loadingScreen.setAttribute('color',"#B84A39");
		loadingScreen.setAttribute('arc',"180");
		loadingScreen.setAttribute('position', '0 0 -4');
		loadingScreen.setAttribute('p',"2");
		loadingScreen.setAttribute('q',"7");
		loadingScreen.setAttribute('radius',"1");
		loadingScreen.setAttribute('radius-tubular',"0.1");
		loadingScreen.setAttribute("animation", {
			property: "rotation",
			easing: "easeOutCubic",
			to: "0 360 0",
			dur: 1500,
			dir: "normal"
		});
		loadingScreen.setAttribute('id', 'loadingScreen');
		this.el.appendChild(loadingScreen);
		setTimeout(()=>{
			this.el.parentNode.removeChild(this.el);
		}, 1000);

	}
});