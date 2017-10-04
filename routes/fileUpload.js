var mongoose = require("mongoose");
var http = require("http");

// Code for uploading pictures
// ================================================================
var path = require("path");
// Require GridFS
var Grid = require("gridfs-stream");
// Require filesystem module
var fs = require("fs");
var geocode = require("./geocode.js");
var db = mongoose.connection;



// =================================================================
module.exports.photoUpload = function(coords, address, callback) {

    Grid.mongo = mongoose.mongo;
    var picturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";

    // Here we insert the code for gridfs
    var gfs = Grid(db.db);

    gfs.exist({ filename: coords + '.png' }, function(err, found) {
        if (err) return handleError(err);
        if (!found) {
            var writestream = gfs.createWriteStream({
                filename: coords + ".png",
                address: address
            });

            var request = http.get(picturePath, function(response) {
                response.pipe(writestream);
            });

            writestream.on('close', function(file) {
                console.log(coords + "Written to db");
                callback();
            });
        } else {
            callback(address);
        }

    });
};