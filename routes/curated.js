var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var CuratedContent = require('../models/curated');
var axios = require("axios");
var path = require("path");
var geocode = require("./geocode.js");
var loadPhoto = require("./fileRetrieve.js");
var Readable = require('stream').Readable;

module.exports = router;


router.get('/geoSearch/All', (req, res) => {
	CuratedContent.find()
		.exec()
		.then(response => {
			res.json(response);
		})
});

router.get('/geoSearch/Categories/:cat', (req, res) =>{
	console.log('category', req.params.cat);
	switch(req.params.cat){
		case 'mural':
			res.json([
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_6.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc1.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc9.jpg", address: ""}
			]);
			break;
		case 'art':
			res.json([
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc9.jpg", address: ""}
			]);
			break;
		case 'building':
			res.json([
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc9.jpg", address: ""}
			]);
			break;
		case 'cities':
			res.json([
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_3.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loaction_6.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc1.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc2.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc4.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc5.jpg", address: ""},
				{lat: 20, lng: 20, src: "thumbnails/images/loc9.jpg", address: ""}
			]);
			break;
		case 'video':
			break;
		default:
			break;
	}
});

router.post('/geoSearch', (req, res) => {
	var newThing = new CuratedContent({
		address: req.body.address,
		lat: req.body.lat,
		lng: req.body.lng,
		category: req.body.cat,
		src: req.body.src
	})
		.save()
		.then((response) => {
			console.log(response);
			res.json({ok: true});
		});
});


function saveContent(content) {
	var newThing = new CuratedContent(content);
	return newThing

};
