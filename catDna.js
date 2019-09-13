class CatDNA {
	constructor(genes) {
		if (genes) {
			this.genes = genes;
			this.genes[0] = map(this.genes[0], 0, 1, 0.8, 1.2);
			this.genes[1] = map(this.genes[1], 0, 1, 0.03, 0.05);
		} else {
			this.genes = new Array(2);
			this.genes[0] = random(0.8, 1.2);
			this.genes[1] = random(0.03, 0.05);
		}

		this.maxspeed = this.genes[0];
		this.maxforce = this.genes[1];
	}
}
