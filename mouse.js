class Mouse extends Animal {
	constructor(pos, dna, population) {
		super(pos, dna, population);
		this.width = 10;
		this.height = 16;
		this.eatDistance = 8;

		this.matingDistance = 10;

		this.health = 10;
		this.foodHealth = 1;
	}

	show() {
		push();
			translate(this.pos.x, this.pos.y);

			fill(0);
			textSize(14);
			text(floor(this.health), 0, -this.height * 1.2);

			rotate(this.vel.heading() + 90);

			stroke(red(mousePinkColour), green(mousePinkColour), blue(mousePinkColour), this.alpha);
			strokeWeight(3);
			line(0, 0, 0, this.height * 0.9);
			noStroke();
			fill(red(mouseColour), green(mouseColour), blue(mouseColour), this.alpha);
			ellipse(0, 0, this.width, this.height);
			ellipse(0, -this.height * 0.3, this.width * 0.8, this.width);
		pop();
	}
}
