var mongoose = require("mongoose");
var mongo = require("mongodb");

// MongoDB Configuration configuration (Change this URL to your own DB)
if(process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect("mongodb://localhost/vrp-app");
}

var db = mongoose.connection;
db.on("error", function (err) {
	console.log("Mongoose Error: ", err);
});
db.once("open", function () {
	console.log("Mongoose connection successful.");
});



module.exports = db;