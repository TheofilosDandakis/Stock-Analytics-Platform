const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  searchMovies,
  getMovieById,
} = require("../controllers/movieController");

router.get("/movies/search", searchMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies", getAllMovies);

module.exports = router;