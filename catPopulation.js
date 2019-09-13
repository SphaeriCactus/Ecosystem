class CatPopulation extends Population {
	constructor(number, mutationRate, foodIsAnimal, foodArray, enemyArray) {
		super(mutationRate, foodIsAnimal, foodArray, enemyArray);
		for (let i = 0; i < number; i ++) {
			this.population.push(new Cat(createVector(random(width), random(height)), new CatDNA(), this));
		}

		this.matingTime = 20;
	}

	showInfo() {
		fill(0);
		textSize(20);
		text("Cat Clock: " + floor(this.clock), 100, 100);
	}

	selection() {
		let len = floor(this.population.length/2);
		this.parents = len * 2;
		this.matingPool = this.population.slice(0, this.parents);
		this.addSum();

		for (let i = 0; i < len; i ++) {
			let index = this.pickOne();
			let parentA = this.matingPool[index];
			this.matingPool.splice(index, 1);
			this.addSum();

			index = this.pickOne();
			let parentB = this.matingPool[index];
			this.matingPool.splice(index, 1);
			this.addSum();

			parentA.mate = parentB;
			parentB.mate = parentA;
			parentA.female = true;
			parentB.female = false;
			let childDNA = this.crossover(parentA.dna, parentB.dna);
			let child = new Cat(parentA.pos.copy(), childDNA, this);
			this.children.push(child);
			parentA.childIndex1 = this.children.length - 1;
			parentB.childIndex1 = this.children.length - 1;

			if (random(10) < (parentA.fitness + parentB.fitness)/2) {
				let child2DNA = this.crossover(parentA.dna, parentB.dna);
				let child2 = new Cat(parentB.pos.copy(), child2DNA, this);
				this.children.push(child2);
				parentA.childIndex2 = this.children.length - 1;
				parentB.childIndex2 = this.children.length - 1;
			}
		}

		this.mating = true;
	}

	crossover(dnaA, dnaB) {
		let midpoint = random(dnaA.genes.length);
		let newGenes = [];
		for (let i = 0; i < dnaA.genes.length; i ++) {
			if (i <= midpoint) {
				newGenes.push(dnaA.genes[i]);
			} else {
				newGenes.push(dnaB.genes[i]);
			}
		}
		newGenes = this.mutate(newGenes);
		let newDna = new CatDNA(newGenes);
		return newDna;
	}
}
