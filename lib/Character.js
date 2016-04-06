const Direction = {
	east: 'east',
	west: 'west',
	north: 'north',
	south: 'south'
};

export default class Character {
	constructor(map) {
		//Positional settings
		this.x = map._start_point.x;
		this.y = map._start_point.y;
		this._map = map;
		this._map._character_set.push(this);
		this.container = map._map[this.x][this.y];
		
		this._hooks = new Map();//array of functions to call on action

		//Body settings by default, subclasses can override or extend this
		this._body_base = {
			head:[],
			neck:[],
			chest:[],
			hands:[],
			legs:[],
			feet:[],
			extra:[]
		}

		this.health = 100;
		this._inventory = [];
		this.attackable = true;
		this.stuck = false; //if stuck, references array of causes
	}

	addHook(action, callback){//callback should be a function (taking a function (action)) that returns a function which can be called by run() using apply()
		if(this._hooks.has(action)){
			this._hooks.get(action).push(callback);
		}else{
			this._hooks.set(action, [callback]);
		}
	}

	removeHook(action, callback){
		this._hooks.get(action).remove(callback);
	}

	run(action, arg_array=[]){
		var hooks = this._hooks.get(action);
		var toRun = this[action];
		
		this.container.getHooks(action, this).forEach(function(hook){//apply room hooks
			toRun = hook(toRun);
		});

		hooks.forEach(function(hook){//apply character hooks
			toRun = hook(toRun);
		});

		toRun.apply(this, arg_array);
	}

	//Returns array of slot references containing instance of item
	isEquipped(item, slots){
		var equipped_slots = [];
		slots.forEach(function(slot){
			if( slot.includes(item) ){
				equipped_slots.push(slot);
			}
		});
		return equipped_slots;
	}

	canEquip(item, slot_name){
		//Check if item is compatible with target slot
		if( !item.slot.includes(slot_name) ) return false;
		
		//Ask item if character meets criteria
		if( !item.canBeEquippedBy(this) ) return false;

		return true;
	}

	equip(item, slot_name){
		if( canEquip(item, slot_name) ){
			item.moveTo(this._body_base[slot_name]);
			item.applyHooks(this, slot_name);
		}
	}

	//Returns item if it can be removed, else false
	canRemove(item){
		if( item.canBeRemovedBy(this) )
			return item;

		return false;
	}

	remove(item, slot_name = item.inSlot, destination = this._inventory){
		var removable = canRemove(item);
		if( removable ){
			item.moveTo(destination);
			item.removeHooks(this, slot_name);
		}
	}

	//Character commands
	moveTo(destination){//destination is a room
		this.x = destination.x;
		this.y = destination.y;
		this.container.contents.remove(this);	//remove self from current location
		destination.contents.push(this); //add self to destination
		this.container = destination;	//update container
	}

	step(direction){
		var target = {x: this._x, y: this._y};
		switch (direction){
			case Direction.east:
				target.x++;
				break;
			case Direction.west:
				target.x--;
				break;
			case Direction.north:
				target.y--;
				break;
			case Direction.south:
				target.y++;
				break;
		}

		moveTo(this._map[target.x][target.y]);
	}

	//returns objects visible to the character (including self), or objects in a room if x, y are defined
	look(x = this._x, y = this._y){
		return this.container.contents;
	}

	take(item){
		if( item.canBeTakenBy(this) ){
			item.moveTo(this._inventory);
		}
	}

	drop(item){
		if( item.canBeDroppedBy(this) && this._inventory.includes(item) ){
			item.moveTo(this.container.contents);
		}
	}

	use(item, target=this){
		if( item.canBeUsedByOn(this, target) ){
			item.interact(target);
		}
	}

	attack(target, damage){
		if(target.attackable){
			target.run('receiveAttack', [this], damage);
		}
	}

	receiveAttack(attacker, damage){
		this.health -= damage;
	}

	wait(){
		//No action, allows hooks to run with no extra functionality
		//Default move for AI
	}
}