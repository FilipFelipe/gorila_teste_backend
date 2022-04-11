module.exports = {

  production: {
      client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: 'knex_seeds',
      },
    },
    development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL_DEV,
      ssl: { 
        rejectUnauthorized: false 
      }
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'knex_seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL_TEST,
      ssl: { 
        rejectUnauthorized: false 
      }
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations_test',
    },
   
  }
}