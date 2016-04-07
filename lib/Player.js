import Character from './Character';
export default class Player extends Character {
	constructor(map){
		super(map);
	}

	initControls(roomctx, playerctx, width){
		var player = this;
		document.addEventListener('keyup', function(e){
			var room = player.container;
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

			//console.log('should draw');
			room.draw(roomctx, playerctx, width);
			player.container.draw(roomctx, playerctx, width);
		});
	}

	draw(ctx, width, n){
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(this.x*width+1, this.y*width+1, width-2, width-2);
	}
}