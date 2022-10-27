import MovieApiService from './js/movie-service';

const api = new MovieApiService();

api.getMoviesList().then(console.log);
api.getMovie('bullet').then(console.log);
api.getMovieInfo('913290').then(console.log);
api.getMovieTrailers('913290').then(console.log);
