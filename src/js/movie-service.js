import axios from 'axios';

export const API_KEY = '1e47046f2fa6627c23534650c78833b4';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const lang = 'en-US';

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getMoviesList() {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`
    );

    return response.data;
  }

  async getMovie(query) {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${lang}&query=${query}`
    );
    return response.data;
  }

  async getMovieInfo(id) {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${lang}`
    );
    return response.data;
  }

  async getMovieTrailers(id) {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${lang}`
    );
    return response.data;
  }
  getStartPage() {
    return (this.page = 1);
  }
  nextPage() {
    this.page += 1;
  }
  previousPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
  setPage(newPage) {
    this.page = newPage;
  }
}
