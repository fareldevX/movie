const API_KEY = "820c0d0ce4f7881e3c2811da2bd22c40";
let page = 1;

const API_URL = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const toggleBtn = document.querySelector(".search-toggle");

toggleBtn.addEventListener("click", () => {
  searchForm.classList.toggle("active");
});

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function updatePage() {
  getMovies(API_URL());
  currentPage.innerHTML = page;
}

function prevPage() {
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

function nextPage() {
  if (page >= 1) {
    page += 1;
    updatePage();
  }
}

prev.addEventListener("click", () => {
  prevPage();
});

next.addEventListener("click", () => {
  nextPage();
});

function showMovies(movies) {
  moviesEl.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <img src=${IMG_URL + poster_path} alt=${title} />
        <div class="detail">
         <h3>${title}</h3>
         <p>${overview.substring(0, 200)}...</p>
        </div>
        `;
    // Add event listener to the movie card

    moviesEl.appendChild(movieCard);
  });
}

function displaySearch() {
  currentPage.style.display = "none";
  prev.style.display = "none";
  next.style.display = "none";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = search.value;

  if (searchQuery !== "") {
    getMovies(SEARCH_URL + searchQuery);
    search.value = "";
  }

  displaySearch();
});

updatePage();

title.addEventListener("click", () => {
  location.reload();
});
