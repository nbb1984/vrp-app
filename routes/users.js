var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var User = require('../models/user');
var Search = require('../models/searches');

var mockData = require('../assets/dataMock');

// Register User
router.post('/registerUser', function(req, res){
	console.log("register user backend");
  console.log(req.body);
	
  var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(user){ 
      return res.json({ok: false,  errors: [{param: 'username', msg: 'Username already exists'}]});
    } else {

    	// Validation
      req.checkBody('username', 'Username is required').notEmpty();
    	//req.checkBody('email', 'Email is required').notEmpty();
    	//req.checkBody('email', 'Email is not valid').isEmail();
    	req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password', 'Password must be at least six characters and must contain at least one number, one capital letter, and one lower case letter.  Cannot contain a special character.').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
    	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    	var errors = req.validationErrors();

    	if(errors){
        console.log(errors);

        res.json({ok: false, errors});


    	} else {
        console.log("registered!!!!!!!!!!!!!!!!!!!!!!");
    		var newUser = new User({
    			email: email,
    			username: username,
    			password: password
    		});

    		User.createUser(newUser, function(err, user){
    			if(err) throw err;
          console.log(user);
    		})

        req.flash('success_msg', 'You are registered and can now login');
        res.status(200);
        res.redirect('/register-success'); // sends the file to the frontend, but does not trigger window.location to change

      }
	 }
  });
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
  console.log(user.id);
  console.log("user serialized");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {

  	console.log(err);
    done(err, user);
  });
});

router.get("/userData", function(req, res) {

	//res.json(mockData.userData);
	// below temporary commented out for easier dev usage
  console.log("got this");
  console.log(req.user);
  console.log("got this");
  var id = req.user._id;
  console.log(id);
  var username = req.user.username; 
  var email = req.user.email; 
  var searches = req.user.searches;
  console.log(id);
  User.findOne({ "_id": req.user._id })
    // ..and populate all of the Searchs associated with it
    .populate("searches") 
    .populate("friends")
    // now, execute our query
    .exec(function(error, doc) {
      // Log any errors
      console.log("Got em!!!!!!!!!!!!!!!!!!!!");
      console.log(doc);
      console.log("Got em!!!!!!!!!!!!!!!!!!!!")
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
  });

// Code for getting the popular search data.  
router.get("/searches", function(req, res) {
  Search.find({}).sort([
    ["hits", "descending"]
  ]).limit(5)
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
  });
// Create a new Search or replace an existing Search
router.post("/user/search", function(req, res) {
  console.log(req.body);
  Search.findOne({ "query": req.body.query }, function(result) {
    if (result) {
      console.log(result)
      var hits = result.hits;
      hits++;
      Search.findOneAndUpdate({ "_id": result._id }, {"hits": hits}, function(searches){
        if (error) {
          console.log(error);
        } 
        else {
          return res.json(searches);
        }       
      });
    } 

    else {
      // Create a new Search and pass the req.body to the entry
      var newSearch = new Search(req.body);
      console.log("Req.body:");
      console.log(req.body);
      // And save the new Search the db
      newSearch.save(function(error, doc) {
        // Log any errors
        if (error) {
          console.log(error);
        }
        // Otherwise
        else {
          // Use the article id to find and update it's Search
           User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "searches": doc._id } }, { new: true }, function(err, newdoc) {
                // Send any errors to the browser
                if (err) {
                  res.send(err);
                }
                // Or send the newdoc to the browser
                else {
                  console.log('this happened');
                  return res.json(newdoc);
                }
            });
          }
        });      
        }
      })

  });

router.get("/user/findall", function(req, res) {
  User.find({}).exec(function(err, result) {
      if (err){
        throw err
      }
      else {
        return res.json(result);
      }
  });
});

// Create a new Search or replace an existing Search
router.get("/user/addFriend/:id", function(req, res) {
  console.log(req.body);
      User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "friends": req.params.id } }, function(err, user){
        if (err) {
          console.log(err);
        } 
        else {
          return res.json(user);
        }       
      });
    }); 


// Code to untag a search.  
router.get("/search/delete/:id/:userId", function(req, res) {
      var id = req.params.id;
      // Use the article id to find and delete it's Search
       User.findOneAndUpdate({ "_id": req.params.userId }, { $pull: { "searches": req.params.id } }, function(err, newdoc) {
            // Send any errors to the browser
            if (err) {
              res.send(err);
            }
            // Or send the newdoc to the browser
            else {
              console.log('this happened');
              return res.json(newdoc);
            }
        });
    });



router.post('/loginUser',
  passport.authenticate('local', {successRedirect:'/login-success', failureRedirect:'/login-failure', failureFlash: true}),
  function(req, res) {
	console.log('login user callback');

	    res.redirect("/login?failure");
  });

router.get('/logout', function(req, res){
	req.logout();
  console.log("You are logged out!!!!!!!!!!");
	req.flash('success_msg', 'You are logged out');

	res.json({ok: true})
	//res.redirect('/login');
});

module.exports = router;