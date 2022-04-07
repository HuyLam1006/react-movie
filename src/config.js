export const fetcher = (...args) => fetch(...args).then((res) => res.json())
export const apiKey = 'd2298ed8119a3da2a34b928d8b497bfa'
const tmdbEndpoint = 'https:api.themoviedb.org/3/movie'
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieDetaills: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
}
