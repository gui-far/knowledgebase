//Import knex cfg
const config = require('../knexfile.js')

//Import Knex               //"Run" with config
const knex = require('knex')(config)

//IMPORTANT!!!!
//This make migrations run when app starts
//When the App and DB becomes complex you will prefer to run migrations manually
//Because this way you have more control over database changes
//Another scenario to do manually is when you have a team working in the same project (you will not want this automatic)
knex.migrate.latest([config])

module.exports = knex