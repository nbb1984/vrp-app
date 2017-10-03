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