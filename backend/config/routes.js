//Commom approach 
//const user = require('.../api/user')
//and "... .post(user.method)"
//But the consign allows us to use the following:
//app.api.user.save

module.exports = app => {
    app.route('/users')
        .get(app.api.user.get)      //Get
        .post(app.api.user.save)    //Create
        
    app.route('/users/:id')
        .put(app.api.user.save)     //Update (with id param)
}