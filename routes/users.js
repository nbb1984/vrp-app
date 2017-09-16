var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.redirect('/register');
});

//Getting User Data
router.get('/userData/:user', function(req, res){
	console.log("getting user");
  var query = {username: req.params.user};
  User.findOne(query).exec(function(err, doc){
  	res.json(doc);
  });
});

// Register User
router.post('/registerUser', function(req, res){
	console.log("register user backend");
	
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	if(errors){
		res.json(errors);
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
				req.flash('success_msg', 'You are registered and can now login');	
				res.json(user);		
		});

		
		console.log('redirecting!!!!!');

	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){ 
      return done(null, false, {message: 'User not found'});
   	}

   	console.log("found a user?????")
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) {
   			console.log("error here");
   			throw err;
   		}

   		if(isMatch){
   			console.log("user matched!!!!!!!!!!");
   			console.log(user);
   			return done(null, user);
   		} else {
   			console.log("no match!!!!!!");
   			return done(null, false, {message: 'Unknown Password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
	console.log("user serialized");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
  	console.log("user deserializeUser");
  	console.log(err);
    done(err, user);
  });
});

router.post('/loginUser',
  passport.authenticate('local'),
  function(req, res) {
  	if (req.user){
  		return res.send(req.user);
  	}
  	else {
	    res.send("Username and/or password were invalid");
  	}
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	//res.redirect('/login');
});

module.exports = router;