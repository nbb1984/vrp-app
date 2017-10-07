var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var User = require('../models/user');
var Search = require('../models/searches');
var axios = require("axios");
var path = require("path");
var geocode = require("./geocode.js");
var loadPhoto = require("./fileRetrieve.js");

var saveSearchImage = require('./saveImage');
var getSavedImage = require('./getFromGridfs');
// Code for uploading pictures
// ================================================================
var mongoose = require("mongoose");
var http = require("http");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var fs = require("fs");
var db = mongoose.connection;


var BufferStream = require('./streamer');
//===========================

module.exports = router;

// Code for getting the popular search data.
router.get("/EverySearch", function (req, res) {

	Search.find({}).sort([
			["hits", "descending"]
		])
		.exec(function (error, doc) {
			if (error) {
				console.log(error);
			}
			// Otherwise, send the doc to the browser as a json object
			else {
				res.json(doc);
			}
		});
});
//==============================================

router.get('/savedImage/:filename', getSavedImage);

router.post('/saveCollectionImage', (req, res) => {

	var filename = req.body.filename;
	var user = req.user;
	console.log('body: ', filename, user);
	if(!user.saved.includes(filename)){
		User.findByIdAndUpdate( user._id ,{$push: {saved: filename}} , {new: true})
			.exec()
			.then((newdoc) => {
				console.log("newdoc coming!!!!!", newdoc);
				//console.log([newdoc, {lat: req.body.lat, lng: req.body.lng, address: result.address}]);
				//resolve({ok: true, doc: newdoc, details: {lat: result.lat, lng: result.lng, address: result.address}})
				res.json({ok: true, doc: newdoc});
				//res.json({ok: true, doc: newdoc});
			})
			.catch(err => {
				res.json({ok: false, err: err});
				//res.json({ok: false, err: err});
			})
	} else {
		res.json({ok: true, added: false});
	}

});


router.post("/saveSearchImage", (req, res) => {
	var lat = req.body.lat;
	var lng = req.body.lng;
	if(req.user){
		saveSearchImage(req)
			.then(response => {
				res.json({ok: true, doc: response})
			})
			.catch(err => {
				console.log(err);
			})
/*		var imageBufferAndDetails = decode(req.body.image);
		saveInMongo(lat, lng, imageBufferAndDetails.dataBuffer)
			.then(response => {
				console.log('save in mongo response', response);
				User.findOneAndUpdate({"_id": req.user._id}, {$addToSet: {"saved": response.filename}}, {new: true})
					.exec()
					.then((newdoc) => {
						console.log("newdoc coming!!!!!");
						console.log([newdoc, {lat: result.lat, lng: result.lng, address: result.address}]);
						//resolve({ok: true, doc: newdoc, details: {lat: result.lat, lng: result.lng, address: result.address}})
						res.json({ok: true, doc: newdoc});
					})
					.catch(err => {
						//reject(err);
						res.json({ok: false, err: err});
					})
			})
			.catch(err => {
				res.json({ok: false});
				console.log('err', err);
			});*/
	} else {
		res.json({ok: false, userError: "Must be logged in to save.  Check out the curated collections!"})
	}

	//res.end();
});


function decode(dataURI) {
	if (!/data:image\//.test(dataURI)) {
		console.log('ImageDataURI :: Error :: It seems that it is not an Image Data URI. Couldn\'t match "data:image\/"');
		return null;
	}
	/*	let infoParts = dataURI.slice(0,40);
		let regExMatches = infoParts.match('data:image/(.*);base64,(.*)');
		console.log(regExMatches);*/
	let regExMatches = dataURI.match('data:image/(.*);base64,(.*)');
	return {
		imageType: regExMatches[1],
		dataBase64: regExMatches[2],
		dataBuffer: new Buffer(regExMatches[2], 'base64')
	};
}

function saveInMongo(lat, lng, image) {
	return new Promise((resolve, reject) => {
		Grid.mongo = mongoose.mongo;
		/*	var picturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";*/

		// Here we insert the code for gridfs
		var gfs = Grid(db.db);
		var fileName =  lat + lng + '.png';

		gfs.exist({filename: fileName}, function (err, found) {
			if (err) {
				reject(err);
				//return handleError(err);
			}
			if (!found) {
				var writestream = gfs.createWriteStream({
					filename: fileName
				});

				new BufferStream(image).pipe(writestream);
				/*var request = http.get(image, function(response) {
					response.pipe(writestream);
				});*/

				writestream.on('close', function (file) {
					console.log(file);
					console.log(fileName + " Written to db");
					resolve({filename: fileName, file: file});
				});
			} else {
				resolve(lat + lng + " already exists ");
			}

		});
	})
}

//==============================================


router.get("/searchThumbCoords/:lat/:lng", (req, res) => {
	/*	var googlePicturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="  + req.params.lat + ',' + req.params.lng + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";*/
	var googlePicturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + req.params.lat + ',' + req.params.lng + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";
	res.json({url: googlePicturePath})
});


// Create a new Search or replace an existing Search
router.post("/search", function (req, res) {
	if (req.user) {
		viaLocationQuery(req.body.query, req.user)
			.then(response => {
				res.json(response);
			})
			.catch(err => {
				res.json({ok: false, err: err})
			})
	} else {
		geocode.getCoordsAndAddress(req.body.query, function (err, result) {
			if (err) {
				console.log('error running geocode', err);
				res.json({ok: false, err: err})
			}
			res.json({ok: true, details: result});
		});
/*		viaLocationQuery(req.body.query, req.user)
			.then(response => {
				res.json(response);
			})
			.catch(err => {
				res.json({ok: false, err: err})
			})*/
		//res.json({ok: false, userError: "Must be logged in to search.  Check out the curated collections!"})
	}
});


