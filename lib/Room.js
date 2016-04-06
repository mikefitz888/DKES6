export default class Room { //Ideally this should be abstract, but can be used as a wall if you want
	constructor(x, y, map, neighbours, type){
		this.x = x;
		this.y = y;
		this.type = type;
		this._map = map;
		this.neighbours = neighbours;

		this.contents = []; //includes characters and objects

		this.entry = {
			north:false,
			south:false,
			east:false,
			west:false
		}

		this.hooks = []; //includes traps
	}

	spawn(item){
		this.contents.push(item);
		item.container = this.contents;
	}

	addHook(hook, actions, characters){
		this.hooks.push({hook, actions, characters});
	}

	getHooks(action, character){
		return Array.from(this.hooks.filter(function(v){
			if(actions.includes(action)){
				for(var i = 0; i < v.characters.length; i++){
					if(character instanceof v.characters[i]){
						return true;
					}
				}
			}
			return false;
		}), v => v.hook);
	}
}