const express = require('express')
const router = express.Router();
const HeroController = require('../controller/hero.controller')

router.get('/heroes', HeroController.getHeroes);

router.get('/heroes/:Id', HeroController.getHero);

router.put('/heroes', HeroController.updateHero);

router.post('/heroes', HeroController.createHero);

router.delete('/heroes/:Id', HeroController.deleteHero);

module.exports = router;