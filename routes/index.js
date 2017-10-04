var express = require('express');
var router = express.Router();
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log(req.body);
	res.redirect('/user');
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect("/login");
	}
}

module.exports = router;