export default class Region {
	constructor(width, height, generatorFunction){
		this._width = width;
		this._height = height;
		this._start_point;
		this._character_set = [];
		
		this._map = new Array(width);
		for(var i = 0; i < width; i++){
			this._map[i] = Array.from({length: height}, (v, k) => new Object({type:0, neighbours:[], x:i, y:k}) );//new Array(height);
		}
		//console.log(this._map);
		//Traps can spawn in north or east edges only, this prevents double placement
		generatorFunction.call(null, this);
	}

	//All neighboring cells, including empty blocks
	neighbours(p){
		var n = [];
		if(p.x>0 && this._map[p.x-1][p.y]) n.push(this._map[p.x-1][p.y]);
		if(p.y>0 && this._map[p.x][p.y-1]) n.push(this._map[p.x][p.y-1]);
		if(p.x<this._width-1 && this._map[p.x+1][p.y]) n.push(this._map[p.x+1][p.y]);
		if(p.y<this._height-1 && this._map[p.x][p.y+1]) n.push(this._map[p.x][p.y+1]);
		return n;
	}

	draw(ctx, room_ctx, player_ctx){
		var cell_width = 32;
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 640, 640);
		return; // uncomment line to view entire map
		for(var x = 0; x < this._width; x++){
			for(var y = 0; y < this._height; y++){
				var c = this._map[x][y].neighbours.length;
				
				if(this._map[x][y].type){
					ctx.fillStyle = "#000000";
				}else{
					ctx.fillStyle = "#ff0000";
				}
				ctx.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);

				var walls = [1, 1, 1, 1];//north, east, south, west
				this._map[x][y].neighbours.forEach(function(v){
					var dx = x - v.x;
					var dy = y - v.y;
					if(dx !== 0){
						walls[dx+2] = 0;
					}else{
						walls[-dy+1] = 0;
					}
				});

				ctx.fillStyle = "#ff0000";
				if(walls[0]){//north
					ctx.fillRect(x*cell_width, y*cell_width, cell_width, 1);
				}

				if(walls[1]){//east
					ctx.fillRect((x+1)*cell_width, y*cell_width, 1, cell_width);
				}

				if(walls[2]){//south
					ctx.fillRect(x*cell_width, (y+1)*cell_width, cell_width, 1);
				}

				if(walls[3]){//west
					ctx.fillRect(x*cell_width, y*cell_width, 1, cell_width);
				}
			}
		}

		//Draw Rooms, actually don't, fog of war
		/*for(var x = 0; x < this._width; x++){
			for(var y = 0; y < this._height; y++){
				this._map[x][y].draw(room_ctx, player_ctx, cell_width);
			}
		}*/
	}
}