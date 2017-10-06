(()=>{
	if (!AFRAME) { return console.error('AFRAME is required!'); }
	if (!AFRAME.ASSETS_PATH) { AFRAME.ASSETS_PATH = "./assets"; }
	var axios = require("axios");

	axios.interceptors.response.use(function (response) {
		// Do something with response data
		if(_.has(response, 'data.err')){
			console.log('error during search or search save');
			return Promise.reject(response.data.err);
		} else if(_.has(response, 'data.userError')){
			console.log('not logged in');
			return Promise.reject(response.data.userError);
		} else {
			console.log(response);
			return response;
		}

	}, function (error) {
		// Do something with response error
		return Promise.reject(error);
	});
/*	require('aframe');
	require('aframe-mouse-cursor-component');
	require('aframe-event-set-component');
	require('aframe-animation-component');*/

	require('./router-system');
	require('./router');
	require('./manhole');
	require('./nav');
	require('./category-nav');
	require('./collection-panels');
	require('./signup');
	require('./login');
	require('./search');
	require('./help-menu');
	require('./user-profile');
	require("../lib/aframe-material.js");


	require('./embededMap');
})();