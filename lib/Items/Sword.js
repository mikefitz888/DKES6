import Item from '../Item.js';
export default class Sword extends Item {
	constructor(container){
		super(container, ['hands']);
		this.takable = true;
		this.equippable = true;

		this.addHook('hands', 'attack', function(action){
			return function(attack, damage){
				alert('hooked');
				action(attack+2, damage);
			}
		});
	}
}