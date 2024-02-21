import { apiKey, fetchDataFromServer } from "./api.js";

export function sideBar () {
  const genreList = {};

  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, function({genres}) {
    for (const {id, name} of genres) {
      genreList[id] = name;
    }

    genreLink();
  });

  const sideBarInner = document.createElement("div");
  sideBarInner.classList.add("sidebar-inner");
  sideBarInner.innerHTML = `
  <div class="sidebar-list">
    <p class="title">Genre</p>
  </div>
  <div class="sidebar-list">
    <p class="title">Language</p>
    
    <a href="./movie-list.html" menu-close class="sidebar-link" onclick="getMovieList("with_original_language=en", "English")">English</a>
    <a href="./movie-list.html" menu-close class="sidebar-link" onclick="getMovieList("with_original_language=hi", "Hindi")">Hindi</a>
    <a href="./movie-list.html" menu-close class="sidebar-link" onclick="getMovieList("with_original_language=bn", "Bengali")">Bengali</a>
  </div>
  <div class="sidebar-footer">
    <p class="copyright">
      Copyright @ Flick Fusion 2024
    </p>
    <img src="./images/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
  </div>
  `;
 
  function genreLink() {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const Link = document.createElement("a");
      Link.classList.add("sidebar-link");
      Link.setAttribute("href", "./movie-list.html");
      Link.setAttribute("menu-close", "");
      Link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
      Link.textContent = genreName;
      sideBarInner.querySelectorAll(".sidebar-list")[0].appendChild(Link);
    }

    const sidebar = document.querySelector('[sidebar]');
    sidebar.appendChild(sideBarInner);
    toggleSidebar(sidebar);

  }
  function toggleSidebar(sidebar) {
    // toggle side bar for mobile screen
    const sideBarBtn = document.querySelector('[menu-btn]');
    const sideBarTogglers = document.querySelectorAll("[menu-toggler]");
    const sideBarClose = document.querySelectorAll("[menu-close]");
    const overLay = document.querySelector(".overlay");
    sideBarTogglers.forEach(toggler => {
      toggler.addEventListener('click', () => {
        sidebar.classList.toggle("active");
        sideBarBtn.classList.toggle("active");
        overLay.classList.toggle("active");
      })
    });

    sideBarClose.forEach(sideBar => {
      sideBar.addEventListener('click', () => {
        sideBar.classList.remove("active");
        sideBarBtn.classList.remove("active");
        overLay.classList.remove("active");
      });
    })
  }
}
