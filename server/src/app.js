//builds the application

const express = require("express");     //imports express
const cors = require("cors");           //imports CORS (Allows frontend & backend communication)

const app = express();                  //creates Express application

app.use(cors());                       //activate CORS globally
app.use(express.json());                //request cancontain JSON

app.get("/api/health", (reg,res) => {               //creates the first route
    res.json({ message: "Server is running" });     //returns JSON request
});                                                 

module.exports = app;                     //exports the app to server