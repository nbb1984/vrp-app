var mongoose = require("mongoose");

var path = require("path");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var fs = require("fs");
var uploadPic = require("./fileUpload.js");
var db = mongoose.connection;


// =================================================================
module.exports.retrievePic = function(coords, address, callback) {
        // All of the code inside this .once() method is for retrieving the pic.  
        // If you want to attach this to a request instead, this would be the code to copy and paste.
        uploadPic.photoUpload(coords, address,

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

module.exports.removePic = function(coords, path, callback) {
  console.log(coords);
    Grid.mongo = mongoose.mongo;
    var gfs = Grid(db.db);
    gfs.exist({ filename: coords + '.png' }, function(err, found) {
      if (err) {
        res.send(err);
      }
      else {
        gfs.remove({ filename: coords + '.png' }, function (err) {
          if (err) return handleError(err);
          fs.unlink(path, function (err) {
            if (err) throw err;
            callback({coords: coords, path: path});
            console.log('File deleted!');
          });  
        });      
      }
};