// Include Server Dependencies
var dotenv = require('dotenv');
dotenv.load();
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var serveStatic = require('serve-static');
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var path = require('path');
var axios = require('axios');
// Create Instance of Express
var app = express();

var exphbs = require('express-handlebars');


var users = require("./routes/users");
var routes = require("./routes/index");
var content = require("./routes/content");
var searches = require('./routes/searchRoutes');
var curated = require('./routes/curated');
var pageDetails = require('./routes/pageDetails');
// Require History Schema
var User = require("./models/user");
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 9000;

app.set('views', './public');
app.engine('hbs', exphbs({
	//defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/images", serveStatic(path.join(__dirname, "/images/")));
app.use("/assets", serveStatic(path.join(__dirname, "/assets/")));
app.use("/img", serveStatic(path.join(__dirname, "/img/")));
app.use("/components", serveStatic(path.join(__dirname, "/components/")));
app.use("/lib", serveStatic(path.join(__dirname, "/lib/")));
app.use("/public/", serveStatic(path.join(__dirname, "/public/")));
app.use("/js", serveStatic(path.join(__dirname, "/public/js/")));

// -------------------------------------------------
let db = require('./database');
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
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.')
			, root = namespace.shift()
			, formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
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
	console.log("something labeled as global response object");
	next();
});

// // -------------------------------------------------
console.log("server js ran");


// // This is the route we will send GET requests to retrieve our most recent search data.
// // We will call this route the moment our page gets rendered


app.use('/', routes);  // temporary disable for dev
app.use('/', searches);
app.use('/', curated);
app.use('/', users);
app.use('/', content);
app.use('/', pageDetails);

// -------------------------------------------------
// Listener
app.listen(PORT, function () {
	console.log("App listening on PORT: " + PORT);
});



