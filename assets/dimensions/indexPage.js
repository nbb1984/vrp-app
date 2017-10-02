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
		//	"data-object": "indexExplore",
			"data-object": "NavThumbs",
			"data-target": "NavThumbs",
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
			"data-object": "helpLink",
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
	helpLink: [{
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

	NavThumbs: {
		id: "NavThumbs",
		element: "a-entity",
		visible: "true",
		position: {x: 0, y: 0, z: -6},
		rotation: {x: -10, y: 0, z: 0},
		content: [
			{
				id: "NavThumbs",
				element: "a-plane",
				material: {
					color: "#4F4F4F"
				},
				geometry: {
					primitive: "plane"
				},
				transparent: "true",
				opacity: .08,
				width: 7.5,
				height: 3.75

			},

		]
	},
	indexExplore: [
		{
			id: "NavThumbs",
			name: "loc1",
			element: "a-entity",
			position: {x: -2.5, y: 0, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "one",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc2",
			element: "a-entity",
			position: {x: -2.5, y: 1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "two",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc3",
			element: "a-entity",
			position: {x: -2.5, y: -1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "three",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc4",
			element: "a-entity",
			position: {x: 0, y: 1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "four",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc5",
			element: "a-entity",
			position: {x: 0, y: 0, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "five",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc6",
			element: "a-entity",
			position: {x: 0, y: -1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "six",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc7",
			element: "a-entity",
			position: {x: 2.5, y: 1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "seven",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc8",
			element: "a-entity",
			position: {x: 2.5, y: 0, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "eight",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		},
		{
			id: "NavThumbs",
			name: "loc9",
			element: "a-entity",
			position: {x: 2.5, y: -1.25, Z: .01},
			contents: [
				{
					class: "clickable",
					element: "a-image",
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
					src: "thumbnails/images/loaction_9.jpg",
					width: 2,
					height: 1
				},
				{
					element: "a-entity",
					text: {
						value: "nine",
						align: "center",
						anchor: "center",
						baseline: "center",
						wrapCount: 5
					}
				}
			]
		}
	]
};