import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './tui-pagination';

const refs = {
    paginationList: document.querySelector('.tui-pagination')
};

refs.paginationList.addEventListener('click', onClickPagination)

function onClickPagination() {
    page = pagination.getCurrentPage();
    savePaginationLocalStorage(page)
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
};

function savePaginationLocalStorage(page) {
    localStorage.setItem('page', JSON.stringify(page));
};