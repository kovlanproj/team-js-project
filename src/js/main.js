import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './tui-pagination';
import genre from '../genres.json';
let page = 0;
let filmName = '';

const refs = {
    paginationList: document.querySelector('.tui-pagination'),
    form: document.querySelector('.input__wraper'),
    input: document.querySelector('.header__input'),
    cardList: document.querySelector('.films__list')
};

refs.form.addEventListener('submit', fetchFilms);
refs.paginationList.addEventListener('click', onClickBtnPagination);
refs.input.addEventListener('input', returnPopularFilms);


fetchPopularFilms(parsePaginationLocalStorage() || page);

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
    page = 1;
    filmName = e.currentTarget.elements.search.value;
    savePaginationLocalStorage(page);
    // return fetchNecessaryFilm(filmName, page);
}

function onClickBtnPagination() {
    page = pagination.getCurrentPage();
    savePaginationLocalStorage(page);
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
    fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=1e47046f2fa6627c23534650c78833b4&page=${page}`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
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
                    />
                </div>
            <h2 class="film-card__title">${original_title}</h2>
            <div class="film-card__wrap">
                <span class="film-card__info">${getGenres(genre_ids).join(', ')} | ${year}</span>
                <span data-film-rating class="film-card__rating">${vote_average.toFixed(2)}</span>
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

function saveInputLocalStorage(query) {
    localStorage.setItem('loc', JSON.stringify(query));
}

function parseInputLocalStorege() {
    return JSON.parse(localStorage.getItem('loc'));
}

function savePaginationLocalStorage(page) {
    localStorage.setItem('page', JSON.stringify(page));
}

function parsePaginationLocalStorage() {
    return JSON.parse(localStorage.getItem('page'));
}
