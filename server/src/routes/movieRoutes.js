const express = require("express");
const router = express.Router();

const { getAllMovies, getMovieById } = require("../controllers/movieController");

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);

module.exports = router;