//Secret...
const { authSecret } = require('../.env')

//JSON Web Token (Token for session)
const jwt = require('jwt-simple')

//Encrypt password
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!!!')
        }

        const user = await app.db('users')
        .where({email: req.body.email})
        .first()

        //400 - Not Found  
        if(!user) return res.status(400)
        .send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        //401 - Unauthorized
        if(!isMatch) return res.status(401).send('Email/senha inválidos')

        //Takes the amount of seconds equivalent to the current date
        const now = Math.floor( Date.now() / 1000 )

        //iat = When Token was created
        //exp = When token will expires

        const payload = {
            id: user.id,
            name: user.name,
            email: user.emai,
            admin: user.admin,
            iat: now,
            //So this means "get the date when token was created and add more 3 days"
            exp: now + (60 * 60 * 24 * 3)
        }

        //Return with the data "plus" iat and exp "plus" token
        //This token will work as a "session key"
        //Front end will send this value trougth "auth" header 
        //When using reader, remember to add "bearer" before token string
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async(req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                //Retrieve the "data" from token
                const token = jwt.decode(userData.token, authSecret)

                //Check if exp date still valid and return true
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            //Somre problem with token
        }

        res.send(false)
    }

    return {signin, validateToken}

}