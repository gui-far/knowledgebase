//Knex is a "SQL Query Builder"
//It will help with database queries

//To create this file, run: knex init

module.exports = {

    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: '3306',
      database: 'knowledge_final',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'mysql_migrations'
    }

};
