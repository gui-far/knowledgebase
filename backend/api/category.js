//Remember that "app" have the "db" propertie
//It was set inside "index.js"
module.exports = app => {

    //Validation functions
    //Remember the functions below throws msg as error
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    //Create New or Update
    const save = (req, res) => {

        //Destructure from JSON Request (was "body-parsed")
        const category = { ...req.body }

        //Check for URL params
        if (req.params.id) category.id = req.params.id

        try {
            //Validate request data
            existsOrError(category.name, 'Name not informed')
        } catch (msg) {
            //400 - Something wrong with user-side
            return res.status(400).send(msg)
        }

        //IF has Id (set by URL PARAM)...
        if (category.id) {
            app.db('categories')
                //Update...
                .update(category)
                .where({ id: category.id })
                .then(() => {
                    //204 - Everything OK - Without Content
                    res.status(204).send()
                })
                .catch((err) => {
                    //500 - Something wrong with server-side
                    res.status(500).send(err)
                })
        } else { //IF dont have ID (URL PARAM)...
            app.db('categories')
                //Insert...
                .insert(category)
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
            //Validate request data
            existsOrError(req.params.id, 'Invalid Category ID')

            //Search and Check for Subcategory
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'This Category has Subcategories')

            //Search and Check for Articles
            const articles = await app.db('categories')
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'This Category has Articles')

            //Check if any categories have been excluded, otherwise category not found
            const rowsDeleted = await app.dbo('categories')
                .where({ id: req.params.id }).del()
            notExistsOrError(rowsDeleted, 'Category not found')

            //204 - Everything OK - Without Content
            res.status(204).send()
        } catch (msg) {
            //400 - Something wrong with user-side
            res.status(400).send(msg)
        }
    }

    //Function that create patch for categories and subcategories "map"
    //So the function recieve this "categories" parameter
    const withPath = categories => {

        //This is an auxiliar function to find the parent category
        //So we recieve the categories array and the parentId
        const getParent = (categories, parentId) => {
            //And check if each category correspond to             
            const parent = categories.filter(parent => parent.id === parentId)
            //Return the parent category
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            //Here we get the category name
            let path = category.name
            //And here we will get the parent of the category above
            let parent = getParent(categories, category.parentId)

            //while find parent (from function getParent inside this while)
            while (parent) {
                //path = ParentCategory > ChildCategory
                path = `${parent.name} > ${path}`
                //Note that the second parameter is the "first" parent found above
                parent = getParent(categories, parent.parentId)
            }

            //return object "plus" path
            return { ...category, path }

        })

        //This will sort the array content
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.pth > b.path) return 1
            return 0
        })

        //Return the "sorted" Array 
        return categoriesWithPath
    }

    //Get All categories
    const get = (req, res) => {
        app.db('categories')
            .then((categories => {
                res.json(withPath(categories))
            }))
            .catch((err) => {
                //500 - Something wrong with server-side
                res.status(500).send(err)
            })
    }

    //Get Category by Id
    const getById = (req, res) => {
        app.db('categories')
        .where({id: req.params.id})
        .first()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            //500 - Something wrong with server-side
            res.status(500).send(err)
        })
    }

    return { save, remove, get, getById }

}