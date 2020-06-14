//This is a Migration

//We can create a new Migration using the command:
////knex migrate:m/Actual = ake add_deleted_at_table_users

//To update to last migration:
//knex migrate:latest

//To rollback migrations:
//knex migrate:rollback

//ADDING THE deletedAt column with NULL value
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt').nullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
      table.dropColumn('deletedAt')
  })
};
