var express = require('express');
var pathHelper = require('../pathHelper');
var router = express.Router();
console.log("index js ran");


router.get("/login-success", (req, res) => {
	res.json({ok: true})
});

router.get("/login-failure", (req, res) => {
	res.json({ok: false})
});

router.get("/register-success", (req, res) => {
	res.json({ok: true})
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