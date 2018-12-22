// API/TMDBApi.js

const API_TOKEN = "f3046bc9073b5d2ed8c3f0c22e5bac0c";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

// récupère l'image de associé au film depuis l'API
export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}