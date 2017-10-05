var express = require('express');
var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
const url = require('url');
var router = express.Router();
console.log("index js ran");

var pathHelper = require('../pathHelper');
var mockData = require('../assets/dataMock');

/*

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		res.redirect("/login");
	}
}

// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
	console.log("dasjlfkasdj;flka");
	console.log(req.body);
	res.redirect('/login');
});
*/

var options = {
	root: path.join(pathHelper._root + "/public/"),
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

router.get('/', (req, res) => {
	res.sendFile("login.html", options)
});

router.get('/compDetails/:comp', (req, res) => {
	var basePath = "assets/ui/";
	switch (req.params.comp) {
		case 'nav':

		function selectorBuild(event) {
			var initialSelected = event.detail.target.parentEl.getAttribute('comp').initialSelected;
			if (event.detail.target.id === initialSelected) {
				var selected = event.detail.target.getAttribute('position');
				var position = {
					x: selected.x,
					y: selected.y,
					z: selected.z - 0.02
				};
				var highlighter = document.querySelector('a-ring#selectedhighlighter');
				highlighter.setAttribute('position', position);
			}
		};

		function selectorMove(event) {
			console.log(event);
			var selected = event.detail.target.getAttribute('position');
			event.detail.target.emit('displayNewScene', {newScene: event.detail.target.id}, true);
			var position = {
				x: selected.x,
				y: selected.y,
				z: selected.z - 0.02
			};
			var highlighter = document.querySelector('a-ring#selectedhighlighter');
			//var priorPage = highlighter.getAttribute('data-current');
			highlighter.setAttribute('position', position);
			//highlighter.setAttribute('data-current', btns[indexSelected].comp);
		}


			res.json({
				exclude: ['page'], details: [
					{
						id: "explore",
						"data-page": "explore",
						element: "a-image",
						src: basePath + "explore.png",
						class: "clickable",
						events: [{trigger: 'click', handler: selectorMove.toString()},
							{trigger: 'loaded', handler: selectorBuild.toString()}],
						width: 0.5,
						height: 0.5,
						position: {x: -1.6, y: -2, z: -3.8}
					},
					{
						id: "help",
						"data-page": "help",
						element: "a-image",
						src: basePath + "help.png",
						class: "clickable",
						events: [{trigger: 'click', handler: selectorMove.toString()},
							{trigger: 'loaded', handler: selectorBuild.toString()}],
						width: 0.5,
						height: 0.5,
						position: {x: 1.6, y: -2, z: -3.8}
					},
					{
						id: "search",
						"data-page": "search",
						element: "a-image",
						src: basePath + "search.png",
						class: "clickable",
						events: [{trigger: 'click', handler: selectorMove.toString()},
							{trigger: 'loaded', handler: selectorBuild.toString()}],
						width: 0.5,
						height: 0.5,
						position: {x: -0.8, y: -2, z: -3.8}
					},
					{
						id: "profile",
						"data-page": "profile",
						element: "a-image",
						src: basePath + "Profile.png",
						class: "clickable",
						events: [{trigger: 'click', handler: selectorMove.toString()},
							{trigger: 'loaded', handler: selectorBuild.toString()}],
						width: 0.5,
						height: 0.5,
						position: {x: 0, y: -2, z: -3.8}
					},
					{
						id: "profile-expanded",
						"data-page": "profile-expanded",
						element: "a-image",
						src: basePath + "myPassport.png",
						class: "clickable",
						events: [{trigger: 'click', handler: selectorMove.toString()},
							{trigger: 'loaded', handler: selectorBuild.toString()}],
						width: 0.5,
						height: 0.5,
						position: {x: .8, y: -2, z: -3.80}
					},
					{
						id: 'selectedhighlighter',
						element: "a-ring",
						"radius-outer": 0.3,
						"radius-inner": 0.25,
						color: 'teal',

					}
					/*
								selected.setAttribute('radius-inner', width/2);
				selected.setAttribute('radius-outer', (width + 0.1)/2);
				selected.setAttribute('color', 'teal');
				//selected.setAttribute('data-current', btns[i].comp);
				selected.setAttribute('id', 'selectedHighlighter');
				selected.setAttribute("position", position);
					 */
				]
			});
			break;
		case 'explore':
			res.json({
				exclude: ['cat'], details: [
					{
						"data-cat": "art",
						element: "a-image",
						src: basePath + "art.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: -1.6, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "mural",
						element: "a-image",
						src: basePath + "mural.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: -0.8, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "building",
						element: "a-image",
						src: basePath + "building.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 0, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "cities",
						element: "a-image",
						src: basePath + "citys.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 0.8, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "video",
						element: "a-image",
						src: basePath + "video.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 1.6, y: -1.3, z: -4.1}
					},
					{
						id: 'catHighlighter',
						element: "a-ring",
						"radius-outer": 0.425,
						"radius-inner": 0.375,
						color: 'teal',

					}
				]
			});
			break;
		case 'help':
			// z-axis is being controlled via the root element (see nav.js)
			res.json({
				exclude: [],
				details: [
					{
						element: "a-image",
						src: basePath + "HelpMenu_ver1.png",
						class: "clickable",
						width: 10,
						height: 2,
						position: {x: -0.2, y: -0.5, z: 0}
					},
					{
						id: "userLogout",
						element: "a-image",
						src: basePath +"login_signup_Btn.png",
						class: "clickable",
						position: {x: 0, y: -2.2, z: 0}
					},
					{
						element: "a-text",
						value: "Hide Menus and Icons",
						position: {x: 2.2, y: -1.7, z: 0},
						text: {height: 3}
					},
					{
						id: "hideMenus",
						element: "a-image",
						src: basePath +"ic_visibility_off_black_48dp_2x.png",
						class: "clickable",
						//scale: {x: 1.5, y: 1.5, z: 1.5},
						position: {x: 3.5, y: -2.2, z: 0}
					}]
			});
			break;
		case 'search':
			res.json({
				exclude: ['item'], details: [
					{
						item: "input",
						element: "a-input",
						class: "clickable",
						placeholder: "Discover a location now.",
						width: 1,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						item: "text",
						element: "a-text",
						value: "Discover",
						position: {x: -1.176, y: -0.801, z: -2.944},
						text: {height: 3}
					},
					{
						item: "button",
						element: "a-button",
						class: "clickable",
						value: "search",
						name: "stuff",
						color: "white",
						position: {x: 0.337, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					/*{
						item: "mapBtn",
						element: 'a-button',
						class: 'clickable',
						value: 'show map',
						color: 'white',
						position: {x: 0.337, y: 0.075, z: -2.944},
						scale: {x: 2.0, y: 0.5, z: 0.8}
					}*/]
			});
			break;
		case 'login':
			res.json({
				exclude: [],
				details: [{
					element: "a-input",
					id: "username",
					class: "clickable",
					placeholder: "Username",
					color: "black",
					width: 1,
					position: {x: -1.2, y: -0.75, z: -2.944},
					scale: {x: 1.5, y: 1.5, z: 1.5}
				},
					{
						element: "a-input",
						id: "password",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						width: 1,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						element: "a-text",
						id: "",
						value: "Login",
						position: {x: -1.176, y: -0.45, z: -2.944},
						text: {height: 3}
					},
					{
						element: "a-button",
						id: "submit",
						class: "clickable",
						value: "Login",
						name: "stuff",
						color: "white",
						position: {x: 0.337, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						element: "a-button",
						id: "signupText",
						class: "clickable",
						value: "Sign Up",
						name: "stuff",
						color: "white",
						position: {x: 1.18, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						element: "a-text",
						value: " or Sign up, now.",
						position: {x: -0.53, y: -0.49, z: -2.944},
						text: {height: 1},
						scale: {x: 0.5, y: 0.5, z: 0.5}
					}]
			});
			break;
		case 'signup':
			res.json({
				exclude: [], details: [
					{
						id: "textLabel",
						element: 'a-text',
						value: 'Sign Up',
						text: {height: 3},
						position: {x: -1.176, y: -0.45, z: -2.944}
					},
					{
						id: "username",
						element: "a-input",
						class: "clickable",
						placeholder: "Username",
						color: "black",
						width: 0.6,
						position: {x: -1.2, y: -0.75, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "passOne",
						element: "a-input",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						color: 'black',
						width: 0.6,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "passTwo",
						element: "a-input",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						color: 'black',
						width: 0.6,
						position: {x: -0.230, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "submit",
						element: "a-button",
						class: "clickable",
						value: "Submit",
						name: "stuff",
						color: "white",
						position: {x: 0.736, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						id: "textLink",
						element: "a-text",
						class: "clickable",
						value: " or Login.",
						position: {x: -0.37, y: -0.49, z: -2.944},
						text: {height: 1},
						scale: {x: 0.5, y: 0.5, z: 0.5}
					},
				]
			});
			break;
		case 'profile-expanded':
			res.json([]);
			break;
		default:
			break;
	}
});


module.exports = router;


