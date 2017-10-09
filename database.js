var mongoose = require("mongoose");
var mongo = require("mongodb");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
// MongoDB Configuration configuration (Change this URL to your own DB)
if(process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect("mongodb://heroku_zqpqzz45:p8dcvcn472bd17fstb90v1u3ei@ds111535.mlab.com:11535/heroku_zqpqzz45");
	//mongoose.connect("mongodb://localhost/vrp-app");
}

var db = mongoose.connection;
db.on("error", function (err) {
	console.log("Mongoose Error: ", err);
});
db.once("open", function () {
	console.log("Mongoose connection successful.");
});



module.exports = db;