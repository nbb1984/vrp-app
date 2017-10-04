var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var CuratedContent = require('../models/curated');
var axios = require("axios");
var path = require("path");
var geocode = require("./geocode.js");
var loadPhoto = require("./fileRetrieve.js");
var Readable = require('stream').Readable;

module.exports = router;


router.get('/geoSearch', (req, res) => {

});

router.post('/geoSearch', (req, res) => {
	saveContent({
		//coords: '39.9496103,-75.1502821',
		address: req.body.address,
		lat: req.body.lat,
		lng: req.body.lng,
		category: req.body.cat,
		src: req.body.src
	})
		.then((response) => {
			console.log(response);
			res.json({ok: true});
		});
});


function saveContent(content) {
	var newThing = new CuratedContent(content);
	return newThing
		.save(newThing)
	//.exec()
}

// ================================================================

function saveDetailsAndPhoto(req, res) {
	if (req.body.file) {
		photoUpload(req.body.lat, req.body.lng, req.body.file, req.body.fileType, (fileName) => {
			console.log(fileName);
			if (fileName) {
				saveContent({
					//coords: '39.9496103,-75.1502821',
					address: req.body.address,
					lat: req.body.lat,
					lng: req.body.lng,
					category: req.body.cat,
					fsFilePath: fileName
				})
					.then((response) => {
						console.log(response);
						res.json({ok: true});
					});
			}
		})
	} else {
		saveContent({
			//coords: '39.9496103,-75.1502821',
			address: req.body.address,
			lat: req.body.lat,
			lng: req.body.lng,
			category: req.body.cat,
			src: req.body.src
		})
			.then((response) => {
				console.log(response);
				res.json({ok: true});
			});
	}
}


var mongoose = require("mongoose");
var http = require("http");

// Code for uploading pictures
// Require GridFS
var Grid = require("gridfs-stream");
var fs = require("fs");
var db = mongoose.connection;


/*const util = require('util');
const stream = require('stream');

function StringStream(strArg) {
	stream.Readable.call(this);
	this.str = strArg.split('');
};

util.inherits(StringStream, stream.Readable);

StringStream.prototype._read = function (numRead) {
	this.push(this.str.splice(0, numRead).join(''));
};*/

/*var thisIsAStringStream=new StringStream('this-is-test-text-1234567890');
thisIsAStringStream.pipe(process.stdout);*/

// =================================================================
function photoUpload(lat, lng, content, type, callback) {


	var s = new Readable();
	s._read = function noop() {
	}; // redundant? see update below
	s.push(content);
	s.push(null);

	Grid.mongo = mongoose.mongo;
	var extMatch = type.match(/\/.*$/);
	var ext = extMatch[0].replace('/', '');
	console.log(ext);
	// Here we insert the code for gridfs
	var gfs = Grid(db.db);
	var filename = lat + lng + ext;
	gfs.exist({filename: filename}, (err, found) => {
		if (err) {
			console.log(err);
			return handleError(err);
		}
		if (!found) {
			var writestream = gfs.createWriteStream({
				filename: filename,
				mode: 'w',
				content_type: type,
				metadata: {}
			});

			s.pipe(writestream);
			//.pipe(process.stdout)
			/*var request = http.get(src, (response) => {
				response.pipe(writestream);
			});*/

			writestream.on('close', (file) => {
				console.log(file + " close");
				callback(filename);
			});
			writestream.on('error', (err) => {
				console.log(err + " err");
				callback(false);
			});
			writestream.on('finish', (file) => {
				console.log(file + " finish");
				callback(filename);
			});
			writestream.on('data', (file) => {
				console.log(file + " data");
				//callback(filename);
			});
		} else {
			callback(filename);
		}

	});
};

function localPhotoUpload(lat, lng, filename, callback) {

	Grid.mongo = mongoose.mongo;
	var ext = filename.match(/\..*$/);
	console.log(ext);
	// Here we insert the code for gridfs
	var gfs = Grid(db.db);

	gfs.exist({filename: lat + lng + ext}, (err, found) => {
		if (err) return handleError(err);
		if (!found) {
			var writestream = gfs.createWriteStream({
				filename: lat + lng + ext,
				mode: 'w',
				content_type: "",
				metadata: {}

			});
			var request = fs.readFile(filename, 'utf8', (err, response) => {
				response.pipe(writestream);
			});

			writestream.on('close', (file) => {
				console.log(filename + " Written to db");
				callback(address);
			});
		} else {
			callback(address);
		}

	});
};