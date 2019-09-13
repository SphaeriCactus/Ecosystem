let grass = [];
let mousePopulation, catPopulation;

let deltaTime = 0.1;
let oldTime = 0;
let newTime = 0;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < 500; i ++) {
		createNewGrass();
	}

	catPopulation = new CatPopulation(20, 0.01, true);
	mousePopulation = new MousePopulation(60, 0.01, false, grass, catPopulation.population);
	catPopulation.foodArray = mousePopulation;
}

function createNewGrass() {
	grass.push(new Grass());
}

function draw() {
	oldTime = newTime;
    newTime = millis() * 0.001;
	deltaTime = (newTime - oldTime);

	background(235, 245, 235);

	for (let g of grass) {
		g.show();
	}

	mousePopulation.showInfo();
	mousePopulation.update();

	catPopulation.showInfo();
	catPopulation.update();
}

function eat(arr, index) {
	arr.splice(index, 1);
	createNewGrass();
}

function findClosest(position, arr) {
	let record = Infinity;
	let index;
	for (let i = 0; i < arr.length; i ++) {
		let d = position.dist(arr[i].pos);
		if (d < record) {
			record = d;
			index = i;
		}
	}

	return {
		"object": arr[index],
		"index": index,
		"distance": record
	};
}
