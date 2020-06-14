const queries = require('./queries')

module.exports = app => {
    //Destructuring...
    const { existsOrError } = app.api.validations

    //Create New or Update
    const save = (req, res) => {

        //se articles with JSON Request properties
        const article = { ...req.body }

        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Name not informed')
            existsOrError(article.name, 'Description not informed')
            existsOrError(article.name, 'Category not informed')
            existsOrError(article.name, 'Author not informed')
            existsOrError(article.name, 'Content not informed')

        } catch (msg) {
            //400 - Something wrong with user-side
            res.status(400).send(msg)
        }

        //IF has Id (set by URL PARAM)...
        if (article.id) {
            app.db('articles')
                //Update...
                .update(article)
                .where({ id: article.id })
                .then(() => {
                    //204 - Everything OK - Without Content
                    res.status(204).send()
                })
                .catch((err) => {
                    //500 - Something wrong with server-side
                    res.status(500).send(err)
                })
        } else { //IF dont have ID (URL PARAM)...
            app.db('articles')
                //Insert...
                .insert(article)
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

    //Delete 
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id })
                .del()

            existsOrError(rowsDeleted, 'Article not found')

            //204 - Everything OK - Without Content
            res.status(204).send()

        } catch (msg) {
            //500 - Something wrong with server-side
            res.status(500).send(msg)
        }
    }

    //Pagination Limit
    const limit = 10

    //This get will have pagination feature
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id as count').first()

        const count = parseInt(result.count) //I HAVE AND ISSUE HERE, CANT GET COUNT VALEU, IT KEEPS UNDEFINED, I WILL FIX IT LATER

        //Select with limit and offset, so we can get the correct data
        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            //500 - Something wrong with server-side
            .catch(err => res.status(500).send(err))
    }

    //Get Article by ID (From params)
    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then((article) => {
                article.content = article.content.toString()
                //return article
                return res.json(article)
            })
            .catch((err) => {
                //500 - Something wrong with server-side
                res.status(500).send(err)
            })
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1

        //Raw query, find all category children
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)

        //I had to convert to access the data
        //Create a new array only with catagoryId
        const categoriesJSON = JSON.parse(JSON.stringify(categories))
        const ids = categoriesJSON[0].map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.categoryId', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            //offset here for pagination
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            //Pass all "ids" found from one node to be used by SQL
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            //return articles found
            .then(articles => res.json(articles))
            //500 - Something wrong with server-side
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }

}