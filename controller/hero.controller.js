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
    let heroRequest = req.body.Hero
    let heroDatabase = await session.load('Heroes/' + heroRequest.id)
    if (heroRequest.Abilities != undefined) {
        let mergedAbilities = []
        let oldAbilities = heroDatabase.Abilities
        let newAbilities = heroRequest.Abilities
        newAbilities.forEach(newAbility => {
            oldAbilities.forEach(oldAbility => {
                if (newAbility['name'] == oldAbility['name']) {
                    mergedAbilities.push({
                        ...oldAbility,
                        ...newAbility
                    })
                }
            })
        });
        oldAbilities.forEach(oldAbility => {
            mergedAbilities.forEach(mergedAbility => {
                if(oldAbility['name'] != mergedAbility['name']) {
                    mergedAbilities.push(oldAbility)
                }
            })
        
        })
        heroRequest.Abilities = mergedAbilities
    }
    heroDatabase = Object.assign(heroDatabase, heroRequest)
    await session.saveChanges(heroDatabase)
    res.send(heroDatabase, 200)
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





