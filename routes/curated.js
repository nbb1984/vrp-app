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

router.get('/geoSearch/Categories/:cat', (req, res) =>{
	console.log('category', req.params.cat);
	switch(req.params.cat){
		case 'mural':
			res.json([
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_1.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_2.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_3.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_4.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_5.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_6.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_7.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_8.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_9.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_10.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_11.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_12.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_13.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_14.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/mural/thumbnail_mural_15.png", address: ""},
			]);
			break;
		case 'art':
			res.json([
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_1.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_2.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_3.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_4.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_5.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_6.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_7.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_8.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_9.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/art/art_10.png", address: ""},
			]);
			break;
		case 'building':
			res.json([
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_1.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_2.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_3.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_4.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_5.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_6.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_7.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_8.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_9.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/building/thumbnail_building_10.png", address: ""},
			]);
			break;
		case 'cities':
			res.json([
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_1.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_2.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_3.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_4.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_5.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_6.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_7.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_8.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_9.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_10.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_11.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_12.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_13.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_14.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_15.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_16.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_17.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_18.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_19.png", address: ""},
				{lat: 20, lng: 20, src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/city-outdoor/thumbnail_city_20.png", address: ""},
			]);
			break;
		case 'video':
			res.json([
				{lat: 20, lng: 20,
					src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/video/thumbnail_Avengers.png",
					uri: "https://cdn.rawgit.com/wvazquez216/VRP_test_video/a52ed564/Battle_for_the_Avengers_Tower.mp4",
					address: ""},
				{lat: 20, lng: 20,
					src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/video/thumbnail_duck_tales.png",
					uri: "https://cdn.rawgit.com/wvazquez216/VRP_test_video/a52ed564/DuckTales.mp4",
					address: ""},
				{lat: 20, lng: 20,
					src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/video/thumbnail_Just_cause_video.png",
					uri: "https://cdn.rawgit.com/wvazquez216/VRP_test_video/a52ed564/JUST_CAUSE_3_Trailer.mp4",
					address: ""},
				{lat: 20, lng: 20,
					src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/video/thumbnail_rogue_one.png",
					uri: "https://cdn.rawgit.com/wvazquez216/VRP_test_video/a52ed564/Rogue_One_VR_Experience.mp4",
					address: ""},
				{lat: 20, lng: 20,
					src:"https://cdn.rawgit.com/SteveMieskoski/vrp-app_assets/master/video/thumbnail_SF.png",
					uri: "https://cdn.rawgit.com/wvazquez216/VRP_test_video/a52ed564/The_Martian_VR_Experience.mp4",
					address: ""},
			]);
			break;
		default:
			break;
	}
});
/*

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

*/
