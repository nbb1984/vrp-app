(()=>{
	if (!AFRAME) { return console.error('AFRAME is required!'); }
	if (!AFRAME.ASSETS_PATH) { AFRAME.ASSETS_PATH = "./assets"; }
	require('./nav');
	require('./category-nav');
	require('./collection-panels');
	require('./signup');
	require('./login');
	require('./search');
	require('./help-menu');
	require("../lib/aframe-material.js");

})();