const express = require("express");     
const cors = require("cors");           

const healthRoutes = require("./routes/healthRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();              

app.use(cors());                      
app.use(express.json());                                                           

app.use("/api", healthRoutes);
app.use("/api", movieRoutes);

module.exports = app;                    