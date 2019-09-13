class Cat extends Animal {
	constructor(pos, dna, population) {
		super(pos, dna, population);
		this.width = 16;
		this.height = 16;
		this.eatDistance = 8;

		this.matingDistance = 12;

		this.health = 19;
		this.foodHealth = 5;
	}

	show() {
		push();
			translate(this.pos.x, this.pos.y);

			fill(0);
			textSize(14);
			text(floor(this.health), 0, -this.height * 1.2);

			rotate(this.vel.heading() + 90);

			stroke(red(catColour), green(catColour), blue(catColour), this.alpha);
			strokeWeight(5);
			line(0, 0, 0, this.height * 0.9);
			noStroke();
			fill(red(catColour), green(catColour), blue(catColour), this.alpha);
			ellipse(0, 0, this.width, this.height);
			triangle(-this.width * 0.45, 0, -this.width * 0.45, -this.height * 0.65, -this.width * 0.05, -this.height * 0.45);
			triangle(this.width * 0.45, 0, this.width * 0.45, -this.height * 0.65, this.width * 0.05, -this.height * 0.45);
		pop();
	}
}
