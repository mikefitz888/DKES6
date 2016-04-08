import Character from './Character';
export default class Player extends Character {
	constructor(map){
		super(map);
		this.actionMap.set('look', 'playerLook');
	}

	playerLook(args){
		var items = this.look();
		output("You can see: " + items.join(', '));
	}

	initControls(roomctx, playerctx, width, input){
		var player = this;
		var arrows_to_input = false;
		document.addEventListener('keydown', function(e){
			var keycode = e.keyCode;
			if(!arrows_to_input){
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
					case 9: //tab
						arrows_to_input = true;
						return false;
				}
				player.vision(roomctx, playerctx, width);
			}else{
				if(keycode == 9){ //tab
					arrows_to_input = false;
					return false;
				}
			}
			
			if(keycode == 27){ //escape
				input.value = '';
			}

			if(keycode == 13){ //return
				// submit command
				var cmd = input.value;
				input.value = '';

				output(cmd);
				var args = cmd.split(" ");
				player.run(args[0], args.splice(1));
			}
		});
		this.vision(roomctx, playerctx, width);
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