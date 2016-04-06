import Character from './Character';
export default class NPC extends Character {
	constructor(map) {
		super(map);
		this.spawn; //NPC won't stray far from spawn unless it has an objective
		this.path = []; //keeps a path for the npc to follow back to spawn if lost
		this.patrolling = true;
	}

	spawnAt(destination){
		super.moveTo(destination);
		this.spawn = destination;
	}

	AI(){
		if(patrolling){
			patrol();
			if(this.path.length > 10){
				patrolling = false;
			}
		}else{
			this.backtrack();
			if(!this.path.length){
				patrolling = true;
			}
		}
	}

	patrol(){ //walk randomly about spawn
		if(this.container == this.spawn){
			this.path.length = 0; //Clear the path
		}
		var target = this.container.neighbours.pickRandom();
		this.path.push(this.container);
		super.moveTo(target);
	}

	backtrack(){
		super.moveTo(this.path.pop());
	}
}