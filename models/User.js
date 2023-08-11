const { DataTypes } = require("sequelize");

const db = require("../db/connection");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  phone: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

module.exports = User;
