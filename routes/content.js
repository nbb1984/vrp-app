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
router.get('/', ensureAuthenticated, function (req, res) {
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

router.get('/search', (req, res) => {
	res.sendFile("search.html", options)
});
router.get('/explore', (req, res) => {
	res.sendFile("explore.html", options)
});

router.get('/explore/categories', (req, res) => {
	res.sendFile("explore_categories.html", options)
});
router.get('/index', (req, res) => {
	res.sendFile("index.html", options);
});

router.get('/profile', (req, res) => {
	res.sendFile("profile.html", options)
});


router.get('/signup', (req, res) => {
	res.sendFile("signup.html", options);
});
router.get('/gallery', (req, res) => {
	res.sendFile("gallery.html", options);
});

router.get('/dims/:page', (req, res) => {
	res.json(require('../assets/dimensions/' + req.params.page))
});

router.get('/gallery/:contents', (req, res) => {

	res.json(mockData[req.params.contents])
});

router.get('/thumbnails/*', (req, res) => {
	var pathurl = url.parse(req.url);
	console.log(pathurl);
	var pathname = pathurl.pathname.replace("thumbnails", "assets");
	var content = pathname.match(/\..*$/);
	console.log('image type', content);
	var filePath = path.join(pathHelper._root + pathname);
	console.log('filepath', filePath);
	sharp(filePath)
		.resize(200, 200)
		.toBuffer()
		.then((response) => {
			console.log('response will print here next run');
			res.set('Content-Type', 'image/jpg');
			res.send(response);
		})
	/*fs.readFile(filePath, (err, data) =>{

	})*/


});

module.exports = router;