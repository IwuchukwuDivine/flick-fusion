import { apiKey, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";


export function search() {
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchField = document.querySelector(".search-field");


  const searchResultsModal = document.createElement("div");
  searchResultsModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultsModal);

  let searchTimeout;

  searchField.addEventListener("input", () => {
    // if search field is empty or contains only white space 
    if (!searchField.value.trim()) {
      searchResultsModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return
    }

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchField.value}&include_adult=false&page=1`, function({results: movieList}) {
      searchWrapper.classList.remove("searching");
      searchResultsModal.classList.add("active");
      // remove old results
      searchResultsModal.innerHTML = "";
      searchResultsModal.innerHTML = `
        <p class="label">Results for</p>
        <h1 class="heading">${searchField.value}</h1>
        <div class="movie-list">
          <div class="grid-list"></div>
        </div>
      `;

      for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        searchResultsModal.querySelector(".grid-list").appendChild(movieCard);
      }
      });
    }, 500)
  });
}

