const apiKey = "5c005042804f455daaa2ab606143915e";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function(url, callback, optionalParam) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}


export {imageBaseUrl, apiKey, fetchDataFromServer };