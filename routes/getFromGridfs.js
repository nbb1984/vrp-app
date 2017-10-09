var mongoose = require("mongoose");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var url = require('url');
var _ = require('lodash');


var db = mongoose.connection;

module.exports = getFromGrid;

function getFromGrid(req, res) {
	var pathname;
	Grid.mongo = mongoose.mongo;

	var pathurl = url.parse(req.url);
	console.log(pathurl);
	if (/thumb_/.test(req.params.filename)) {
		pathname = req.params.filename.replace("thumb_", "");
	} else {
		pathname = req.params.filename;
	}
	// Here we insert the code for gridfs
	var gfs = Grid(db.db);
	var fileName = pathname;

	gfs.exist({filename: fileName}, function (err, found) {
		if (err) {
			res.send(err)
			//return handleError(err);
		}
		if (found) {
			var readstream = gfs.createReadStream({
				filename: fileName
			});
			readstream.pipe(res);
		}
	});
}