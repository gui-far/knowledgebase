//"Understand" the request content
const bodyParse = require('body-parser')

//Allow access from different origins
const cors = require('cors')

module.exports = app => {
    app.use(bodyParse.json())
    app.use(cors())
}



