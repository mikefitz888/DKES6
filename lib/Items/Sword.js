import Item from '../Item.js';
export default class Sword extends Item {
	constructor(container){
		super(container, ['hands']);
		this.takable = true;
		this.equippable = true;

		addHook('hands', 'attack', function(action){
			return function(attack, damage){
				alert('hooked');
				action(attack, damage);
			}
		});
	}
}