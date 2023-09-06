const digimon = {
    name: null,
    hunger: 100,
    eggs: [],
    money: 50
}

function getHungry() {
    const rnd = Math.floor(Math.random() * 4);
    if (digimon.hunger - rnd < 0) {
        digimon.hunger = 0;
    } else {
        digimon.hunger -= rnd;
    }
}

function layEgg() {
    const rnd = Math.floor(Math.random() * 10 + 3);
    digimon.eggs.push(rnd);
}

module.exports = {
    setDigimon: (req, res) => {
        const {chosenDigimon} = req.params;
        digimon.name = chosenDigimon;
        const timer = setInterval(getHungry, 1000);
        const timer2 = setInterval(layEgg, 3000);
        res.send({digimon});
    },
    getDigimon: (req, res) => {
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
        if (digimon.money - 10 > 0) {
            digimon.money -= 10;
            const fed = digimon.hunger + Math.floor(Math.random() * 3 + 3);
            fed < 100 ? digimon.hunger = fed : digimon.hunger = 100;
        }
        res.send({digimon});
    },
}