class Grass {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.size = 8;
	}

	show() {
		fill(grassColour);
		noStroke();
		circle(this.pos.x, this.pos.y, this.size);
	}
}
