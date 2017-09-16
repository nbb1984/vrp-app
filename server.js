// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongo = require("mongodb");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// Create Instance of Express
var app = express();

var users = require("./routes/users");
var routes = require("./routes/index");
// Require History Schema
var User = require("./models/user");
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
app.use(cookieParser());

// -------------------------------------------------
// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/vrp-app");
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/', users);
// // -------------------------------------------------
// Main "/" Route. This will redirect the user to our rendered React application
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });
// // This is the route we will send GET requests to retrieve our most recent search data.
// // We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {
	console.log('got this far');
  // We will find all the records, sort it in descending order, then limit the records to 5
  User.findOne({})

  .exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});



// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});



