import MovieApiService from './js/movie-service';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './js/tui-pagination';
import genre from './genres.json';
import MovieApiService from './js/movie-service';
import {
  saveInputLocalStorage,
  savePaginationLocalStorage,
  parseInputLocalStorege,
  parsePaginationLocalStorage,
} from './js/local-storage';

import { auth } from './js/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {
  onShowAuthModal,
  formBackdropRef,
  onClickBackdrop,
} from './js/auth/login-form';
import {
  addAuthBtns,
  removeAuthBtns,
  addNav,
  removeNav,
  renderNav,
  addLogOutButton,
} from './js/auth/auth-nav';

renderNav('index');
const loginBtnRef = document.querySelector('#modal-btn-auth');
if (loginBtnRef) {
  loginBtnRef.addEventListener('click', onShowAuthModal);
}
formBackdropRef.addEventListener('click', onClickBackdrop);

let filmName = '';

const refs = {
  paginationList: document.querySelector('.tui-pagination'),
  form: document.querySelector('.input__wraper'),
  input: document.querySelector('.header__input'),
  cardList: document.querySelector('.films__list'),
  selectedPage: document.querySelector('.tui-is-selected'),
};

const api = new MovieApiService();

refs.form.addEventListener('submit', fetchFilms);
refs.paginationList.addEventListener('click', onClickBtnPagination);
refs.input.addEventListener('input', returnPopularFilms);

fetchPopularFilms(parsePaginationLocalStorage() || api.getStartPage());

function returnPopularFilms(evt) {
  saveInputLocalStorage(evt.target.value);
  const inputValue = evt.target.value;
  if (inputValue === '') {
    savePaginationLocalStorage(1);
    fetchPopularFilms(1);
  }
}

function fetchFilms(evt) {
  evt.preventDefault();
  pagination.reset();
  api.resetPage();
  filmName = e.currentTarget.elements.search.value;
  savePaginationLocalStorage(api.page);
  // return fetchNecessaryFilm(filmName, page);
}

function onClickBtnPagination() {
  api.page = pagination.getCurrentPage();
  savePaginationLocalStorage(api.page);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  if (filmName === '') {
    return fetchPopularFilms(parsePaginationLocalStorage());
  }
  // return fetchNecessaryFilm(filmName, parsePaginationLocalStorage());
}

function fetchPopularFilms(page) {
  api.setPage(parsePaginationLocalStorage() || api.getStartPage());
  api
    .getMoviesList()
    .then(({ results, total_pages }) => {
      pagination.reset(total_pages * 10);
      createFilmCardMarkup(results);
      pagination.movePageTo(page);
    })
    .catch(console.log);
}

function createFilmCardMarkup(films) {
  const newMarkup = films
    .map(film => {
      const {
        original_title,
        poster_path,
        vote_average,
        release_date,
        genre_ids,
        id,
      } = film;
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
                                  genre_ids
                                ).join(', ')} | ${year}</span>
                                <span data-film-rating class="film-card__rating">${vote_average.toFixed(
                                  2
                                )}</span>
                            </div>
                        </div>
                    </li>`;
    })
    .join('');
  refs.cardList.innerHTML = newMarkup;
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

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem('auth', '1');
    removeAuthBtns();
    addNav('index');
    addLogOutButton();
  } else {
    console.log('User is signed out');
    localStorage.setItem('auth', '0');
    addAuthBtns();
    removeNav();
    document
      .querySelector('#modal-btn-auth')
      .addEventListener('click', onShowAuthModal);
  }
});

// const api = new MovieApiService();

// api.getMoviesList().then(console.log);
// api.getMovie('bullet').then(console.log);
// api.getMovieInfo('913290').then(console.log);
// api.getMovieTrailers('913290').then(console.log);
