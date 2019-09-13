class Population {
	constructor(mutationRate, foodIsAnimal, foodArray, enemyArray) {
		this.population = [];
		this.matingPool = [];
		this.children = [];
		this.stopped = [];
		this.fading = [];
		this.parents;
		this.mutationRate = mutationRate;

		this.clock = 0;
		this.matingTime;
		this.mating = false;

		this.sum = 0;

		this.foodIsAnimal = foodIsAnimal;
		this.foodArray = foodArray;
		this.enemyArray = enemyArray;
	}

	remove(obj) {
		if (typeof obj == "object") {
			let index = this.population.indexOf(obj);
			let animal = this.population[index];
			this.population.splice(index, 1);
			this.fading.push(animal);
		} else {
			let animal = this.population[obj];
			this.population.splice(obj, 1);
			this.fading.push(animal);
		}
	}

	kill(index) {
		this.fading.splice(index, 1);
	}

	addSum() {
		this.sum = 0;
		for (let i = 0; i < this.matingPool.length; i ++) {
			let fit = this.matingPool[i].calculateFitness();
			this.sum += fit;
		}
	}

	pickOne() {
		let index = 0;
		let r = random(0, this.sum);

		while (r > 0) {
			r -= this.matingPool[index].fitness;
			index ++;
		}

		index --;
		return index;
	}

	born(childIndex, pos, vel) {
		let displacement = createVector(random(-5, 5), random(-5, 5));
		let animal = this.children[childIndex];
		animal.mate = "dummy";
		animal.vel = vel.copy();
		animal.pos = pos.copy();
		animal.pos.add(displacement);
		this.population.push(animal);
	}

	mutate(genes) {
		for (let i = 0; i < genes.length; i ++) {
			if (random(1) < this.mutationRate) {
				genes[i] = random(1);
			}
		}
	}

	eat(foodIndex, animal) {
		if (this.foodIsAnimal) {
			this.foodArray.remove(foodIndex);
		} else {
			this.foodArray.splice(foodIndex, 1);
		}

		animal.health += animal.foodHealth;
	}

	update() {
		if (this.stopped.length == this.parents) {
			this.parents = null;
			this.matingPool = [];
			this.children = [];
			this.stopped = [];
			this.clock = 0;
			this.mating = false;

			for (let animal of this.population) {
				animal.mate = null;
			}
		}

		if (!this.mating) this.clock += deltaTime;

		for (let animal of this.population) {
			if (this.foodIsAnimal) {
				animal.behaviors(this.foodArray.population, this.enemyArray);
			} else {
				animal.behaviors(this.foodArray, this.enemyArray);
			}
			animal.update();
			animal.show();
		}

		for (let i = 0; i < this.fading.length; i ++) {
			let animal = this.fading[i];
			animal.fade();
			animal.show();
			if (animal.alpha <= 0) {
				this.kill(i);
			}
		}

		if (this.clock >= this.matingTime && !this.mating) {
			this.selection();
		}
	}
}
