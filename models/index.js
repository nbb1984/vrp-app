var express = require('express');
var router = express.Router();


// Get Homepage 
router.get('/', function(req, res) {
	// Needs code here to render the homepage
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	} else {
		//code here to send the user to the login page
	}
});

module.exports = router;