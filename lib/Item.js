import GObject from './GObject.js';
export default class Item extends GObject {
	constructor(container, slot=[]){
		super();
		this.slot = slot; //List of slots (strings) in which the item can be worn
		this.inSlot; //String of the slot in which the item is contained
		this.container = container;
		container.contents.push(this);

		//Default Settings
		this.equippable = false;
		this.removable = true;
		this.takable = false;
		this.droppable = true;

		this.hooks = new Map();
	}

	canBeEquippedBy(character){
		return this.equippable;
	}

	canBeRemovedBy(character){
		return this.removable;
	}

	canBeTakenBy(character){
		return this.takable;
	}

	canBeDroppedBy(character){
		return this.droppable;
	}

	canBeUsedByOn(character, target){
		return false;
	}

	interact(target){
		//do nothing
	}

	//Core methods
	applyHooks(target, slot_name){
		if(this.hooks.has(slot_name)){
			for(hook in this.hooks.get(slot_name)){
				target.addHook(hook.action, hook.callback);
			}
		}
	}

	removeHooks(target, slot_name){
		if(this.hooks.has(slot_name)){
			for(hook in this.hooks.get(slot_name)){
				target.removeHook(hook.action, hook.callback);
			}
		}
	}

	addHook(slot_name, action, callback){
		if(this.hooks.has(slot_name)){
			this.hooks.get(slot_name).push({action, callback});
		}else{
			this.hooks.set(slot_name, [{action, callback}]);
		}
	}

	moveTo(destination){
		this.container.contents.remove(this);	
		destination.contents.push(this);
		this.container = destination;
	}
}