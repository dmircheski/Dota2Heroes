const express = require('express');
const bodyParser = require('body-parser');
const Hero = require('./models/Hero')

const HeroRoutes = require('./routes/hero.route');


/////////////////////////////////////////////////////////////////

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(HeroRoutes)

app.route('/').get(async (req, res, next) => {
    res.send('Welcome to RavenDB API !')
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})