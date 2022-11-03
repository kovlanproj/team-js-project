import MovieApiService from './movie-service';
import refs from './refs';

refs.trailerBackdrop.addEventListener('click', onBackdropClick);

const api = new MovieApiService();

async function chooseTrailer(id) {
  const res = await api.getMovieTrailers(id);
  const trailers = res.filter(res => res.type === 'Trailer');
  return trailers.map(trailer => trailer.key);
}

export function onPosterClick(e) {
  const id = e.target.getAttribute('data-id');
  chooseTrailer(id).then(array => {
    refs.trailerContainer.innerHTML = addScript(array);
    console.log(addScript(array));
    showTrailer();
  });
}

export function showTrailer() {
  refs.trailerBackdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
  // document.querySelector('body').style.overflow = 'hidden';
}

function onCloseTrailer() {
  refs.trailerBackdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

function onBackdropClick(e) {
  if (e.target.classList.contains('trailer-holder')) {
    onCloseTrailer();
  }
}

function onPressESC(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseTrailer();
  }
}

function addScript(keyArray) {
  return keyArray
    .map(
      key =>
        `<div class="trailer-item">
        <iframe  width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
    )
    .join('');
}
