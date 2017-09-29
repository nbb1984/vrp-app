var express = require('express');
var router = express.Router();
console.log("index js ran");
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log("dasjlfkasdj;flka");
	console.log(req.body);
	res.redirect('/search');
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		res.redirect("/login");
	}
}

module.exports = router;