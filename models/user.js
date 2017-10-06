var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	searches: [{
		type: Schema.Types.ObjectId,
		ref: "Search"
	}],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}],
	saved: [{
			type: String
		}]
});

var User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
	console.log(callback);
}

module.exports.comparePassword = function (candidatePassword, hash, cb) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};