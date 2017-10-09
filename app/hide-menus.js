AFRAME.registerComponent('hideMenus', {
	schema: {},
	init: function () {},
	update: function(){},
	remove: function(){},
	tick: function(time, timeDelta){},
	pause: function(){},
	play: function(){},
	updateSchema: function(data){}
});

AFRAME.registerSystem('hideMenus', {
	schema: {},
	init: function () {},
	hideMenus: function (event) {
		console.log('submit click');

		var elements = document.querySelectorAll('[hideMenus]');
		for(var i=0; i<elements.length; i++){
			elements[i].setAttribute('visible', 'false');
		}


		var cursor = document.querySelector('[raycaster]');
		cursor.setAttribute('raycaster', 'objects', '.showIcons');
		console.log(cursor.components);

		var showContainer = document.createElement('a-entity');
		showContainer.setAttribute('id', 'showAgain');
		showContainer.setAttribute('position', '0 -2.5 -3.08');

		var showText = document.createElement('a-text');
		showText.setAttribute('value', 'Show Menus and Icons');
		showText.setAttribute('position', '-1 -1 0');
		showText.setAttribute('text', 'height: 3;');


		var showItems = document.createElement('a-image');
		showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
		showItems.setAttribute('class', 'showIcons');
		showItems.setAttribute('position', '0 -0.5 0');
		showItems.addEventListener('click', function (evt) {
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.clickable');

			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'true');

			var menu = document.querySelector('a-router');
			menu.setAttribute('visible', 'true');

			var show = document.querySelector('a-entity#showAgain');
			show.parentNode.removeChild(show);
		});
		showContainer.appendChild(showText);
		showContainer.appendChild(showItems);
		this.el.appendChild(showContainer);
	},
	update: function(){},
	remove: function(){},
	tick: function(time, timeDelta){},
	pause: function(){},
	play: function(){},
	updateSchema: function(data){}
});