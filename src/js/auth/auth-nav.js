import refs from '../refs';
import { onLogOut } from './login-form';
export function addAuthBtns() {
  refs.elems.authBtnsDiv.innerHTML =
    "<button class='nav__item-button button' id='modal-btn-auth'>SignIn / SignUp</button>";
}

export function removeAuthBtns() {
  refs.elems.authBtnsDiv.innerHTML = '';
}
export function addLogOutButton() {
  refs.elems.authBtnsDiv.innerHTML =
    "<button class='nav__item-button button' id='log-out'>Log Out </button>";
  document.querySelector('#log-out').addEventListener('click', onLogOut);
}

export function addNav(activePage) {
  if (activePage === 'index') {
    refs.elems.navigation.innerHTML =
      "<li class='nav__item active'><a class='nav__link' href='index.html'>HOME</a></li><li class='nav__item nav__item-auth'><a class='nav__link' href='./library.html'>MY LIBRARY</a></li>";
  }
  if (activePage === 'library') {
    refs.elems.navigation.innerHTML =
      "<li class='nav__item'><a class='nav__link' href='index.html'>HOME</a></li><li class='nav__item nav__item-auth active'><a class='nav__link' href='./library.html'>MY LIBRARY</a></li>";
  }
}

export function removeNav() {
  refs.elems.navigation.innerHTML = '';
}

export function renderNav(activePage) {
  if (localStorage.getItem('auth') === '1') {
    addNav(activePage);
    removeAuthBtns();
    addLogOutButton();
  } else {
    addAuthBtns();
    removeNav();
    if (activePage === 'library') {
      location.replace('./index.html');
    }
  }
}
