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
	res.sendFile("index.html", options)
});

// ==================== Diffrent routes same page ========================

router.get('/index', (req, res) => {
	res.sendFile("index.html", options);
});


// Authentication Related Routes
router.get('/login', (req, res) => {
	var filePath = path.join(pathHelper._root + "/public/");
	res.render(filePath + "index", {location: 'profile'});
});

router.get('/signup', (req, res) => {
	res.redirect("/");
});

// Search / Content Related Routes
router.get('/search', (req, res) => {
	var filePath = path.join(pathHelper._root + "/public/");
	res.render(filePath + "index", {location: 'search'});
});

router.get('/search-results', (req, res) => {
	res.redirect("/");
});

router.get('/explore', (req, res) => {
	var filePath = path.join(pathHelper._root + "/public/");
	res.render(filePath + "index", {location: 'explore'});
});

router.get('/explore/categories', (req, res) => {
	res.redirect("/");
});

router.get('/discover', (req, res) => {
	res.redirect("/");
});

router.get('/help', (req, res) => {
	var filePath = path.join(pathHelper._root + "/public/");
	res.render(filePath + "index", {location: 'help'});
});

// User Related Routes
router.get('/profile', ensureAuthenticated, (req, res) => {
	res.sendFile("index.html", options);
});

router.get('/profile-expanded', ensureAuthenticated, (req, res) => {
	res.sendFile("index.html", options);
});

// =======================================================================
/*

router.get('/index', (req, res) => {
	res.sendFile("index.html", options);
});


// Authentication Related Routes
router.get('/login', (req, res) => {
	res.sendFile("login.html", options)
});

router.get('/signup', (req, res) => {
	res.sendFile("signup.html", options);
});

// Search / Content Related Routes
router.get('/search', (req, res) => {
	res.sendFile("search.html", options)
});

router.get('/search-results', (req, res) => {
	res.sendFile("search_results.html", options)
});

router.get('/explore', (req, res) => {
	res.sendFile("explore.html", options)
});

router.get('/explore/categories', (req, res) => {
	res.sendFile("explore_category.html", options)
});

router.get('/discover', (req, res) => {
	res.sendFile("discovery_search.html", options);
});

// User Related Routes
router.get('/profile', ensureAuthenticated, (req, res) => {
	res.sendFile("profile.html", options)
});

router.get('/profile-expanded', ensureAuthenticated, (req, res) => {
	res.sendFile("profile_with_images.html", options)
});

*/

// Data Related Routes


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
			res.set('Content-Type', 'image/' + content);
			res.send(response);
		})
	/*fs.readFile(filePath, (err, data) =>{

	})*/


});


router.post('/fileUpload', (req, res) => {

	console.log(req.body);
	res.end();
});

router.get('/adminDashboard', (req, res) =>{
	res.sendFile("admin_dashboard.html", options)
});

module.exports = router;


function uploadToMongo(){
	var mongoose = require("mongoose");
	var http = require("http");

	mongoose.connect("mongodb://localhost/vrp-app");

	var conn = mongoose.connection;

// Code for uploading pictures
// ================================================================
	var path = require("path");
// Require GridFS
	var Grid = require("gridfs-stream");
// Require filesystem module
	var fs = require("fs");
	var picturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=24.5550593,-81.7799871%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";
// =================================================================

	Grid.mongo = mongoose.mongo;

	conn.on("error", function(err) {
		console.log("Mongoose Error: ", err);
	});

	conn.once("open", function() {
		// Here we insert the code for gridfs
		var gfs = Grid(conn.db);

		var writestream = gfs.createWriteStream({
			filename: "map.png"
		});

		var request = http.get("http://maps.googleapis.com/maps/api/streetview?size=600x300&location=24.5550593,-81.7799871%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw", function(response) {
			response.pipe(writestream);
		});

		writestream.on('close', function(file) {
			console.log(file.filename + "Written to DB");
		});

		console.log("Mongoose connection successful.");
	});
}
