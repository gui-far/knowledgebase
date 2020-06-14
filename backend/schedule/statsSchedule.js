//Schedule Jobs lib
const schedule = require('node-schedule')

module.exports = app => {

    //"CRON SCHEDULE PATTERN"
    //'*/1 * * * *' means "Once a minute"
    schedule.scheduleJob('*/1 * * * *' , async function () {

        //Counting each Entity from SQL
        const userCount = await app.db('users').count('id as count').first()
        const categoriesCount = await app.db('categories').count('id as count').first()
        const articlesCount = await app.db('articles').count('id as count').first()

        //Retrieve Stat Model used by Mongoose
        const {Stat} = app.api.stats

        //Save the actual stats inside Mongoose model
        //So we'll be able to use ".save()"
        const stat = new Stat({
            users: userCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        //Look for last stats (old ones)
        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt' : -1 } } )

        //Avoiding error when have no stats checking if data changed or no stats found
        
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            //Use ".save()" enabled by Mongoose Model and show message 
            stat.save().then(() => console.log('[Stats] Stats Updated!'))
        }
    })
}