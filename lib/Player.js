import Character from './Character.js';
export default class Player extends Character {
	constructor(map){
		super(map);
		this.actionMap.set('look', 'playerLook');
		this.actionMap.set('step', 'playerStep');
		this.actionMap.set('take', 'playerTake');
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

	initControls(roomctx, playerctx, width, input){
		var player = this;
		var arrows_to_input = false;
		document.addEventListener('keydown', function(e){
			var keycode = e.keyCode;
			if(!arrows_to_input){
				switch (keycode) {
					case 37: //left
						player.run('step', [Direction.west]);
						break;
					case 38: //up
						player.run('step', [Direction.north]);
						break;
					case 39: //right
						player.run('step', [Direction.east]);
						break;
					case 40: //down
						player.run('step', [Direction.south]);
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

				output(" >> "+cmd);
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