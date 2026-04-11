//builds the application

const express = require("express");     //imports express
const cors = require("cors");           //imports CORS (Allows frontend & backend communication)

const healthRoutes = require("./routes/healthRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();                  //creates Express application

app.use(cors());                       //activate CORS globally
app.use(express.json());                //request cancontain JSON                                             

app.use("/api", healthRoutes);
app.use("/api", movieRoutes);

module.exports = app;                     //exports the app to server