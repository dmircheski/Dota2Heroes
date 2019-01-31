const Hero = require('../models/Hero')

const Db = require('../db')
const _ = require('lodash')

let db = new Db();

let session = db.createConnection();

exports.getHeroes = async (req, res, next) => {
    try {
        const result = await session.query({ collection: 'Heroes' }).all();
        res.send(result)
    } catch (e) {
        next(e)
    }
}


exports.getHero = async (req, res, next) => {
    try {
        const result = await session.query({ collection: 'Heroes' }).
            whereEquals('id', 'Heroes/' + req.params.Id).
            all();

        res.send(result);
    } catch (e) {
        next(e)
    }
}

exports.updateHero = async (req, res, next) => {
    let myUpdatedHero = req.body.Hero
    heroToChange = await session.load('Heroes/' + myUpdatedHero.id)
    // if (myUpdatedHero.Abilities != undefined) {
    //     // let xAbis = _.intersectionBy(myUpdatedHero.Abilities, heroToChange.Abilities, 'Name');
    //     // if (xAbis != null){
    //     //     heroToChange.Abilities.forEach(element => {
    //     //         if(_.intersectionBy(element, xAbis, 'Name') {
    //     //             element = 
    //     //         } 
    //     //     })
    //     //     heroToChange.Abilities.
    //     // }

    // }

    heroToChange = Object.assign(heroToChange, myUpdatedHero)
    await session.saveChanges(heroToChange)
    res.send(heroToChange, 200)
}

exports.createHero = async (req, res, next) => {
    let { Name, Description } = req.body;
    let hero = new Hero(Name, Description)
    const result = await session.store(hero, 'Heroes/')
    await session.saveChanges();
    res.send('Here is the result ' + result + ' \n HeroID: ' + hero.id)
}

exports.deleteHero = async (req, res, next) => {
    try {

        let result = await session.load('Heroes/' + req.params.Id);

        session.delete(result);
        await session.saveChanges();

        return res.status(200).send({ message: "Hero successfully deleted. " })

    } catch {
        next(e);
    }
}





