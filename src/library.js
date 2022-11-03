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
import './js/onLibraryBtnsClick';
import { libraryList } from './js/renderLibraryList';

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

// import MovieApiService from './js/movie-service';
// import genre from './genres.json';
// import { showInfoModal } from './js/model-info-film';

// const api = new MovieApiService();

// const cardList = document.querySelector('.js-films-list-library');
// const infoModal = document.querySelector('.modal-holder');

// export const watchList = [
//   724495, 436270, 944864, 436270, 944864, 724495, 436270, 944864, 724495,
//   436270, 944864, 724495, 436270, 944864, 724495, 436270, 944864, 724495,
//   436270, 944864, 724495, 436270, 944864, 724495, 436270, 944864, 724495,
//   436270, 944864, 724495, 436270, 944864, 724495, 436270, 944864, 724495,
//   436270, 944864, 724495, 436270, 944864, 724495, 436270, 944864, 724495,
// ];
// export const queueList = [436270, 944864, 724495];

// const watchlist = [49046, 913290, 766475];
// const movies = watchlist.map(api.getMovieInfo);

// async function promiceAll(movies) {
//   refs.filmsContainer.innerHTML = '<span class="loader"></span>';
//   await Promise.all(movies)
//     .then(array => {
//       refs.filmsContainer.innerHTML = '';
//       createFilmCardMarkup(array);
//     })
//     .catch(console.log);
// }

// promiceAll(movies);

// function createFilmCardMarkup(films) {
//   console.log(films);
//   const newMarkup = films
//     .map(film => {
//       const {
//         original_title,
//         poster_path,
//         vote_average,
//         release_date,
//         genres,
//         id,
//       } = film;
//       const fIlmIds = genres.map(genre => genre.id);
//       const year = new Date(release_date).getFullYear();
//       return `<li data-id="${id}" class="card film-card">
//                         <div class="film-card__img-wrap">
//                             <img
//                                 class="film-card__img"
//                                 src=${fetchFilmPhoto(poster_path)}
//                                 alt="Poster to movie"
//                                 width="395"
//                                 height="574"
//                             />
//                         </div>
//                         <div class="film-card__wrap">
//                             <h2 class="film-card__title">${original_title}</h2>
//                             <div class="film-card__wrapper">
//                                 <span class="film-card__info">${getGenres(
//                                   fIlmIds
//                                 ).join(', ')} | ${year}</span>
//                                 <span data-film-rating class="film-card__rating">${vote_average.toFixed(
//                                   2
//                                 )}</span>
//                             </div>
//                         </div>
//                     </li>`;
//     })
//     .join('');
//   cardList.innerHTML = newMarkup;

//   // cardList.addEventListener('click', event => {
//   //   const card = event.target.closest('li');
//   //   if (card) {
//   //     const cardId = card.getAttribute('data-id');
//   //     showInfoModal(infoModal, api, cardId);
//   //   }
//   // });
// }

// function fetchFilmPhoto(posterPath) {
//   const noPosterAvaliable =
//     'https://www.reelviews.net/resources/img/default_poster.jpg';

//   return posterPath
//     ? `https://image.tmdb.org/t/p/w500${posterPath}`
//     : noPosterAvaliable;
// }

// function getGenres(ids) {
//   let newArray = [];
//   for (let i = 0; i < ids.length; i += 1) {
//     genre.genres.find(({ id, name }) => {
//       if (id === ids[i]) {
//         newArray.push(name);
//       }
//     });
//   }
//   if (newArray.length > 2) {
//     newArray.splice(2, 3, 'Other');
//   }
//   return newArray;
// }
