import "babel-polyfill";

import Player from './Player.js';
//import {CharacterFactory} from './Characters/CharacterFactory.js';
import Region from './Region.js';
import Level1 from './Mapgen/Level1.js';

var region = new Region(20, 20, Level1.generateMap);
//console.log(region);
var test = new Player(region);

//console.log(test);



test.moveTo(region._start_point);
//console.log(test);

window.onload = function(){
	var map_canvas = document.getElementById('map');
	var map_ctx = map_canvas.getContext('2d');

	var room_canvas = document.getElementById('room');
	var room_ctx = room_canvas.getContext('2d');

	var player_canvas = document.getElementById('player');
	var player_ctx = player_canvas.getContext('2d');

	test.initControls(room_ctx, player_ctx, 20);
	region.draw(map_ctx, room_ctx, player_ctx);
}