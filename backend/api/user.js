
const bcrypt = require('bcrypt-nodejs')

//Remember that "app" have the "db" propertie
//It was set inside "index.js"
module.exports = app => {

    //Validation functions
    //Remember the functions below throws msg as error
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    //Function to encrypt Password with Salt
    const encryptPassword = (password) => {     
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    //Create New or Update
    const save = async (req, res) => {

        //Destructure from JSON Request (was "body-parsed")
        const user = { ...req.body }

        //Check for URL params
        if (req.params.id) user.id = req.params.id

        try {
            //Validate request data
            existsOrError(user.name, 'Name not informed')
            existsOrError(user.email, 'Email not informed')
            existsOrError(user.password, 'Password not informed')
            existsOrError(user.confirmPassword, 'Password Confirmation not informed')
            equalsOrError(user.password, user.confirmPassword, 'Passwords dont Match')

            //Check if user already exists (with same email)
            const userFromDb = await app.db('users')
                .where({ email: user.email }).first()

                console.log(userFromDb);

            if (!user.id) {
                console.log(userFromDb);
                notExistsOrError(userFromDb, 'Usuário já cadastrado')
            }

        } catch (msg) { //remember, existsOrError, ntoExistsOrErro and equalsOrError throws error messages
            //400 - Something wrong with user-side
            return res.status(400).send(msg)
        }

        //Encrypts password (with previous function)
        user.password = encryptPassword(req.body.password)

        //"Clear" the password confirmation
        delete user.confirmPassword

        //IF has Id (set by URL PARAM)...
        if (user.id) {
            app.db('users')
                //Update...
                .update(user)
                .where({ id: user.id })
                .then(() => {
                    //204 - Everything OK - Without Content
                    res.status(204).send()
                })
                .catch((err) => {
                    //500 - Something wrong with server-side
                    res.status(500).send(err)
                })
        } else { //IF dont have ID (URL PARAM)...
            app.db('users')
                //Insert...
                .insert(user)
                .then(() => {
                    //204 - Everything OK - Without Content
                    res.status(204).send()
                })
                .catch((err) => {
                    //500 - Something wrong with server-side
                    res.status(500).send(err)
                })
        }

    }

    //Get Users 
    const get = (req, res) => {
        app.db('users')
            //Dont need the password
            .select('id', 'name', 'email', 'admin')
            .then((users) => { 
                res.json(users) 
            })
            .catch((err)=> {
                //500 - Something wrong with server-side
                res.status(500).send(err)
            })
    }

    //Get User
    const getById = (req, res) => {
        app.db('users')
            //Dont need password
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then((users) => { 
                res.json(users) 
            })
            .catch((err)=> {
                //500 - Something wrong with server-side
                res.status(500).send(err)
            })
    }

    return { save, get, getById }
}