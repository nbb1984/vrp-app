var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var User = require('../models/user');
var Search = require('../models/searches');
var axios = require("axios");
var path = require("path");
var geocode = require("./geocode.js");
var loadPhoto = require("./fileRetrieve.js");


// Register User 
router.post('/registerUser', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    User.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (user) {
            return res.json([{ param: 'username', msg: 'Username already exists' }]);
        } else {

            // Validation
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password', 'Password must be at least six characters and must not contain any special characters and must contain at least one number, one capital letter, and one lower case letter').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

            var errors = req.validationErrors();

            if (errors) {
                res.json(errors);


            } else {
                var newUser = new User({
                    email: email,
                    username: username,
                    password: password
                });

                User.createUser(newUser, function(err, user) {
                    if (err) throw err;
                })

                req.flash('success_msg', 'You are registered and can now login');
                res.status(200);
                res.redirect('/login?success');

            }
        }
    });
});


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) {
                    console.log("error here");
                    throw err;
                }

                if (isMatch) {
                    return done(null, user);
                } else {
                    console.log("no match!!!!!!");
                    return done(null, false, { message: 'Unknown Password' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.get("/userData", function(req, res) {
    console.log(req.user);
    var userObject = req.user;
    var id = req.user._id;
    var username = req.user.username;
    var email = req.user.email;
    var searches = req.user.searches;
    var user;
    var myfriends = [];

    User.findOne({ "_id": req.user._id })
        // ..and populate all of the Searchs associated with it
        .populate("searches")
        .populate("friends")
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                console.log(doc.friends);
                var result = doc.friends;
                for (var i = 0; i < result.length; i++) {
                    myfriends.push(User.findOne({ "_id": result[i]._id })
                        .populate("searches")
                        .exec()
                    );
                }

                Promise.all(myfriends).then(response => {
                    res.json({ friends: response, user: doc });
                });

            }
        });
});


// Code for getting the popular search data.  
router.get("/searches", function(req, res) {

    Search.find({}).sort([
            ["hits", "descending"]
        ])
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

    geocode.getCoordsAndAddress(req.body.query, function(result) {
        var googlePicturePath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + result.coords + "%20CA&heading=151.78&pitch=-0.76&key=AIzaSyBh7H5H3lLRSftfGQAN7c8k18sFjYYB0Uw";
        Search
            .findOneAndUpdate({
                "address": result.address
            }, {
                $inc: { 'hits': 1 }
            })
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                if (!update) {
                  console.log("no result!!!!");
                  console.log(result.address);
                  console.log(result.coords);
                    // Create a new Search and pass the req.body to the entry
                    var fsPicPath = path.join(__dirname, '../public/images/' + result.coords + '.png');
                    var newSearch = new Search({
                        "address": result.address,
                        "fsPicturePath": fsPicPath,
                        "coords": result.coords,
                        "hits": 1
                    });
                    // And save the new Search the db
                    newSearch.save(function(error, doc) {
                        // Log any errors
                        if (!doc) {
                          console.log("this is really weird");
                          console.log(req.user);
                          console.log(error);
                        }
                        // Otherwise
                        else {
                          console.log("Why isn't this running?");
                            // Use the user id to find and update it's searches
                            User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "searches": doc._id } }, { new: true }, function(err, newdoc) {
                                // Send any errors to the browser
                                if (err) {
                                    res.send(err);
                                }
                                // Or send the new info about the user to the browser. 
                                else {
                                  console.log("newdoc coming!!!!!");
                                  console.log([newdoc, {coords: result.coords, address: result.address}]);
                                    res.json([newdoc, {coords: result.coords, address: result.address}]);
                                }
                            });
                        }
                        console.log("skipped the if/else");
                    });
                } else {
                  console.log("we got a result!!!!!!");
                  console.log(req.user._id);
                  console.log(update._id);
                    User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "searches": update._id } }, { new: true }, function(err, newdoc) {
                        // Send any errors to the browser
                        if (err) {
                            res.send(err);
                        }
                        // Or redirect to get the userdata again and reload. 
                        else {
                            console.log("newdoc coming!!!!");
                            console.log([newdoc, {coords: result.coords, address: result.address}]);
                            res.json([newdoc, {coords: result.coords, address: result.address}]);
                        }
                    });
                }

            });
    })


});

router.get("/save/photo/:coords/:address", function(req, res){
    loadPhoto.retrievePic(req.params.coords, req.params.address, function(fsPicPath){
      if (fsPicPath) {
        res.json({picturePath: fsPicPath, address: req.params.address});
      }
      else {
        res.send("There was an error loading the photo");
      }
    })
});

router.get("/delete/photo/:coords/:filePath", function(req, res){
  console.log(req.params.coords);
    loadPhoto.removePic(req.params.coords, req.params.filePath, function(result){
        res.json({ok: true, coords: result.coords, picturePath: result.path});
    })
});

router.get("/user/findall", function(req, res) {
    User.find({}).exec(function(err, result) {
        if (err) {
            throw err
        } else {
            return res.json(result);
        }
    });
});

// Create a new friend.
router.get("/user/addFriend/:id", function(req, res) {
    User.findOneAndUpdate({ "_id": req.user._id }, { $push: { "friends": req.params.id } }, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            return res.json(user);
        }
    });
});

// Code to untag a search.  
router.get("/search/delete/:id", function(req, res) {
    var id = req.params.id;
    // Use the article id to find and delete it's Search
    User.findOneAndUpdate({ "_id": req.user._id }, { $pull: { "searches": req.params.id } }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
            res.send(err);
        }
        // Or send the newdoc to the browser
        else {
            return res.redirect("/userData");
        }
    });
});



router.post('/loginUser',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?error', failureFlash: true }),
    function(req, res) {
        res.redirect("/");
    });

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/login');
});

module.exports = router;