import { IMAGE_URL } from './movie-service';
import genree from '../genres.json';

export function createFilmCardMarkup(filmData) {
  const {
    poster_path,
    genre_ids,
    id,
    title,
    release_date,
    vote_average,
    genres,
  } = filmData;
  const genresArr = genree.genres?.map(({ id }) => id) || [];
  const filmGenresId = genre_ids?.slice(0, 3) || genresArr;
  const filmGenres = [];
  for (const filmId of filmGenresId) {
    for (const genre of genree.genres) {
      if (filmId === genre.id) {
        filmGenres.push(genre.name);
      }
    }
  }

  const filmGenresString = filmGenres.join(', ');

  const filmDate = release_date?.slice(0, 4) || '...';
  const filmPoster = poster_path
    ? IMAGE_URL + poster_path
    : 'https://www.reelviews.net/resources/img/default_poster.jpg';

  return `<li data-id="${id}" class="card film-card">
        <div class="film-card__img-wrap">
            <img
                class="film-card__img"
                src=${filmPoster}
                alt=${title}
            />
        </div>
        <h2 class="film-card__title">${title}</h2>
        <div class="film-card__wrap">
            <span class="film-card__info">${filmGenresString} | ${filmDate}</span>
            <span data-film-rating class="film-card__rating">${vote_average}</span>
        </div>
    </li>`;
}
