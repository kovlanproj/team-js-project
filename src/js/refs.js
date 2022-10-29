export default {
  btns: {
    signUpBtn: document.querySelector('#modal-btn-record'),
    signInBtn: document.querySelector('#modal-btn-auth'),
    loginFormBtn: document.querySelector('#loginBtn'),
    registerFormBtn: document.querySelector('#registerBtn'),
    logOutBtn: document.querySelector('#log-out'),
  },
  inputs: {
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    name: document.querySelector('#name'),
  },
  elems: {
    overlay: document.querySelector('.js-overlay-modal'),
    modalForm: document.querySelector('.js-modal-form'),
    authBtnsDiv: document.querySelector('.nav__btn-wrapper'),
    formErrorLabel: document.querySelector('.login-error'),
    navigation: document.querySelector('.nav__list'),
  },
};
