import Character from './Character.js';
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

	canAccess(point){
		for(var i = 0; i < this.neighbours.length; i++){
			if(this.neighbours[i].x == point.x && this.neighbours[i].y == point.y){
				return true;
			}
		}
		return false;
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

	draw(ctx, character_ctx, width){
		var char_count = 0;
		var item_count = 0;

		//Clear room
		character_ctx.clearRect(this.x*width, this.y*width, width, width);
		ctx.clearRect(this.x*width, this.y*width, width, width);

		for(var i = 0; i < this.contents.length; i++){
			if(this.contents[i] instanceof Character){ // Let characters draw themselves
				this.contents[i].draw(character_ctx, width, char_count++);
			}else{
				this.contents[i].draw(character_ctx, width, item_count++);
			}
		}

		this.drawRoom(ctx, width);
	}

	drawRoom(ctx, width){
		return false;
	}
}