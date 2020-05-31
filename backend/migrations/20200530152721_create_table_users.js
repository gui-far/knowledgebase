//This is a Migration

//We can create a new Migration using the command:
//knex migrate:make custom_name_for_migration

//To update to last migration:
//knex migrate:latest

//To rollback migrations:
//knex migrate:rollback

exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
