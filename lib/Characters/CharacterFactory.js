import NPC from '../NPC.js';

var characters = {};
characters['Test'] = class Test extends NPC {
	constructor(map){
		super(map);
	}
}

//Classes are not hoisted, must be declared before the factory
export function CharacterFactory(type){ //pass in map as 'this'
	return new characters[type](this);
}