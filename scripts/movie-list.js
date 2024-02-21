import { apiKey, fetchDataFromServer, imageBaseUrl } from "./api.js";
import { sideBar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");


sideBar();

let currentPage = 1;
let totalPages = 0;


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function({results: movieList, total_pages}){
    totalPages = total_pages;

    document.title = `${genreName} Movies - Flick Fusion`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;
    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="heading">
    All ${genreName} Movies
    </h3>
    </div>
    <div class="grid-list"></div>
    <button class="btn load-more" load-more>Load More</button>
    `;

  // add movie card based on fetched item

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);

    movieListElem.querySelector(".grid-list").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);

  const LoadBtn = document.querySelector(".load-more");
  
  document.querySelector("[load-more]").addEventListener("click", () => {
    if(currentPage >= totalPages) {
      this.style.display = none;
      return;
    }

    currentPage++;
    LoadBtn.classList.add("loading");

    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({results: movieList}) => {
      LoadBtn.classList.remove("loading");

      for (const movie of movieList) {
        const movieCard = createMovieCard(movie);
    
        movieListElem.querySelector(".grid-list").appendChild(movieCard);
      }
    });
  })
});

search();