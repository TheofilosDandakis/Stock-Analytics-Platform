const mapMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: "",
    rating: movie.vote_average,
    releaseDate: movie.release_date,
    popularity: movie.popularity,
    genre: movie.genre_ids ? movie.genre_ids.join(", ") : ""
});

const getAllMovies = async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    
        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`);
        };
    
        const data = await response.json()
        const movies = data.results.map(mapMovie);
        res.json(movies);
    }
    catch (error) {
        console.error("Error loading movies from TMDB:", error);
        res.status(500).json({ message: "Failed to load movies"});
    }
};

const searchMovies = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.json([]);
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB error: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results.map(mapMovie);

    res.json(movies);
  } catch (error) {
    console.error("Error searching movies from TMDB:", error);
    res.status(500).json({ message: "Failed to search movies" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const movieId = req.params.id;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ message: "Movie not found" });
      }
      throw new Error(`TMDB error: ${response.status}`);
    }

    const movie = await response.json();

    res.json({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      popularity: movie.popularity,
      overview: movie.overview,
      runtime: movie.runtime,
      genres: movie.genres,
    });
  } catch (error) {
    console.error("Error loading movie details from TMDB:", error);
    res.status(500).json({ message: "Failed to load movie details" });
  }
};

module.exports = {
    getAllMovies,
    searchMovies,
    getMovieById,
};