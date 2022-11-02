import { auth } from './firebase/auth';
import { onShowAuthModalFromFilmModal } from './auth/login-form';
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

modalHolder.addEventListener('click', onClickModalHolder);

function onCloseModal() {
  modalHolder.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

function onClickModalHolder(e) {
  if (e.target.classList.contains('modal-holder')) {
    onCloseModal();
    document.body.style.overflow = 'visible';
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
}

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

  if (auth.currentUser) {
    updateButtons(id);
  } else {
    modalBtnWrap.innerHTML =
      '<button type="button" class="modal-btn js-login-modal-btn">To add movie to list, please LogIn</button>';
    modalRef
      .querySelector('.js-login-modal-btn')
      .addEventListener('click', onShowAuthModalFromFilmModal);
  }

  modalRef.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onPressESC);
}
