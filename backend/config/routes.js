//Check if user is admin
const admin = require('./admin')

//Commom approach 
//const user = require('.../api/user')
//and "... .post(user.method)"
//But the consign allows us to use the following:
//app.api.user.save


module.exports = app => {

    app.post('/signup', app.api.user.save) //user.save - But here the role will be "not admin"
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .get(app.api.user.get)
        .post(app.api.user.save)    //user.save - But here the role can be admin or not admin 

    app.route('/users/:id')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)

    app.route('/categories')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.category.get)
        .post(app.api.category.save)

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())    //This will add the ".user" to the "req"
        .get(app.api.stats.get)
}