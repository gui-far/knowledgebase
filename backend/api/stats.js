module.exports = app => {

    //This is the default mongoose 
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        // the first "{}" is the "where". In this case no conditions
        // the second "{}" is the "fields". In this case nothing means "all fields / properties"
        Stat.findOne({}, {}, {sort: {'createAt': -1 } } )
            .then(stat =>{

                //This is just to return some json if cannot find stats
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                }

                //return stats
                res.json(stat || defaultStat)

            })
    }

    return {Stat, get}
}