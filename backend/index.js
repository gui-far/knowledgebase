//Dependecies manager/loader
const consign = require('consign')

//Import exress
const express = require('express');

//"Run" express
const app = express();


//Import Knex already with cfg
const db = require('./config/db')

//Know "app" have a "dp" propertie
//And it can be use inside routes
app.db = db

//dependencies manager/loader
consign()
    .then('./config/middlewares.js')
    .then('./api/validations.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

//Watch port 3000
app.listen(3000, () => {
    console.log('Backend executing2...');
})

