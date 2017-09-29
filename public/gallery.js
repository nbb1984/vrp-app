var thumbImages = [
	{image: "images/loaction_1.jpg", pos: "-2.74 3.3 -.9"},
	{image: "images/loaction_2.jpg", pos: "0 3.33 -.9"},
	{image: "images/loaction_3.jpg", pos: "2.76 3.32 -.9"},
	{image: "images/loaction_4.jpg", pos: "-2.78 1.6 -.7"},
	{image: "images/loaction_5.jpg", pos: "0 1.6 -.7"},
	{image: "images/loaction_6.jpg", pos: "0 -.06 -.5"},
	{image: "images/loaction_7.jpg", pos: "-2.84 -.06 -.5"},
	{image: "images/loaction_8.jpg", pos: "2.81 1.61 -.7"},
	{image: "images/loaction_9.jpg", pos: "2.86 -.06 -.5"}
];

var tileData = [
	"cubes", "city","sechelt","graf","one","cubes","city","sechelt","graf","one","cubes","city","sechelt","graf","one"
];


var tiles = [
	'<a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#graf" data-thumb="#graf-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#one" data-thumb="#one-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#graf" data-thumb="#graf-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#one" data-thumb="#one-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#graf" data-thumb="#graf-thumb"></a-entity>',
	'<a-entity template="src: #link" data-src="#one" data-thumb="#one-thumb"></a-entity>'
];

$(document).ready(function () {


	//thumbs(thumbImages);
	panels(tileData)
});


function thumbs(items, attach) {
	for (var i = 0; i < items.length; i++) {
		var pos = {x: 0, y:0, z: 0};
		var phiAng = i * 0.1 + Math.PI;
		pos.x = .1 * Math.sin(phiAng);
		pos.y = -1;
		pos.z = .1 * Math.cos(phiAng);
		var posString = pos.x +" "+ pos.y + " " + pos.z;
		$('a-entity#sky').append('<a-sky id="loc_' + i + '" data-array-link-id="loc_' + i + '" data-array="room" src="' + items[i].image + '" visible="true" rotation="0 -90 0"></a-sky>');
		$('a-entity#NavThumbs').append('<a-plane><a-image id="loc_' + i + '_thumb" data-array-link="loc_' + i + '" data-is-room-button-for="navclick" data-array-poi-link="panelhide" data-poi-array="panelhide" opacity="0" rotation="-10 0 0" width="12" height="6" position="'+ posString +'" scale="0.2 0.2 0.2"></a-image></a-plane>')
	}
}



function panels(items, attach) {
	for (var i = 0; i < items.length; i++) {
		var pos = {x: 0, y:0, z: 0};
		var phiAng = i * 0.1 + Math.PI;
		pos.x = .1 * Math.sin(phiAng);
		pos.y = -1;
		pos.z = .1 * Math.cos(phiAng);
		var posString = pos.x +" "+ pos.y + " " + pos.z;
		$('a-entity#links').append('<a-entity template="src: #link" data-src="#'+ items[i] +'" data-thumb="#'+ items[i] +'-thumb" position="'+posString+'"></a-entity>')
	}
}