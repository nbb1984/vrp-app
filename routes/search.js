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

module.exports = router;