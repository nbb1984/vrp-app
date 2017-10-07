
var mongoose = require("mongoose");
var http = require("http");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var url = require('url');
var fs = require("fs");
var sharp = require('sharp');
var _ = require('lodash');
var User = require('../models/user');
var BufferStream = require('./streamer');

var db = mongoose.connection;

module.exports = getFromGrid;

function getFromGrid(req, res) {
	var pathname;
	//return new Promise((resolve, reject) => {
		Grid.mongo = mongoose.mongo;

	var pathurl = url.parse(req.url);
	//var content = /thumb_/.test(pathurl.pathname);
	console.log(pathurl);
	if(/thumb_/.test(req.params.filename)){
		pathname = req.params.filename.replace("thumb_", "");
	} else {
		pathname = req.params.filename;
	}

		/*	var picturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";*/

		// Here we insert the code for gridfs
		var gfs = Grid(db.db);
		var fileName = pathname;
		//var fileName = lat +"_"+ lng + '.png';

		gfs.exist({filename: fileName}, function (err, found) {
			if (err) {
				res.send(err)
				//return handleError(err);
			}
			if(found){
				var readstream = gfs.createReadStream({
					filename: fileName
				});
				readstream.pipe(res);
			}
/*			if (!found) {


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
				/!*var request = http.get(image, function(response) {
					response.pipe(writestream);
				});*!/

				writestream.on('close', function (file) {
					console.log(file);
					console.log(fileName + " Written to db");
					resolve({added: true, filename: fileName, file: file});
				});
			} else {
				resolve({added: false, msg: lat + lng + " already exists "});
			}*/

		});
	//})
}