import Pagination from "tui-pagination";
import 'tui-pagination/dist/tui-pagination.css';

const options = {
    totalItems: 0,
    visiblePages: 4,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child'
};

const tuiContainer = document.querySelector('.tui-pagination');

const pagination = new Pagination(tuiContainer, options)

export default pagination;