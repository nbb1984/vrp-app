var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var CuratedContent = require('../models/curated');
var axios = require("axios");
var path = require("path");
var fs = require('fs');
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

router.get('/geoSearch/Favorites', (req, res) =>{
	res.json({
		"_id": "59ca9e313090c5265896900f",
		"email": "billy@thing.com",
		"username": "billybob",
		"password": "$2a$10$9U.MOmGeA2s2llR836BL5OaAfKy2Rw3ViUTvcrqP/0LIPNGt5eG7q",
		"__v": 0,
		"friends": [
		{
			"_id": "59ca9e053090c5265896900e",
			"email": "nickbole@thing.com",
			"username": "nickbole",
			"password": "$2a$10$rvKdPyOdbx2V6PuD.4C1FO4gJe3Uw6jnKt8FsBAjvDZxVwKzHrvdy",
			"__v": 0,
			"friends": [],
			"searches": [
				"59ca9fcde93d9838c8859219",
				"59cad7501c726213c0747acd",
				"59cad7ed1c726213c0747ace",
				"59cae49455a96639802111bd",
				"59cae66964415823b863761a",]
		}
	],
		"searches": [
		"59ca9fcde93d9838c8859219",
		"59cad7501c726213c0747acd",
		"59cad7ed1c726213c0747ace",
		"59cae49455a96639802111bd",
		"59cae66964415823b863761a",
		{
			"_id": "59cc221f2c339b2338ee119b",
			"query": "Wellington, Wellington City, New Zealand",
			"hits": 3,
			"__v": 0,
			"date": "2017-09-27T22:11:43.113Z"
		}
	]
	});
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
