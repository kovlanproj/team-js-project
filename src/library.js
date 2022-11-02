import { auth } from './js/firebase/auth';
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import refs from './js/refs';
import {
  addAuthBtns,
  removeAuthBtns,
  addNav,
  removeNav,
  renderNav,
  addLogOutButton,
} from './js/auth/auth-nav';
import { insertData, readData } from './js/firebase/db-service';

renderNav('library');

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem('auth', 1);
    removeAuthBtns();
    // addNav('library');
    addLogOutButton();
    // insertData(7, 'watchlist');
  } else {
    console.log('User is signed out');
    localStorage.setItem('auth', 0);
    location.replace('./index.html');
  }
});

import MovieApiService from './js/movie-service';
import genre from './genres.json';
import { showInfoModal } from './js/model-info-film';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './js/tui-pagination';

const api = new MovieApiService()

const cardList = document.querySelector('.js-films-list-library')
const infoModal = document.querySelector('.modal-holder')
const paginationList = document.querySelector('.tui-pagination')
let size = 20; //размер подмассива
let subarray = []; //массив в который будет выведен результат.


paginationList.addEventListener('click', onClickBtnPagination);

const watchlist = [49046, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475, 913290, 766475];
const movies = watchlist.map(api.getMovieInfo);
fetchFilms()
function fetchFilms() {
  Promise.all(movies)
    .then((array) => {
      if (array.length > 20) {
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
          subarray[i] = array.slice((i * size), (i * size) + size);
        }
      }
      pagination.reset(subarray.length * 10)
      createFilmCardMarkup(subarray[api.page - 1])
      pagination.movePageTo(api.page);
    })
    .catch(console.log);
}


function onClickBtnPagination() {
  api.page = pagination.getCurrentPage();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  fetchFilms()
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
      const fIlmIds = genres.map(genre => genre.id
      )
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

  // cardList.addEventListener('click', event => {
  //   const card = event.target.closest('li');
  //   if (card) {
  //     const cardId = card.getAttribute('data-id');
  //     showInfoModal(infoModal, api, cardId);
  //   }
  // });
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