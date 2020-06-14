//This is the "secret"
const { authSecret } = require('../.env')

//An Authentication lib
const passport = require('passport')

//Specific for JWT
const passportJwt = require('passport-jwt')
const auth = require('../api/auth')

//ExtractJwt will hold the header content
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        //Find User inside Database using the ID retrieved from the token 
        app.db('users')
            .where({id: payload.id})
            .first()
            //Remember, the first callback param hold errors, in this case 'null'
            .then(user => done(null, user ? {...payload, teste: 'teste'} : false ))
            .catch(err => done (err, false))
    })

    //Make passport use that Stragety ( configuration )
    passport.use(strategy)

    return {
        //This function will be use inside routes for routes where authetincation is needed
        authenticate: () => 
            //using "jwt" and no session control
            passport.authenticate('jwt', {session: false})
        
    }
}