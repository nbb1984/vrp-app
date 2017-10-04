var mongoose = require("mongoose");

var path = require("path");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var fs = require("fs");
var uploadPic = require("./fileUpload.js");
var db = mongoose.connection;


// =================================================================
module.exports.retrievePic = function(coords, callback) {
        // All of the code inside this .once() method is for retrieving the pic.  
        // If you want to attach this to a request instead, this would be the code to copy and paste.
        uploadPic.photoUpload(coords,

          function(address) {

                var picturePath = path.join(__dirname, '../public/images/' + coords + '.png');

            Grid.mongo = mongoose.mongo;

            var gfs = Grid(db.db);

            console.log("url coming");

            var fs_write_stream = fs.createWriteStream(picturePath);

            var readstream = gfs.createReadStream({
                filename: coords + '.png'
            });

            readstream.pipe(fs_write_stream);

            fs_write_stream.on('close', function() {
                console.log("file has been retrieved from the DB");
            });
            callback({picturePath: picturePath, address: address});
          });

};

module.exports.removePic = function(coords, callback) {
    gfs.remove({ filename: coords + '.png' }, function (err) {
      if (err) return handleError(err);
      callback(coords);
    });
};