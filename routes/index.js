var express = require('express');
var pathHelper = require('../pathHelper');
var router = express.Router();
console.log("index js ran");
// Get Homepage
/*router.get('/', ensureAuthenticated, function(req, res){
	console.log("dasjlfkasdj;flka");
	console.log(req.body);
	res.redirect('/search'); //todo determinethe landing page
});*/

router.get("/login-success", (req, res) => {
	res.json({ok: true})
});

router.get("/login-failure", (req, res) => {
	res.json({ok: false})
});

router.get("/register-success", (req, res) => {
	res.json({ok: true})
});


/*router.get("/register", function (req, res) {
	console.log("go to registration");
	res.sendFile(pathHelper._root + "/public/registration.html");
});

router.get("/login?success", function (req, res) {
	console.log("anything happen?");
	console.log(__dirname);
	res.sendFile(pathHelper._root + "/public/login.html");
});

router.get("/login", function (req, res) {
	console.log(__dirname + "/public/login.html");
	res.sendFile(pathHelper._root + "/public/login.html");
});
router.get("/user", function (req, res) {
	console.log(__dirname + "/public/index2.html");
	res.sendFile(pathHelper._root + "/public/index2.html");
});*/


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