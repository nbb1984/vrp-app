var axios = require("axios");

const Utils = {};

Utils.preloadAssets = (assets_arr)=>{
	let assets = document.querySelector('a-assets'), already_exists;

	if (!assets) {
		var scene = document.querySelector('a-scene');
		assets = document.createElement('a-assets');
		scene.appendChild(assets);
	}

	for (let item of assets_arr) {
		already_exists = false;

		for (let stuff of assets.children) {
			if (item.id === stuff.id) {
				already_exists = true;
			}
		}

		if (!already_exists) {
			var asset_item = document.createElement(item.type);
			asset_item.setAttribute('id', item.id);
			asset_item.setAttribute('src', item.src);
			assets.appendChild(asset_item);
		}
	}
};


Utils.fetchAssets = () =>{
	var baseUrl = window.location.origin;
	var queryUrl = baseUrl + '/geoSearch/Categories/art';
	axios.get(queryUrl)
		.then(response => {
			this.preloadAssets(response.data);
		})
};