Array.prototype.remove = function() {
    for(arg in arguments){
    	this.splice(this.indexOf(arg), 1);
    }
};

Array.prototype.removePoint = function(p){
	for(var i = 0; i < this.length; i++){
		if(this[i].x == p.x && this[i].y == p.y){
			return this.splice(i, 1);
		}
	}
}

Array.prototype.randomIndex = function(){
	return ~~(Math.random()*this.length);
}

Array.prototype.extractRandom = function(){
	return this.splice(this.randomIndex(), 1)[0];
}

Array.prototype.pickRandom = function(){
	return this[this.randomIndex()];
}

const Direction = {
	east: 'east',
	west: 'west',
	north: 'north',
	south: 'south'
};