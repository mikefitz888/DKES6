import {CharacterFactory} from '../Characters/CharacterFactory.js';
export default class MapGen {
	static kruskal(map_space){
		var width = map_space._width;
		var height = map_space._height;
		
		//var remaining = Array.from({length: width*height}, (v, k) => k); //Array = [0, 1, 2 ...]
		var maze = Array.from({length: width*height}, (v, k) => [map_space._map[k%width][~~(k / width)]]);

		//Generate edges
		var edges = [];
		for(var x = 0; x < width; x++){
			for(var y = 0 + (x%2); y < height; y+=2){
				let neighbours = map_space.neighbours({x, y});
				let es = Array.from(neighbours, v => [map_space._map[x][y], v]);
				Array.prototype.push.apply(edges, es);
			}
		}

		//Generate perfect maze
		var mst = [];
		while (edges.length){
			let edge = edges.extractRandom();
			let set_1, set_2;

			for(var i = maze.length-1; i >= 0 && (set_1 === undefined || set_2 === undefined); i--){
				if(maze[i].includes(edge[0])) set_1 = i;
				if(maze[i].includes(edge[1])) set_2 = i;
			}

			if(set_1 != set_2){
				mst.push(edge);
				Array.prototype.push.apply( maze[set_1], maze.splice(set_2, 1)[0] );
				edge[0].type = 1;
				edge[0].neighbours.push(edge[1]);
				edge[1].type = 1;
				edge[1].neighbours.push(edge[0]);
			}
		}

		//Make sparse; iteratively remove dead-ends
		var sparseness = 1;
		for(var i = 0; i < sparseness; i++){
			let trim_set = [];
			for(var x = 0; x < maze[0].length; x++){//maze contains 1 set now
				if(maze[0][x].neighbours.length === 1){
					trim_set.push(maze[0][x]);
				}
			}
			
			trim_set.forEach(function(v){
				v.neighbours[0].neighbours.removePoint( v );
				v.neighbours = [];
				v.type = 0;
			});
		}

		//Pick some dead-ends; add cycles
		var add_cycle_passes = 5;
		var chance = 0.2;
		var max_step_passes = 5;
		for(var i = 0; i < add_cycle_passes; i++){
			let cycle_set = [];
			for(var x = 0; x < maze[0].length; x++){//maze contains 1 set now
				if(maze[0][x].neighbours.length === 1 && Math.random() < chance){
					cycle_set.push(maze[0][x]);
				}
			}

			cycle_set.forEach(function(v){
				for(var i = 0; i < max_step_passes; i++){
					let neighbours = map_space.neighbours(v);
					let actual_neighbour = v.neighbours[0];
					let addable = neighbours.filter(function(v, k){return v != actual_neighbour});
					let target = addable.pickRandom();

					v.neighbours.push(target);
					target.neighbours.push(v);
					if(!target.type){
						target.type = 1;
						v = target;
					}else{
						break;
					}
				}
			});
		}
		return maze;
	}

	static p2l(point, width){//point to line
		return point.y*width + point.x;
	}

	static l2p(i, width){//line to point
		return {
			x: i % width,
			y: ~~(i / width)
		};
	}

	static getCharacter(map, type){
		return CharacterFactory.call(map, type);
	}
}