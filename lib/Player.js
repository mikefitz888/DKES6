import Character from './Character';
export default class Player extends Character {
	constructor(map){
		super(map);
	}

	initControls(roomctx, playerctx, width){
		var player = this;
		document.addEventListener('keyup', function(e){
			var keycode = e.keyCode;
			switch (keycode) {
				case 37: //left
					player.step(Direction.west);
					break;
				case 38: //up
					player.step(Direction.north);
					break;
				case 39: //right
					player.step(Direction.east);
					break;
				case 40: //down
					player.step(Direction.south);
					break;
			}
			player.vision(roomctx, playerctx, width);		
		});
		this.vision(roomctx, playerctx, width);
	}

	draw(ctx, width, n){
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(this.x*width+1, this.y*width+1, width-2, width-2);
	}

	vision(roomctx, playerctx, width){
		console.log(this.container);
		this.container.draw(roomctx, playerctx, width);
		for(var i = 0; i < this.container.neighbours.length; i++){
			console.log(this.container);
			this.container.neighbours[i].draw(roomctx, playerctx, width);
		}
	}
}