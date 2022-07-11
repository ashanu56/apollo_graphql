require('dotenv').config({});
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALET, DB_HOST} = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALET,
    host: DB_HOST,
  }
};