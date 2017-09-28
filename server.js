// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongo = require("mongodb");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var serveStatic = require('serve-static');
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var path = require('path');
// Create Instance of Express
var app = express();

var basePath = path.resolve(__dirname, "..");

function pathHelper(path){
  return path.join(basePath, path);
}

function pathBack(path){

}

var users = require("./routes/users");
var routes = require("./routes/index");
// Require History Schema
var User = require("./models/user");
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 9000;
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/images", serveStatic(path.join(basePath,"/images/")));
app.use("/assets", serveStatic(path.join(basePath, "/assets/")));
app.use("/img", serveStatic(path.join(basePath, "/img/")));
app.use("/components", serveStatic(path.join(basePath, "/components/")));
app.use("/src", serveStatic(path.join(basePath,"/src/")));

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

// // -------------------------------------------------
console.log("server js ran");

app.get("/register", function(req, res) {
  console.log("go to registration");
  res.sendFile(__dirname + "/public/registration.html");
});

app.get("/login?success", function(req, res) {
  console.log("anything happen?");
  console.log(__dirname);
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/login", function(req, res) {
  console.log(__dirname + "/public/login.html");
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/user", function(req, res) {
  console.log(__dirname + "/public/index2.html");
  res.sendFile(__dirname + "/public/index2.html");
});





app.get('/', (req, res) => {

	var options = {
		root: __dirname,
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile("public/login.html", options)
});

app.get('/login', (req, res) => {

	var options = {
		root: __dirname,
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile("public/login.html", options)
});

app.get('/search', (req, res) => {

	var options = {
		root: __dirname,
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile("/public/search.html", options)
});

app.get('/signup', (req, res) => {

	var options = {
		root: __dirname,
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile("public/signup.html", options);
});
app.get('/gallery', (req, res) => {

	var options = {
		root: __dirname,
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile("public/gallery.html", options);
});
// // This is the route we will send GET requests to retrieve our most recent search data.
// // We will call this route the moment our page gets rendered


app.use('/', routes);
app.use('/', users);

// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});



