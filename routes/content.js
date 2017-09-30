var express = require('express');
var path = require('path');
var router = express.Router();
console.log("index js ran");

var pathHelper = require('../pathHelper');
var mockData = require('../assets/dataMock');


function ensureAuthenticated(req, res, next) {
	next();
	/*if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		res.redirect("/login");
	}*/
}

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log("dasjlfkasdj;flka");
	console.log(req.body);
	res.redirect('/login');
});

var options = {
	root: path.join(pathHelper._root + "/public/"),
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

router.get('/', (req, res) => {
	res.sendFile("login.html", options)
});

router.get('/login', (req, res) => {
	res.sendFile("login.html", options)
});

router.get('/search', ensureAuthenticated,  (req, res) => {
	res.sendFile("search.html", options)
});

router.get('/signup', (req, res) => {
	res.sendFile("signup.html", options);
});
router.get('/gallery', ensureAuthenticated, (req, res) => {
	res.sendFile("gallery.html", options);
});

router.get('/gallery/:contents', (req, res) => {

	res.json(mockData[req.params.contents])
});


module.exports = router;