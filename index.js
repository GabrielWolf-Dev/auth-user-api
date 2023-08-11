const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./db/connection");
const User = require("./models/User");

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

connection
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("----- Server is Running -----");
    });
  })
  .catch((error) => console.error(error.message));
