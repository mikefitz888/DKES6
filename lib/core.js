import "babel-polyfill";
console.log('sdf');
import Player from './Player.js';
import Controller from './Controller.js';
import View from './View.js';
console.log('2');
//import {CharacterFactory} from './Characters/CharacterFactory.js';
import Region from './Region.js';
import Level1 from './Mapgen/Level1.js';
import Sword from './Items/Sword.js';

var region = new Region(20, 20, Level1.generateMap);
console.log(region);
var test = new Player(region);

test.moveTo(region._start_point);
var sword = new Sword(test.container); //place sword in starting location
console.log(sword);

window.onload = function(){
	var output = document.getElementById('game_output');
	window['output'] = function(html){
		//var text = document.createTextNode(html);
		var chunk = document.createElement('span');
			chunk.className = 'output-chunk';
			chunk.innerHTML = html;
		output.appendChild(chunk);
		output.scrollTop = output.scrollHeight;
	}

	var map_canvas = document.getElementById('map');
	var map_ctx = map_canvas.getContext('2d');

	var room_canvas = document.getElementById('room');
	var room_ctx = room_canvas.getContext('2d');

	var player_canvas = document.getElementById('player');
	var player_ctx = player_canvas.getContext('2d');
	
	var view = new View(player_ctx, room_ctx, map_ctx, region, 32, {w:640, h:640});
	var controller = new Controller(test, view);

	view.drawPlayerVision(test);
}