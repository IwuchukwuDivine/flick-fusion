import { sideBar } from "./sidebar.js";

import { apiKey, imageBaseUrl, fetchDataFromServer } from "./api.js";

import {createMovieCard} from "./movie-card.js";

import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sideBar();

// home page sections

const homePageSections = [{
  title: "Upcoming Movies",
  path: "/movie/upcoming"
},
{
  title: "Trending Movies for the Week",
  path: "/trending/movie/week"
},{
  title: "Top Rated Movies",
  path: "/movie/top_rated"
}
]

const genreList = {
  // create genre string from genre id eg [23, 42] -> "Action, Romance"
  asString(genreIdList) {
    let newGenreList = [];
    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]);
      // this == genreList
    }
    return newGenreList.join(", ");
  }
};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, function({genres}) {
  for (const {id, name} of genres) {
    genreList[id] = name;
  }
  fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`, heroBanner);
});



function heroBanner({results: movieList}) {
  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "popular movies";
  banner.innerHTML = `
  <div class="banner-slider">
    
  </div>
  <div class="slider-control">
    <div class="control-inner">
      
    </div>
  </div>
  `;

  let controlItemIndex = 0;
  for (const [index, movie] of movieList.entries()) {
    const {
      genre_ids,
      backdrop_path,
      title,
      release_date,
      overview,
      poster_path,
      vote_average,
      id
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");
    sliderItem.innerHTML = `
      <img src="${imageBaseUrl}w1280${backdrop_path}" class="img-cover" alt="${title}" loading=${index === 0 ? "eager" : "lazy"}>
      <div class="banner-content">
        <h2 class="heading">
        ${title}
        </h2>
        <div class="meta-list">
          <div class="meta-item">${release_date.split("-")[0]}</div>
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
          <p class="genre">${genreList.asString(genre_ids)}</p>
          <p class="banner-text">${overview}</p>
          <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
            <img src="./images/play_circle.png" aria-hidden="true" height="24" width="24" alt="">
            <span class="span">Watch Now</span>
          </a>
        </div>
    `;
    banner.querySelector(".banner-slider").appendChild(sliderItem);

    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);

    controlItemIndex++;

    controlItem.innerHTML =  `
    <img src="${imageBaseUrl}w154${poster_path}" loading="lazy" alt="${title}" draggable="false" class="img-cover">
    `;
    banner.querySelector(".control-inner").appendChild(controlItem);
  }

  pageContent.appendChild(banner);

  addHeroSlide();


  // fetch data for home page sections(top ratedd, upcoming)
  for (const {title, path} of homePageSections) {
    fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${apiKey}&page=1`, createMovieList, title);
  }
}
// hero slider functionality

function addHeroSlide() {
  const sliderItems = document.querySelectorAll("[slider-item]");
  const sliderControls = document.querySelectorAll("[slider-control]");
  let lastSliderItem = sliderItems[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  function sliderStart() {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    // this == slider-control
    sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
    this.classList.add("active");

    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  }

  sliderControls.forEach(slideControl => {
    slideControl.addEventListener("click", sliderStart);
  })
}

function createMovieList({results: movieList}, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = `${title}`;
  movieListElem.innerHTML = `
  <div class="title-wrapper">
  <h3 class="title-large">
    ${title}
  </h3>
  </div>
  <div class="slider-list">
    <div class="slider-inner">
      
    </div>
  </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);  
    // called from movie_card.js

    movieListElem.querySelector(".slider-inner").appendChild(movieCard);

    pageContent.appendChild(movieListElem);
  }
}

search();