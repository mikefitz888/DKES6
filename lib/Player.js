import Character from './Character';
export default class Player extends Character {
	constructor(map){
		super(map);
	}

	initControls(){
		document.addEventListener('keyup', function(e){
			var keycode = e.keyCode();
			console.log(e);
		});
	}
}