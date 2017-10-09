

module.exports = function(errorMessages){
	var messageContainer, msgPlane;
	var router = document.querySelector('a-router');
	var priorError = document.querySelector('a-entity#errorMsg');
	if(priorError){
		priorError.parentNode.removeChild(priorError);
	}

	if(Array.isArray(errorMessages)){
		//function (errorArray) {
		messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		for (var i = 0; i < errorMessages.length; i++) {
			console.log(errorMessages[i].msg);
			msgPlane = document.createElement('a-entity');
			msgPlane.setAttribute('zOffset', '0.01');
			msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
			msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
			msgPlane.setAttribute('text', "value:" + errorMessages[i].msg + "; color: white");
			msgPlane.setAttribute('position', {x: 7, y: i, z: -4});
			msgPlane.setAttribute('rotation', {x: -10, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
		}
		router.appendChild(messageContainer);
		//}
	} else {

		messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		console.log(errorMessages);
		msgPlane = document.createElement('a-entity');
		msgPlane.setAttribute('zOffset', '0.01');
		msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
		msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
		msgPlane.setAttribute('text', "value:" + errorMessages + "; color: white");
		msgPlane.setAttribute('position', {x: 7, y: 0, z: -4});
		msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
		messageContainer.appendChild(msgPlane);

		router.appendChild(messageContainer);
	}

};