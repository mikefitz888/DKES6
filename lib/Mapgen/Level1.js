import MapGen from './MapGen.js';
import Room from '../Room.js';
export default class Level1 extends MapGen {
	static generateMap(map_space){
		var width = map_space._width;
		var height = map_space._height;
		
		var maze = super.kruskal(map_space);
		var open_tiles = maze[0].filter(function(v){return v.type;});
		//Type 1 indicates open_tile

		for(var x = 0; x < map_space._map.length; x++){
			for(var y = 0; y < map_space._map[x].length; y++){
				let tile = map_space._map[x][y];
				switch (tile.type) {
					case 0:
					case 1:
						map_space._map[x][y] = new Room(x, y, map_space, map_space._map[x][y].neighbours, tile.type);
						//console.log(tile);
				}
			}
		}
		console.log(map_space);

		var start = open_tiles[~~(Math.random()*open_tiles.length)];
		map_space._start_point = map_space._map[start.x][start.y];

		//Add traps (North and East edges only, this prevents double placement)

		//Add items

		//Add NPCs
		var spawn_rate = 0.1;
		var max_spawns_per_tile = 3;
		for(var i = 0; i < open_tiles.length; i++){
			if(open_tiles[i] == start) continue; //Don't spawn on player start
			//Get new NPC
			let npc = super.getCharacter(map_space, 'Test');
			//Give each NPC a start point, n% chance of spawning on any tile, if 1 spawns try again
			let spawn_count = 0;
			while(Math.random() < spawn_rate && spawn_count < max_spawns_per_tile){
				spawn_count++;
				let p = open_tiles[i];
				npc.spawnAt(map_space._map[p.x][p.y]);
			}
		}
	}
}