//This is a Migration

//We can create a new Migration using the command:
//knex migrate:make custom_name_for_migration

//To update to last migration:
//knex migrate:latest

//To rollback migrations:
//knex migrate:rollback

exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull()
        //The unsigned is need because incremets (from users) also add its
        table.integer('userId').unsigned().references('id')
            .inTable('users').notNull()
        //The unsigned is need because incremets (from category) also add its
        table.integer('categoryId').unsigned().references('id')
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};
