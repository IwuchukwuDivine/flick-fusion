const searchBox = document.querySelector('.search-box');
const searchTogglers = document.querySelectorAll('[search-toggler]');

searchTogglers.forEach((toggler) => {
  toggler.addEventListener('click', () => {
    searchBox.classList.toggle('active');
  })
})

// store movie id n local storage when you click on any movie card

function getMovieDetail (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
}

function getMovieList (urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
}