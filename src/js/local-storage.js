export function saveInputLocalStorage(query) {
    localStorage.setItem('loc', JSON.stringify(query));
}

export function parseInputLocalStorege() {
    return JSON.parse(localStorage.getItem('loc'));
}

export function savePaginationLocalStorage(page) {
    localStorage.setItem('page', JSON.stringify(page));
}

export function parsePaginationLocalStorage() {
    return JSON.parse(localStorage.getItem('page'));
}