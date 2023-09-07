const digimon = {
    name: null,
    level: 1,
    hunger: 100,
    evolution: 0,
    eggs: [],
    money: 50,
    gameOver: false
}
let timer = undefined;

function reset() {
    clearInterval(timer)
    digimon.name = null;
    digimon.level = 1;
    digimon.hunger = 100;
    digimon.evolution = 0;
    digimon.eggs = [];
    digimon.money = 50;
}

function layEgg() {
    const rnd = Math.floor(Math.random() * 8 + 3);
    digimon.eggs.push(rnd);
}

function getHungry() {
    const rndHunger = Math.floor(Math.random() * 5);
    if (digimon.hunger - rndHunger <= 0) {
        digimon.hunger = 0;
        digimon.gameOver = true;
    } else {
        digimon.hunger -= rndHunger;
    }
    //evolution growth
    const rndEvolve = Math.floor(Math.random() * 2 + 1);
    if (digimon.evolution + rndEvolve >= 100) {
        if (digimon.level < 6) {
            digimon.level += 1;
            digimon.hunger = 100;
            digimon.evolution = 0;
        } else {
            digimon.evolution = 100;
        }
    } else {
        digimon.evolution += rndEvolve;
    }
    //lay egg with 25% chance
    if (Math.random() < 0.25) layEgg();
}

module.exports = {
    setDigimon: (req, res) => {
        const {chosenDigimon} = req.params;
        digimon.gameOver = false;
        digimon.name = chosenDigimon;
        timer = setInterval(getHungry, 1000);
        res.send({digimon});
    },
    getDigimon: (req, res) => {
        if (digimon.gameOver) reset();
        res.send({digimon});
    },
    sellEgg: (req, res) => {
        const {chosenEggIndex} = req.params;
        const index = Number(chosenEggIndex);
        const profit = digimon.eggs[index];
        digimon.money += profit;
        digimon.eggs.splice(chosenEggIndex, 1);
        res.send({digimon});
    },
    feedDigimon: (req, res) => {
        if (digimon.money - 10 >= 0) {
            digimon.money -= 10;
            const fed = digimon.hunger + Math.floor(Math.random() * 5 + 4);
            fed < 100 ? digimon.hunger = fed : digimon.hunger = 100;
        }
        res.send({digimon});
    },
}