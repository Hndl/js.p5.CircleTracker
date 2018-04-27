class CircleModel {
	constructor ( _n , ){

		this.circleList = [];
		this.colourArray = ['#81A43C','#F4BF0F' ,'#DA812D' ,'#D7582B' ,'#D7582B' ];

		for (var i = 0 ; i < _n ; i++) {
			var x = random(width);
			var y = random(height);
			var r = 10;
			var s = random(2,5);
			var c = new AXCircle(x,y,r,s, this.chooseColor(), i) ;
			//console.log(JSON.stringify(c));
			this.circleList.push( c );
		}
		//console.log(`created ${this.circleList.length}`);
	}

	update( _mx, _my) {
		//console.log(`update ${this.circleList.length}`);
		for (var i = 0 ; i < this.circleList.length ; i++){
			this.circleList[i].update(_mx, _my);
			this.circleList[i].show();
		}
	}

	chooseColor(){
		return ( this.colourArray[ floor( random(0,this.colourArray.length -1) ) ] ) ;
	}
}

class AXCircle {
	constructor( _x, _y, _r , _s, _c, _id){
		//console.log('new');
		this.id = _id;
		this.pos = new createVector(_x,_y);
		this.vel = new createVector(random(-0.5,0.5),random(-0.5,0.5) );
		this.acc = new createVector(random(-0.5,0.5),random(-0.5,0.5) );
		this.baseR = _r;
		this.r = _r;
		this.s = _s;
		this.c = _c;
		this.collisionBoarder = 50;
		this.grow = false;
		this.growFactor = 5;
		this.maxSize = 100;
		this.shrinkFactor = 5;

		//console.log('done');
	}

	update( _mx, _my){
		this.pos.add( this.vel );
		this.vel.add(this.acc);
		this.acc.mult(0);
		if (this.pos.x < 0) { this.pos.x = width;}
		if (this.pos.x > width ) { this.pos.x = 0;}
		if (this.pos.y < 0 ) { this.pos.y = height;}
		if (this.pos.y > height) { this.pos.y = 0; }
		if (this.isMouseOver ( _mx, _my)) {
			// grow the circle.
			if ( this.r < this.maxSize ){
				this.r += this.growFactor;
			}
		} else {
			if ( this.r > this.baseR){
				//circle is reducing in size
				this.r -= this.shrinkFactor;
			}

		}

	}

	isMouseOver( _mx, _my) {
		
		var x = this.pos.x-(this.r+this.collisionBoarder/2);
		var y = this.pos.y-(this.r+this.collisionBoarder/2);
		var w = (this.r*2)+this.collisionBoarder;
		var h = (this.r*2)+this.collisionBoarder;
		
		return ( _mx >= x && _mx <= (x+w) && _my >= y && _my < (y+h) );
		//	console.log(`Circle: ${this.id} x:${x} y:${y} w:${w} h:${h} - mX:${_mx} mY:${_my}`);
		

	}

	show(){
		//console.log(`x:${this.pos.x} y:${this.pos.y} r:${this.r} s:${this.s}`);
		push();
		//translate(width/2,height/2);
		noStroke();
		fill(this.c);
		ellipse(this.pos.x, this.pos.y,this.r*2, this.r*2);
		//fill(0,255,0,30);
		//rect(this.pos.x-(this.r+this.collisionBoarder/2),this.pos.y-(this.r+this.collisionBoarder/2) , (this.r*2)+this.collisionBoarder, (this.r*2)+this.collisionBoarder);
		pop();
	}
}