function viaLocationQuery(locQuery, user) {
	return new Promise((resolve, reject) => {
		geocode.getCoordsAndAddress(locQuery, function (err, result) {
			if(err){
				console.log('error running geocode', err);
				reject(err);
			}
			Search
				.findOneAndUpdate({
					"address": result.address
				}, {
					$inc: {'hits': 1}
				})
				.catch(function (err) {
					console.log(err);
				})
				.then(function (update) {
					if (!update) {
						var fsPicPath = path.join(__dirname, process.env.DOWNLOAD_SAVE_PATH + result.lat + result.lng + '.png');
						var newSearch = new Search({
							"address": result.address,
							"fsPicturePath": fsPicPath,
							"coords": result.lat +','+ result.lng,
							"lat": result.lat,
							"lng": result.lng,
							"hits": 1
						});
						// And save the new Search the db
						newSearch.save()
							.then((doc) => {
								// Log any errors
								if (!doc) {
									reject('error: no document returned by mongo')
								} else {
									console.log("Why isn't this running?");
									// Use the user id to find and update it's searches
									User.findOneAndUpdate({"_id": user._id}, {$push: {"searches": doc._id}}, {new: true})
										.exec()
										.then((newdoc) => {
											console.log("newdoc coming!!!!!");
											console.log([newdoc, {lat: result.lat, lng: result.lng, address: result.address}]);
											resolve({ok: true, doc: newdoc, details: {lat: result.lat, lng: result.lng, address: result.address}})
										})
										.catch(err => {
											reject(err);
										})
								}

								console.log("skipped the if/else");
							})
							.catch(error => {
								reject(error);
							})
					} else {
						User.findOneAndUpdate({"_id": user._id}, {$push: {"searches": update._id}}, {new: true})
							.exec()
							.then((newdoc) => {
								console.log("newdoc coming!!!!");
								console.log([newdoc, {lat: result.lat, lng: result.lng, address: result.address}]);
								resolve({ok: true, doc: newdoc, details: {lat: result.lat, lng: result.lng, address: result.address}})
							})
							.catch(err => {
								reject(err);
							})
					}

				});
		})
	})
}

function viaCoordinates(coords, user) {
	var googlePicturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";

	Search
		.findOneAndUpdate({
			"address": result.address
		}, {
			$inc: {'hits': 1}
		})
		.catch(function (err) {
			console.log(err);
		})
		.then(function (update) {
			if (!update) {
				return newLocation(result, user, googlePicturePath)
			} else {
				return updateUserSearches(update, user, googlePicturePath)
			}

		});
}

function updateUserSearches(update, user, googlePicturePath) {
	return new Promise((resolve, reject) => {
		console.log("we got a result!!!!!!");
		console.log(result);
		console.log(user._id);
		console.log(update._id);
		User.findOneAndUpdate({"_id": user._id}, {$push: {"searches": update._id}}, {new: true})
			.exec()
			.then((newdoc) => {
				console.log("newdoc coming!!!!");
				console.log([newdoc, {coords: result.coords, address: result.address}]);
				resolve([newdoc, {coords: result.coords, address: result.address, imgPath: googlePicturePath}])
			})
			.catch(err => {
				reject(err);
			})
	})
}

function newLocation(result, user, googlePicturePath) {
	return new Promise((resolve, reject) => {
		console.log("no result!!!!");
		console.log(result.address);
		console.log(result.coords);
		// Create a new Search and pass the req.body to the entry
		var fsPicPath = path.join(__dirname, process.env.DOWNLOAD_SAVE_PATH + result.coords + '.png');
		var newSearch = new Search({
			"address": result.address,
			"fsPicturePath": fsPicPath,
			"coords": result.coords,
			"hits": 1
		});
		// And save the new Search the db
		newSearch.save((error, doc) => {
			// Log any errors
			if (!doc) {
				console.log("this is really weird");
				console.log(user);
				console.log(error);
			} else {
				console.log("Why isn't this running?");
				// Use the user id to find and update it's searches
				User.findOneAndUpdate({"_id": user._id}, {$push: {"searches": doc._id}}, {new: true})
					.exec()
					.then((newdoc) => {
						console.log("newdoc coming!!!!!");
						console.log([newdoc, {coords: result.coords, address: result.address}]);
						resolve([newdoc, {coords: result.coords, address: result.address, imgPath: googlePicturePath}])
					})
					.catch(err => {
						reject(err);
					})
			}
			reject('WTF');
			console.log("skipped the if/else");
		});
	})
}

router.get("/save/photo/:coords/:address", function (req, res) {
	loadPhoto.retrievePic(req.params.coords, req.params.address, function (fsPicPath) {
		if (fsPicPath) {
			res.json({picturePath: fsPicPath, address: req.params.address});
		}
		else {
			res.send("There was an error loading the photo");
		}
	})
});

router.get("/delete/photo/:coords/:filePath", function (req, res) {
	console.log(req.params.coords);
	loadPhoto.removePic(req.params.coords, req.params.filePath, function (result) {
		res.json({ok: true, coords: result.coords, picturePath: result.path});
	})
});

// Code to untag a search.
router.get("/search/delete/:id", function (req, res) {
	var id = req.params.id;
	// Use the article id to find and delete it's Search
	User.findOneAndUpdate({"_id": req.user._id}, {$pull: {"searches": req.params.id}}, function (err, newdoc) {
		// Send any errors to the browser
		if (err) {
			res.send(err);
		}
		// Or send the newdoc to the browser
		else {
			return res.redirect("/userData");
		}
	});
});