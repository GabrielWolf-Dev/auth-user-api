const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./db/connection");
const UserRoutes = require("./routes/UserRoutes");

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
app.use("/users", UserRoutes);

connection
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("----- Server is Running -----");
    });
  })
  .catch((error) => console.error(error.message));
