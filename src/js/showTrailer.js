import MovieApiService from './movie-service';

const api = new MovieApiService();

async function chooseTrailer(id) {
  const res = await api.getMovieTrailers(id);

  const trailers = res.filter(res => res.type === 'Trailer');

  const urls = trailers.map(trailer => `https://youtu.be/${trailer.key}`);
  console.log(urls);
}

export function onPosterClick(e) {
  const id = e.target.getAttribute('data-id');

  chooseTrailer(id);
}
