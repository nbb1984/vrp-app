var mongoose = require("mongoose");
var http = require("http");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var fs = require("fs");
var sharp = require('sharp');
var _ = require('lodash');
var User = require('../models/user');
var BufferStream = require('./streamer');

var db = mongoose.connection;



module.exports = saveImage;

function saveImage(req) {
	return new Promise((resolve, reject) => {
		var user = req.user;
		console.log(user);
		var imageBufferAndDetails = decode(req.body.image);
		saveInMongo(req.body.lat, req.body.lng, imageBufferAndDetails.dataBuffer, imageBufferAndDetails.imageType)
			.then(response => {
				//if(response.added){
					console.log('save in mongo response', response);
					User.findOneAndUpdate({"_id": user._id}, user.saved.addToSet(response.filename), {new: true})
						.exec()
						.then((newdoc) => {
							console.log("newdoc coming!!!!!");
							//console.log([newdoc, {lat: req.body.lat, lng: req.body.lng, address: result.address}]);
							//resolve({ok: true, doc: newdoc, details: {lat: result.lat, lng: result.lng, address: result.address}})
							resolve(newdoc);
							//res.json({ok: true, doc: newdoc});
						})
						.catch(err => {
							reject(err);
							//res.json({ok: false, err: err});
						})
			/*	} else {

				}*/
			})
			.catch(err => {
				//res.json({ok: false});
				reject(err);
				console.log('err', err);
			});
	})
}


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

function saveInMongo(lat, lng, image, imageData) {
	return new Promise((resolve, reject) => {
		Grid.mongo = mongoose.mongo;
		/*	var picturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";*/

		// Here we insert the code for gridfs
		var gfs = Grid(db.db);
		var fileName = lat +"_"+ lng + '.png';

		gfs.exist({filename: fileName}, function (err, found) {
			if (err) {
				reject(err);
				//return handleError(err);
			}
			if (!found) {


				var transformer = sharp()
					.resize(200, 200)
					.on('info', function(info) {
						console.log('Image height is ' + info.height);
					});

				var writestream = gfs.createWriteStream({
					filename: fileName,
					imageType: imageData
				});

				var thumbWritestream = gfs.createWriteStream({
					filename: 'thumb' + "_"+ fileName,
					imageType: imageData
				});
				new BufferStream(image).pipe(writestream);

				new BufferStream(image).pipe(transformer).pipe(thumbWritestream);
				/*var request = http.get(image, function(response) {
					response.pipe(writestream);
				});*/

				writestream.on('close', function (file) {
					console.log(file);
					console.log(fileName + " Written to db");
					resolve({added: true, filename: fileName, file: file});
				});
			} else {
				resolve({added: false, msg: lat + lng + " already exists "});
			}

		});
	})
}