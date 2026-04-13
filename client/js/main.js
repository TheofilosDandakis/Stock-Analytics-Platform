const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const sortSelect = document.getElementById("sortSelect");

let currentMovies = [];
let searchTimeout;

const renderMovies = (movies) => {
  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ Rating: ${movie.rating}</p>
      <p>📅 Release: ${movie.releaseDate}</p>
    `;

    moviesContainer.appendChild(movieCard);
  });
};

const sortMovies = (movies) => {
  const sortValue = sortSelect.value;
  const sortedMovies = [...movies];

  if (sortValue === "popular") {
    sortedMovies.sort((a, b) => b.popularity - a.popularity);} 
  else if (sortValue === "rating") {
    sortedMovies.sort((a, b) => b.rating - a.rating);} 
  else if (sortValue === "newest") {
    sortedMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }

  return sortedMovies;
};

const loadMovies = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/movies");
    const movies = await response.json();

    currentMovies = movies;
    renderMovies(sortMovies(currentMovies));
  }
  catch (error) {
    console.error("Error loading movies", error);
  }
};

const searchMovies = async (query) => {
  try {
    const response = await fetch(`http://localhost:5000/api/movies/search?q=${query}`);

    const movies = await response.json();
    
    currentMovies = movies;
    renderMovies(sortMovies(currentMovies));
  }
  catch (error) {
    console.error("Error searching movies.", error);
  }
};

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    if (value ==="") {
      loadMovies();}
    else {
      searchMovies(value);}
  }, 400);
});

sortSelect.addEventListener("change", () => {
  renderMovies(sortMovies(currentMovies));
});

loadMovies();