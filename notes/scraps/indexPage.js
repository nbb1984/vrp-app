module.exports = {
	menuItems: [
		{
			id: "BlackBottomCircle",
			element: "a-image",
			class: "clickable",
			src: "assets/images/ui/BlackCircle.png",
			scale: {x: 30, y: 30, z: 30},
			position: {x: 0, y: -28, z: 0},
			rotation: {x: -90, y: 0, z: 0}
		},
		{
			id: "navcubeRot",
			element: "a-image",
			class: "clickable",
			"data-for": "toggle",
			"data-object": "helpInfo",
			"data-target": "helpLink",
			src: "assets/thumbs/thumb-explore.png",
			position: {x: -1.6, y: -2, z: -3.8},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.5,
			height: 0.5
		},
		{
			id: "HelpNav",
			element: "a-image",
			class: "clickable",
			"data-for": "toggle",
			"data-object": "helpInfo",
			"data-target": "helpLink",
			src: "assets/thumbs/thumb-help.png",
			position: {x: 1.6, y: -2, z: -3.8},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.5,
			height: 0.5
		},
		{
			id: "searcj_rot",
			element: "a-image",
			class: "clickable",
			src: "assets/thumbs/thumb-search.png",
			position: {x: -0.8, y: -2, z: -3.8},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.5,
			height: 0.5
		},
		{
			id: "profile_rot",
			element: "a-image",
			class: "clickable",
			src: "assets/thumbs/thumb-Profile.png",
			position: {x: 0, y: -2, z: -3.8},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.5,
			height: 0.5
		},
		{
			id: "myPassport_rot",
			element: "a-image",
			class: "clickable",
			src: "assets/thumbs/thumb-myPassport.png",
			position: {x: .8, y: -2, z: -3.80},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.5,
			height: 0.5
		}
	],
	helpInfo: [{
		id: "helpLink",
		element: "a-image",
		visible: "true",
		src: "assets/ui/HelpMenu.png",
		position: {x: 0, y: 0, z: -6.32},
		rotation: {x: -10, y: 0, z: 0},
		width: 8,
		height: 4.1,
		material: {
			shader: "flat",
			opacity: 1,
			color: "#fff"
		}
	},
		{
			id: "helpLink",
			element: "a-image",
			visible: "true",
			class: "clickable",
			"data-for": "close",
			"data-object": "helpInfo",
			"data-target": "helpLink",
			src: "assets/ui/x_out_24px.png",
			position: {x: 0, y: -0.8, z: -4},
			rotation: {x: -10, y: 0, z: 0},
			width: 0.6,
			height: 0.6
		}],
	indexExplore: {
		nestedInstructions: {
			root: "this", // selector for root to build children into or this if it will be the main container
			rootedTo: "a-scene",
			depth: 1, // zero indexed;
			level0: {
				root: "indexExplore",
				content: "indexExploreBkgrnd"
			},
			level1: {
				root: "indexExploreContainer",
				content: "indexExploreContent"
			}
		},
		id: "thumbMenu",
		element: "a-entity",
		/*linked: false,
		href: "",*/
		/*	class: "clickable",*/
		visible: "true",
		//scale: {x: 0.75, y: 0.75, z: 0.75},
		position: {x: 0, y: -0.8, z: -5},
		rotation: {x: -10, y: 0, z: 0},
		//width: 9,
		//height: 6
	},
	// data-array-link-id="nav" data-array="ui" data-is-receiver-for="closenav"
	// data-is-room-receiver-for="navclick" visible="false" position="0 -.8 -5" rotation="-10 0 0"
	indexExploreBkgrnd: [{
		// <a-image src="assets/ui/RoomMenu.png" width="9" height="6" position="0 .78 -1.08" scale=".75 .75 .75"></a-image>
		id: "bkgrnd",
		element: "a-image",
		/*linked: false,
		href: "",*/
		/*	class: "clickable",*/
		visible: "true",
		src: "assets/ui/RoomMenu.png",
		scale: {x: 0.75, y: 0.75, z: 0.75},
		position: {x: 0, y: 0.78, z: -1.08},
		rotation: {x: -10, y: 0, z: 0},
		width: 9,
		height: 6
	}],
	indexExploreContainer: {
		id: "NavThumbs",
		element: "a-entity",
		/*linked: false,
		href: "",
		class: "",*/
		visible: "true",
		/*src: "",*/
		scale: {x: 0.9, y: 0.9, z: 0.9},
		position: {x: 0, y: -1.6, z: .8},
		rotation: {x: 10, y: 0, z: 0},
		width: 0,
		height: 0
	},
	indexExploreContent: [
		{
			//id: "loc_1",
			id: "NavThumbs",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_1.jpg",
			},
			src: "assets/images/loaction_1.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: -2.74, y: 3.3, z: -0.9},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			//id: "loc_4",
			id: "NavThumbs",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_4.jpg",

			},
			src: "assets/images/loaction_4.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: -2.78, y: 1.6, z: -0.7},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			id: "NavThumbs",
			//id: "loc_7",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_7.jpg",

			},
			src: "assets/images/loaction_7.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: -2.84, y: -.06, z: -0.5},
			rotation: {x: -10, y: 0, z: 0},
			width: 12.2,
			height: 6
		},
		{
			id: "NavThumbs",
			//id: "loc_2",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_2.jpg",

			},
			src: "assets/images/loaction_2.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 0, y: 3.33, z: -0.9},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			id: "NavThumbs",
			//id: "loc_5",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_5.jpg",

			},
			src: "assets/images/loaction_5.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 0, y: 1.6, z: -0.7},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			id: "NavThumbs",
			//id: "loc_8",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_8.jpg",

			},
			src: "assets/images/loaction_8.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 0, y: -.06, z: -0.5},
			rotation: {x: -10, y: 0, z: 0},
			width: 12.2,
			height: 6
		},
		{
			//id: "loc_3",
			id: "NavThumbs",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_3.jpg",

			},
			src: "assets/images/loaction_3.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 2.76, y: 3.32, z: -0.9},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			//id: "loc_6",
			id: "NavThumbs",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_6.jpg",

			},
			src: "assets/images/loaction_6.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 2.81, y: 1.61, z: -0.7},
			rotation: {x: -10, y: 0, z: 0},
			width: 12,
			height: 6
		},
		{
			//id: "loc_9",
			id: "NavThumbs",
			/*linked: false,
			href: "",*/
			class: "clickable",
			element: "a-plane",
			"data-for": "close set",
			"data-object": "helpInfo",
			"data-target-close": "NavThumbs",
			"data-target-set": "image-360",
			visible: "true",
			"set-image": {
				on: "click",
				target: "#image-360",
				src: "assets/images/loaction_9.jpg",

			},
			src: "assets/images/loaction_9.jpg",
			scale: {x: 0.2, y: 0.2, z: 0.2},
			position: {x: 2.86, y: -0.06, z: -0.5},
			rotation: {x: -10, y: 0, z: 0},
			width: 12.2,
			height: 6
		}
	]
};