var express = require('express');
var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
const url = require('url');
var router = express.Router();
console.log("index js ran");

var pathHelper = require('../pathHelper');
var mockData = require('../assets/dataMock');


function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		res.redirect("/login");
	}
}

function checkAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		//res.redirect("/login");
		return next();
	}
}


var options = {
	root: path.join(pathHelper._root + "/public/"),
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

router.get('/', checkAuthenticated, (req, res) => {
	res.sendFile("index.html", options)
});


// Data Related Routes


router.post('/fileUpload', (req, res) => {

	console.log(req.body);
	res.end();
});

router.get('/adminDashboard', (req, res) =>{
	res.sendFile("admin_dashboard.html", options)
});

module.exports = router;

