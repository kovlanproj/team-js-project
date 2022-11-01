function fetchFilmPhoto(posterPath) {
    const noPosterAvaliable =
      'https://www.reelviews.net/resources/img/default_poster.jpg';
  
    return posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : noPosterAvaliable;
  }

export async function showInfoModal(modalRef, api, id) {
    const data = await api.getMovieInfo(id);

    console.log(data);

    modalRef.querySelector('.film-info-modal-img').setAttribute('src', fetchFilmPhoto(data.poster_path));

    modalRef.querySelector('.film-info-modal-name').innerHTML = data.title;
    modalRef.querySelector('.film-modal-table__vote ').innerHTML = data.vote_average;
    modalRef.querySelector('.film-modal-table__votes').innerHTML = data.vote_count;
    modalRef.querySelector('.film-modal-table__value-popularity').innerHTML = data.popularity;
    modalRef.querySelector('.film-modal-table__value-original').innerHTML = data.original_title;
    modalRef.querySelector('.film-modal-table__value-genres').innerHTML = data.genres.map(genre =>{
        return genre.name;
    }).join(', ');
    modalRef.querySelector('.film-film-description').innerHTML = data.overview;

    modalRef.querySelector('.film-js-watch').setAttribute('data-id', id);
    modalRef.querySelector('.film-js-queue').setAttribute('data-id', id);

    modalRef.classList.remove('is-hidden');
}