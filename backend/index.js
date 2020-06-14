//Dependecies manager/loader
const consign = require('consign')

//Import exress
const express = require('express');

//"Run" express
const app = express();

//Import Knex already with cfg
const db = require('./config/db')

//Import Mongoose and config
const mongoose = require('mongoose')
require('./config/mongodb')


//Know "app" have a "dp" propertie
//And it can be use inside routes
//db is the SQL base
//mongoose is the mongoose base
app.db = db
app.mongoose = mongoose

//dependencies manager/loader
//With this when we use middlewares with "module.exports = app => { ...algorithm... }"
//The middleware will recieve "app" as a parameter and we'll be alble to use (req, res) inside them
consign()
    .include('./config/passport.js')    //The authetication config 
    .then('./config/middlewares.js')    //Body parser and cors
    .then('./api/validations.js')       //Auxiliar funcitons (exits, not exits...)
    .then('./api')                      //This imports all files from api folder
    .then('./schedule')                 //This is the Stats Update Schedule
    .then('./config/routes.js')         //Routes here...
    .into(app)

//Watch port 3000
app.listen(3000, () => {
    console.log('Backend executing2...');
})

