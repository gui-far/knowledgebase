//This is a Migration

//We can create a new Migration using the command:
//knex migrate:make custom_name_for_migration

//To update to last migration:
//knex migrate:latest

//To rollback migrations:
//knex migrate:rollback

exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        //The unsigned is need because incremets also add its
        table.integer('parentId').unsigned().references('id')
            .inTable('categories')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
