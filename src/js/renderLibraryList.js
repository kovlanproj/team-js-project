import MovieApiService from './movie-service';
import genre from '../genres.json';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showInfoModal } from './model-info-film';
import { readDataArray } from './firebase/db-service';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './tui-pagination';
import refs from './refs';

const api = new MovieApiService();
const cardList = document.querySelector('.js-films-list-library');
const paginationList = document.querySelector('.tui-pagination');
paginationList.addEventListener('click', onClickBtnPagination);
let size = 20; //размер подмассива
let subarray = [];

export async function libraryList(type) {
  try {
    refs.filmsContainer.innerHTML = '<span class="loader"></span>';
    const list = await readDataArray(type);
    await renderLibraryList(list);
    refs.filmsContainer.innerHTML = '';
  } catch (error) {
    console.log(error.message);
  }
}

export function renderLibraryList(list) {
  const movies = list.map(api.getMovieInfo);

  if (movies.length === 0) {
    subarray = [];
    pagination.reset(subarray.length * 10);
    Notify.info('Sorry, the movie list is empty :(', {
      timeout: 6000,
    });
    return (cardList.innerHTML = []);
  } else {
    return Promise.all(movies)
      .then(array => {
        if (array.length > 20) {
          for (let i = 0; i < Math.ceil(array.length / size); i++) {
            subarray[i] = array.slice(i * size, i * size + size);
          }
        } else {
          subarray = [];
          subarray[0] = array;
        }

        pagination.reset(subarray.length * 10);
        createFilmCardMarkup(subarray[api.page - 1]);
        pagination.movePageTo(api.page);
      })
      .catch(console.log);
  }
}

function onClickBtnPagination() {
  api.page = pagination.getCurrentPage();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  libraryList(api.getType());
}

function createFilmCardMarkup(films) {
  const newMarkup = films
    .map(film => {
      const {
        original_title,
        poster_path,
        vote_average,
        release_date,
        genres,
        id,
      } = film;
      const fIlmIds = genres.map(genre => genre.id);
      const year = new Date(release_date).getFullYear();
      return `<li data-id="${id}" class="card film-card">
                        <div class="film-card__img-wrap">
                            <img
                                class="film-card__img"
                                src=${fetchFilmPhoto(poster_path)}
                                alt="Poster to movie"
                                width="395"
                                height="574"
                            />
                        </div>
                        <div class="film-card__wrap">
                            <h2 class="film-card__title">${original_title}</h2>
                            <div class="film-card__wrapper">
                                <span class="film-card__info">${getGenres(
                                  fIlmIds
                                ).join(', ')} | ${year}</span>
                                <span data-film-rating class="film-card__rating">${vote_average.toFixed(
                                  2
                                )}</span>
                            </div>
                        </div>
                    </li>`;
    })
    .join('');
  cardList.innerHTML = newMarkup;

  cardList.addEventListener('click', event => {
    const card = event.target.closest('li');
    if (card) {
      const cardId = card.getAttribute('data-id');
      showInfoModal(api, cardId);
      api.setIsLibrary(true);
    }
  });
}

function fetchFilmPhoto(posterPath) {
  const noPosterAvaliable =
    'https://www.reelviews.net/resources/img/default_poster.jpg';

  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : noPosterAvaliable;
}

function getGenres(ids) {
  let newArray = [];
  for (let i = 0; i < ids.length; i += 1) {
    genre.genres.find(({ id, name }) => {
      if (id === ids[i]) {
        newArray.push(name);
      }
    });
  }
  if (newArray.length > 2) {
    newArray.splice(2, 3, 'Other');
  }
  return newArray;
}
