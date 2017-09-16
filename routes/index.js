var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/getuserpage', ensureAuthenticated, function(req, res){
	//res.redirect('/userpage');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		return;
	}
}

module.exports = router;