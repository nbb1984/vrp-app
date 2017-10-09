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
				console.log('save in mongo response', response);
				User.findOneAndUpdate({"_id": user._id}, {$push: {saved: response.filename}}, {new: true})
					.exec()
					.then((newdoc) => {
						resolve(newdoc);
					})
					.catch(err => {
						reject(err);
					})

			})
			.catch(err => {
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

		// Here we insert the code for gridfs
		var gfs = Grid(db.db);
		var fileName = lat + "_" + lng + '.png';

		gfs.exist({filename: fileName}, function (err, found) {
			if (err) {
				reject(err);
			}
			if (!found) {


				var transformer = sharp()
					.resize(200, 200)
					.on('info', function (info) {
						console.log('Image height is ' + info.height);
					});

				var writestream = gfs.createWriteStream({
					filename: fileName,
					imageType: imageData
				});

				var thumbWritestream = gfs.createWriteStream({
					filename: 'thumb' + "_" + fileName,
					imageType: imageData
				});
				new BufferStream(image).pipe(writestream);

				new BufferStream(image).pipe(transformer).pipe(thumbWritestream);

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