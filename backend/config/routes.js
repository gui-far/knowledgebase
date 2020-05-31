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
        .get(app.api.user.getById)  //Get (with id param)    
        .put(app.api.user.save)     //Update (with id param)


    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

    app.route('/categories/: id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

}