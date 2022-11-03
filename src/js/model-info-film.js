import { auth } from './firebase/auth';
import { onShowAuthModalFromFilmModal } from './auth/login-form';
import { readData, insertData, deleteData } from './firebase/db-service';
import { onPosterClick } from './showTrailer.js';

function fetchFilmPhoto(posterPath) {
  const noPosterAvaliable =
    'https://www.reelviews.net/resources/img/default_poster.jpg';

  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : noPosterAvaliable;
}
const modalHolder = document.querySelector('.modal-holder');
const modalBtnWrap = document.querySelector('.modal-btn-wrap');
const modalRef = document.querySelector('.modal-holder');
const posterRef = document.querySelector('.js-poster');

modalHolder.addEventListener('click', onClickModalHolder);
posterRef.addEventListener('click', onPosterClick);

function onCloseModal() {
  modalHolder.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

function onClickModalHolder(e) {
  if (e.target.classList.contains('modal-holder')) {
    onCloseModal();
  }
}

function onPressESC(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

export function updateButtons(id) {
  modalBtnWrap.innerHTML =
    "<button type='button' class='modal-btn js-watch film-js-watch' data-id=''>ADD TO WATCHED</button><button type='button' class='modal-btn js-queue film-js-queue' data-id=''>ADD TO QUEUE</button>";
  modalRef.querySelector('.film-js-watch').setAttribute('data-id', id);
  modalRef.querySelector('.film-js-queue').setAttribute('data-id', id);

  modalRef
    .querySelector('.film-js-watch')
    .addEventListener('click', onWatchBtnClick);
  modalRef
    .querySelector('.film-js-queue')
    .addEventListener('click', onQueueBtnClick);
}

function onWatchBtnClick() {
  const watchBtn = modalRef.querySelector('.film-js-watch');
  if (watchBtn.hasAttribute('in-list')) {
    deleteData(watchBtn.getAttribute('key'), 'watchlist').then(() => {
      watchBtn.textContent = 'add to watched';
      watchBtn.removeAttribute('in-list');
      watchBtn.classList.remove('active');
    });
  } else {
    insertData(watchBtn.getAttribute('data-id'), 'watchlist')
      .then(() => {
        watchBtn.textContent = 'Delete from watched';
        watchBtn.setAttribute('in-list', '');
        watchBtn.classList.add('active');
        readData('watchlist').then(res => {
          const data = res.find(
            res => res.val === watchBtn.getAttribute('data-id')
          );
          if (data) {
            watchBtn.setAttribute('key', data.key);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function onQueueBtnClick() {
  const queueBtn = modalRef.querySelector('.film-js-queue');
  if (queueBtn.hasAttribute('in-list')) {
    deleteData(queueBtn.getAttribute('key'), 'queue').then(() => {
      queueBtn.textContent = 'add to queue';
      queueBtn.removeAttribute('in-list');
      queueBtn.classList.remove('active');
    });
  } else {
    insertData(queueBtn.getAttribute('data-id'), 'queue')
      .then(() => {
        queueBtn.textContent = 'Delete from queue';
        queueBtn.setAttribute('in-list', '');
        queueBtn.classList.add('active');
        readData('queue').then(res => {
          const data = res.find(
            res => res.val === queueBtn.getAttribute('data-id')
          );
          if (data) {
            queueBtn.setAttribute('key', data.key);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// export function updateWatchlistBtn(id) {
//   modalBtnWrap.innerHTML =
//     "<button type='button' class='modal-btn js-watch film-js-watch' data-id=''>ADD TO WATCHED</button>";
//   modalRef.querySelector('.film-js-watch').setAttribute('data-id', id);
// }

// export function updateQueueBtn(id) {
//   modalBtnWrap.innerHTML =
//     "<button type='button' class='modal-btn js-queue film-js-queue' data-id=''>ADD TO QUEUE</button>";
//   modalRef.querySelector('.film-js-queue').setAttribute('data-id', id);
// }

function checkAddedMovieInList(id, array) {
  return array.find(elem => elem.val === id);
}

// readData('watchlist').then(array => {});

export async function showInfoModal(api, id) {
  const data = await api.getMovieInfo(id);

  modalRef
    .querySelector('.film-info-modal-img')
    .setAttribute('src', fetchFilmPhoto(data.poster_path));

  modalRef.querySelector('.film-info-modal-name').innerHTML = data.title;
  modalRef.querySelector('.film-modal-table__vote ').innerHTML =
    data.vote_average;
  modalRef.querySelector('.film-modal-table__votes').innerHTML =
    data.vote_count;
  modalRef.querySelector('.film-modal-table__value-popularity').innerHTML =
    data.popularity;
  modalRef.querySelector('.film-modal-table__value-original').innerHTML =
    data.original_title;
  modalRef.querySelector('.film-modal-table__value-genres').innerHTML =
    data.genres
      .map(genre => {
        return genre.name;
      })
      .join(', ');
  modalRef.querySelector('.film-film-description').innerHTML = data.overview;

  modalRef.querySelector('.modal-btn-wrap').setAttribute('data-id', id);
  posterRef.setAttribute('data-id', id);

  if (auth.currentUser) {
    const watchlist = await readData('watchlist');
    const queue = await readData('queue');
    updateButtons(id);
    const watchBtn = modalRef.querySelector('.film-js-watch');
    const queueBtn = modalRef.querySelector('.film-js-queue');
    const checkWatched = checkAddedMovieInList(id, watchlist);
    const checkQueue = checkAddedMovieInList(id, queue);

    if (checkWatched) {
      watchBtn.textContent = 'Delete from watched';
      watchBtn.setAttribute('in-list', '');
      watchBtn.setAttribute('key', checkWatched.key);
      watchBtn.classList.add('active');
    }
    if (checkQueue) {
      queueBtn.textContent = 'Delete from queue';
      queueBtn.setAttribute('in-list', '');
      queueBtn.setAttribute('key', checkQueue.key);
      queueBtn.classList.add('active');
    }
  } else {
    modalBtnWrap.innerHTML =
      '<button type="button" class="modal-btn js-login-modal-btn">To add movie to list, please LogIn</button>';
    modalRef
      .querySelector('.js-login-modal-btn')
      .addEventListener('click', onShowAuthModalFromFilmModal);
  }

  modalRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}
