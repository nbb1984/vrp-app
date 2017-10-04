var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CuratedContent = new Schema({
	loc: {
		type: [Number],
		index: '2d'
	},
	address: {
		type: String
	},
	category:{
		type: String,
		default: 'mural'
	},
	fsPicturePath: {
		type: String
	},
	src: {
		type: String
	},
	hits: {
		type: Number
	},
	lat: {
		type: String
	},
	lng: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});


CuratedContent.pre('save', function(next, done) {
	done.loc = [done.lat, done.lng];
	//console.log('pre save; next: ', next,' done: ', done);
	next();
});

/*CuratedContent.methods.findClosest = function(cb) {
	return this.model('CuratedContent').find({
		loc: {$nearSphere: this.loc}
	}).limit(1).exec(cb);
};*/

CuratedContent.methods.findClosest = function(lat, lng) {
	return this.model('CuratedContent').find({
		loc: {$nearSphere: [lat, lng]}
	}).limit(1).exec();
};


module.exports = mongoose.model("CuratedContent", CuratedContent);