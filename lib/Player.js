import Character from './Character.js';
export default class Player extends Character {
	constructor(map){
		super(map);
		this.name = 'Yourself';
	}

	playerLook(args){
		var items = this.look();
		output("You can see: " + Array.from(items, v => v.name).join(', '));
	}

	playerStep(direction){
		if(this.step(direction)){
			output('<hr><br/>You step to the ' + direction);
		}
	}

	playerTake(){
		var item_name = Array.from(arguments).join(" ");
		var items = this.look();
		var pass = items.filter(function(v){return v.name.toLowerCase() == item_name.toLowerCase();});
		if(pass.length){
			pass[0].moveTo(this);
			output("You take the " + pass[0].name);
			console.log(this.contents);
		}
	}


	draw(ctx, width, n){
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(this.x*width+1, this.y*width+1, width-2, width-2);
	}

	vision(roomctx, playerctx, width){
		this.container.draw(roomctx, playerctx, width);
		this.container.drawNeighbours(roomctx, playerctx, width, 1);
	}
}