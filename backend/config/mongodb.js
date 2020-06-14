//Like "Knex" (SQL) but for MongoDB
const mongoose = require('mongoose')

//Mongo Connection - Remember this is inside docker
//The database will be created automatically
mongoose.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('Mongo Connected'))
    .catch(e=> {
        console.log('Cannot connect to Mongo')
        console.log(e)
    }) 