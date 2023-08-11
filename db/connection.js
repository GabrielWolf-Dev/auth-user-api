const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Database successfully connected!");
} catch (error) {
  console.error("Error connecting to database!", error.message);
}

module.exports = sequelize;
