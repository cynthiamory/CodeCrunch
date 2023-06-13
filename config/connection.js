// DOTENV import
require("dotenv").config();

// SEQUELIZE IMPORT
const Sequelize = require("sequelize");

// ENVIRONMENT VARIABLES FOR CONNECTION
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// EXPORT SEQUELIZE CONNECTION
module.exports = sequelize;
