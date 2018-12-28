const express = require('express');
const bodyParser = require('body-parser');

const { DocumentStore } = require('ravendb'); //////////
//////////////////////////////////////////////////////////////////
const Hero = require('./models/Hero')
const store = new DocumentStore('http://localhost:8080', 'chafkadb');
store.initialize();

const session = store.openSession();

/////////////////////////////////////////////////////////////////

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


async function zemi() {
    //  const emp = await session.load("employees/8-A");

    const query = session.query({ collection: 'employees' });

    const results = await query.all();

    return results;
}


app.get('/', (req, res) => {
    res.send('Welcome to RavenDB API !')
})

app.route('/heroes').get(async (req, res) => {
    const result = await session.query({ collection: 'heroes'}).all();
    res.send(result)
});

app.route('/heroes').post(async (req, res) => {
    let {Name, Description} = req.body;
    let hero = new Hero(Name, Description)
    const result = await session.store(hero, 'Heroes/')
    await session.saveChanges();
    res.send('Here is the result ' + result + ' \n HeroID: ' + hero.id)
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})