class Animal {
	constructor(pos, dna, population) {
		this.pos = pos;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.dna = dna;

		this.health;
		this.foodealth;
		this.fitness;
		this.female = null;
		this.mate = null;
		this.childIndex1 = null;
		this.childIndex2 = null;
		this.population = population;

		this.slowingDistance = 50;
		this.stopped = false;

		this.fading = false;
		this.alpha = 255;
	}

	fade() {
		this.alpha --;
	}

	applyForce(force) {
		this.acc.add(force);
	}

	behaviors(food, enemies) {
		if (!this.stopped) {
			if (floor(this.health) <= 0) {
				this.die();
			} else {
				if (this.population.mating && this.mate != "dummy") {
					if (this.mate == null) {
						this.die();
					} else {
						if (this.pos.dist(this.mate.pos) <= this.matingDistance) {
							this.die();
							this.population.stopped.push(true);

							if (this.female) {
								this.population.born(this.childIndex1, this.pos, this.vel);
								if (this.childIndex2 != null) {
									this.population.born(this.childIndex2, this.pos, this.vel);
								}
							}
						}

						let seekMate = this.arrive(this.mate.pos);
						this.applyForce(seekMate);
					}
				} else {
					if (food.length > 0) {
						let closestFood = findClosest(this.pos, food);
						let target = closestFood.object;
						let seek = this.seek(target.pos);
						this.applyForce(seek);
						if (closestFood.distance <= this.eatDistance) {
							this.population.eat(closestFood.index, this);
						}
					}

					if (enemies != null) {
						let closestEnemy = findClosest(this.pos, enemies);
						let target = closestEnemy.object;
						let flee = this.flee(target.pos);
						this.applyForce(flee);
					}
				}
			}
		}

		if (this.fading) {
			this.mate = null;
		}
	}

	update() {
		if (!this.fading && !this.population.mating) {
			this.health -= deltaTime;
		}

		this.vel.add(this.acc);
		this.pos.add(this.vel);

		this.acc.mult(0);
	}

	die() {
		this.vel.setMag(0.00001);
		this.acc = createVector(0, 0);
		this.stopped = true;
		this.fading = true;
		this.population.remove(this);
	}

	calculateFitness() {
		this.fitness = this.health;
		return this.fitness;
	}

	seek(target) {
		let desired = p5.Vector.sub(target, this.pos);
		desired.setMag(this.dna.maxspeed);
		let steering = p5.Vector.sub(desired, this.vel);
		steering.limit(this.dna.maxforce);

		return steering;
	}

	arrive(target) {
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();
		desired.normalize();
		if (d < this.slowingDistance) {
			let newMag = map(d, 0, this.slowingDistance, 0, this.dna.maxspeed);
			desired.mult(newMag);
		} else {
			desired.mult(this.dna.maxspeed);
		}
		let steering = p5.Vector.sub(desired, this.vel);
		steering.limit(this.dna.maxforce);

		return steering;
	}

	flee(target) {
		let desired = p5.Vector.sub(target, this.pos);
		desired.setMag(this.dna.maxspeed);
		desired.mult(-1);
		let steering = p5.Vector.sub(desired, this.vel);
		steering.limit(this.dna.maxforce);

		return steering;
	}
}
