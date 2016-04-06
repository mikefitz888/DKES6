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
	test.initControls();
	var canvas = document.getElementById('map');
	var ctx = canvas.getContext('2d');

	region.draw(ctx);
}