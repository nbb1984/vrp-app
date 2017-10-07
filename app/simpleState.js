

// simpleStateThing
(function (window){
	if(typeof window !== 'undefined' && window._ !== undefined){
		if(window.simpleState === undefined){
			return window.simpleState = {
				stateThingWithLongName: {},
				state: function(state){
					if(_.has(window.simpleState.stateThingWithLongName, state)){
						return window.simpleState.stateThingWithLongName[state];
					}
				},
				update: function(stateThing){
					window.simpleState.stateThingWithLongName = Object.assign({}, window.simpleState.stateThingWithLongName, stateThing);
				}
			};
		}
	}
})(window);


module.exports = window.simpleState;