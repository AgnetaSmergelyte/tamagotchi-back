const express = require("express");
const router = express.Router();

const {setDigimon, getDigimon, sellEgg, feedDigimon} = require("../controllers/mainController");

router.get("/setDigimon/:chosenDigimon", setDigimon);
router.get("/digimon", getDigimon);
router.get("/sellEgg/:chosenEggIndex", sellEgg);
router.get("/feed", feedDigimon);

module.exports = router;