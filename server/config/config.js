const dotenv = require('dotenv');

dotenv.config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    dialect: 'postgres',
    logging: false,
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
