import inquirer from "inquirer";

let pet = {
	name: "",
	type: "",

	health: 5,
	energy: 5,
	hunger: 5,
	happy: 8,

	sleeping: false,

	age: 0,
};


let actions = {
	petPlay: function () {
		pet.hunger += 1;
		pet.energy -= 1;
		pet.happy += 2;
		console.clear();
	},
	feedPet: function () {
		pet.hunger -= 2;
		pet.health += 1;
		console.clear();
	},
	nap: function () {
		pet.energy = 10;
		console.clear();
	},
	showStats: function () {
		console.log(
			`\nHunger: ${pet.hunger}\nHealth: ${pet.health}\nEnergy: ${pet.energy}\nHappiness: ${pet.happy}\nAge: ${pet.age}`
		);
	},


	levelCheck: function () {
		return new Promise((reject, resolve) => {
			if ((pet.sleeping = true)) {
				reject(`${pet.name} is sleeping!`);
			} else if (pet.hunger > 8) {
				reject(`${pet.name} is too hungry to do that.`);
			} else if (pet.energy < 2) {
				reject(`${pet.name} is too tired to do that.`);
			} else if (pet.happy < 2) {
				reject(`${pet.name} is too sad to do that.`);
			} else {
				resolve(true);
			}
		});
	},
	
    
	read: async function () {
		let response = await actions.levelCheck();
		if (response.includes("hungry")) {
			console.log(response);
		} else if (response.includes("sad")) {
			console.log(response);
		} else if (response.includes("tired")) {
			console.log(response);
		} else {
			pet.energy--;
			pet.happy--;
		}
		console.clear();
	},
	exercisePet: function () {
		pet.hunger++;
		pet.energy--;
		console.clear();
	},
};

const gameStart = () => {
	inquirer
		.prompt([
			{
				type: "list",
				name: "petType",
				message: "Hello! What sort of pet would you like?",
				choices: ["Hedgehog", "Cat", "Dog", "Rat"],
			},
			{
				type: "input",
				name: "petName",
				message: "And what name would you like to give it?",
			},
		])
		.then((answer) => {
			pet.name = answer.petName;
			console.log(pet.name);
			pet.type = answer.petType;
			console.log(pet.type);
		})
		.then(() => gameLoop());
};

const gameLoop = () => {
	pet.age += 1;
	if (pet.age > 15) {
		endGame();
		return;
	}

	inquirer
		.prompt([
			{
				type: "list",
				name: "actions",
				message: "What would you like to do with your pet?",
				choices: ["Play", "Feed", "Nap", "Exercise"],
			},
		])
		.then((answer) => {
			console.log(answer);
			if (answer.actions === "Play") {
				actions.petPlay();
			} else if (answer.actions === "Feed") {
				actions.feedPet();
			} else if (answer.actions === "Nap") {
				actions.nap();
			} else if (answer.actions === "Exercise") {
				actions.exercisePet();
            } else;    
			actions.showStats();
		})
		.then(() => gameLoop());
};

//
const endGame = () => {
	if (pet.health < 3 || pet.happy < 3 || pet.energy < 3) {
		console.log("Your pet is ill because of you");
		deadEnd();
	} else if (pet.age > 20){
        oldAgeEnd();
    }
    

const deadEnd = () => {
	console.log("Your pet has died.");
	restart();
};

const oldAgeEnd = () => {
	console.log(
		`You and your pet made great memories together, but as time has gone on they have grown old and weak. \n Even the best things have to end and so you say goodbye to your lil buddy while they slip into their forever sleep`
	);
	restart();
};

//
const resetStats = () => {
	pet.energy = 3;
	pet.health = 4;
	pet.hunger = 7;
	pet.happy = 3;
	pet.name = "";
	pet.type = "";
	pet.sleeping = false;
	pet.age = 0;
};

//
const restart = () => {
	console.clear;
	resetStats();
	console.log("You have finished the game.");
	inquirer
		.prompt([
			{
				name: "restartQ",
				type: "confirm",
				message: "Would you like to play again?",
			},
		])
		.then((answer) => {
			console.log(answer.restartQ);
			if (answer.restartQ === true) {
				console.clear();
				gameStart();
			} else {
				console.clear();
			}
		});
}

gameStart()


