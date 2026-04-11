const movies = require("../data/mockMovies");

const getAllMovies = (req, res) => {
    res.json(movies);
};

const getMovieById = (req, res) => {
    const requestedId = Number(req.params.id);

    const movie = movies.find(
        (movieItem) => movieItem.id === requestedId
    );

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
};

module.exports = {
    getAllMovies,
    getMovieById,
};