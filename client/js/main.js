const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const sortSelect = document.getElementById("sortSelect");

let allMovies = [];

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

const applyFiltersAndSort = () => {
  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchValue)
  );

  if (sortValue === "popular") {
    filteredMovies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortValue === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === "newest") {
    filteredMovies.sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );
  }

  renderMovies(filteredMovies);
};

const loadMovies = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/movies");
    const movies = await response.json();

    allMovies = movies;
    applyFiltersAndSort();
  } catch (error) {
    console.error("Error loading movies", error);
  }
};

searchInput.addEventListener("input", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

loadMovies();