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

		this.drawn = false;
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
		if(!this.drawn){
			this.drawRoom(ctx, width);
		}

		for(var i = 0; i < this.contents.length; i++){
			if(this.contents[i] instanceof Character){ // Let characters draw themselves
				this.contents[i].draw(character_ctx, width, char_count++);
			}else{
				this.contents[i].draw(character_ctx, width, item_count++);
			}
		}
	}

	drawNeighbours(ctx, character_ctx, width, recursion_level=0, exclude=null){
		var neighbours = this._map.neighbours(this); //includes walls
		for(var i = 0; i < neighbours.length; i++){
			if(neighbours[i] !== exclude){
				neighbours[i].draw(ctx, character_ctx, width);
				if(recursion_level){
					neighbours[i].drawNeighbours(ctx, character_ctx, width, recursion_level-1, this);
				}
			}
		}
	}

	drawRoom(ctx, width){
		ctx.clearRect(this.x*width, this.y*width, width, width);
		var c = this.neighbours.length;
				
		if(this.type){
			ctx.fillStyle = "#000000";
		}else{
			ctx.fillStyle = "#ff0000";
		}
		ctx.fillRect(this.x*width, this.y*width, width, width);

		var walls = [1, 1, 1, 1];//north, east, south, west
		this.neighbours.forEach(function(v){
			var dx = this.x - v.x;
			var dy = this.y - v.y;
			if(dx !== 0){
				walls[dx+2] = 0;
			}else{
				walls[-dy+1] = 0;
			}
		}, this);

		ctx.fillStyle = "#ff0000";
		if(walls[0]){//north
			ctx.fillRect(this.x*width, this.y*width, width, 1);
		}

		if(walls[1]){//east
			ctx.fillRect((this.x+1)*width, this.y*width, 1, width);
		}

		if(walls[2]){//south
			ctx.fillRect(this.x*width, (this.y+1)*width, width, 1);
		}

		if(walls[3]){//west
			ctx.fillRect(this.x*width, this.y*width, 1, width);
		}
	}

	convertNeighbours(map){
		for(var i = 0; i < this.neighbours.length; i++){
			let n = this.neighbours[i];
			this.neighbours[i] = map[n.x][n.y];
		}
	}
}