

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

module.exports = router;

// Code for getting the popular search data.
router.get("/searches", function(req, res) {

	Search.find({}).sort([
			["hits", "descending"]
		])
		.exec(function(error, doc) {
			if (error) {
				console.log(error);
			}
			// Otherwise, send the doc to the browser as a json object
			else {
				res.json(doc);
			}
		});
});
// Create a new Search or replace an existing Search
router.post("/user/search", function(req, res) {
	try{
	if(req.user){
		geocode.getCoordsAndAddress(req.body.query, function(result) {
			var googlePicturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + result.coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";

			Search
				.findOneAndUpdate({
					"address": result.address
				}, {
					$inc: { 'hits': 1 }
				})
				.catch(function(err) {
					console.log(err);
				})
				.then(function(update) {
					if (!update) {
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
						newSearch.save(function(error, doc) {
							// Log any errors
							if (!doc) {
								console.log("this is really weird");
								console.log(req.user);
								console.log(error);
							}
							// Otherwise
							else {
								console.log("Why isn't this running?");
								// Use the user id to find and update it's searches
								User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "searches": doc._id } }, { new: true }, function(err, newdoc) {
									// Send any errors to the browser
									if (err) {
										res.send(err);
									}
									// Or send the new info about the user to the browser.
									else {
										console.log("newdoc coming!!!!!");
										console.log([newdoc, {coords: result.coords, address: result.address}]);
										res.json([newdoc, {coords: result.coords, address: result.address, imgPath: googlePicturePath}]);
									}
								});
							}
							console.log("skipped the if/else");
						});
					} else {
						console.log("we got a result!!!!!!");
						console.log(result);
						console.log(req.user._id);
						console.log(update._id);
						User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "searches": update._id } }, { new: true }, function(err, newdoc) {
							// Send any errors to the browser
							if (err) {
								res.send(err);
							}
							// Or redirect to get the userdata again and reload.
							else {
								console.log("newdoc coming!!!!");
								console.log([newdoc, {coords: result.coords, address: result.address}]);
								res.json([newdoc, {coords: result.coords, address: result.address, imgPath: googlePicturePath}]);
							}
						});
					}

				});
		})
	}
	} catch(err){
		console.log(err);
	}

});

router.get("/save/photo/:coords/:address", function(req, res){
	loadPhoto.retrievePic(req.params.coords, req.params.address, function(fsPicPath){
		if (fsPicPath) {
			res.json({picturePath: fsPicPath, address: req.params.address});
		}
		else {
			res.send("There was an error loading the photo");
		}
	})
});

router.get("/delete/photo/:coords/:filePath", function(req, res){
	console.log(req.params.coords);
	loadPhoto.removePic(req.params.coords, req.params.filePath, function(result){
		res.json({ok: true, coords: result.coords, picturePath: result.path});
	})
});

// Code to untag a search.
router.get("/search/delete/:id", function(req, res) {
	var id = req.params.id;
	// Use the article id to find and delete it's Search
	User.findOneAndUpdate({ "_id": req.user._id }, { $pull: { "searches": req.params.id } }, function(err, newdoc) {
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