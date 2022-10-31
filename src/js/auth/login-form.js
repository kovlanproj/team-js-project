import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/auth';
import { addUser } from '../firebase/db-service';
import {
  addAuthBtns,
  removeAuthBtns,
  addNav,
  removeNav,
  renderNav,
  addLogOutButton,
} from './auth-nav';
import { validateData } from '../validation';

export const formBackdropRef = document.querySelector('.form-backdrop');

const btnRef = document.querySelectorAll('.btn');
const refs = {
  formSingInBtn: document.querySelector('.form-signin'),
  formSingUpBtn: document.querySelector('.form-signup'),
  frameRef: document.querySelector('.frame'),
  signUpItemRef: document.querySelector('.signup-inactive'),
  signInItemRef: document.querySelector('.signin-active'),
  btnSingUpClick: document.querySelector('.btn-signup'),
  btnSingInClick: document.querySelector('.btn-signin'),
  btnAnimateDiv: document.querySelector('.btn-animate'),
  btnAnimateSignupDiv: document.querySelector('.btn-animate-signup'),
  signinEmail: document.querySelector('.signin-email'),
  signinPassword: document.querySelector('.signin-password'),
  signupName: document.querySelector('.signup-name'),
  signupEmail: document.querySelector('.signup-email'),
  signupPassword: document.querySelector('.signup-password'),
  welcome: document.querySelector('.welcome'),
  frame: document.querySelector('.frame'),
  success: document.querySelector('.success'),
};

btnRef.forEach(ref => ref.addEventListener('click', onBtnClick));
if (refs.btnSingInClick) {
  refs.btnSingInClick.addEventListener('click', onBtnSignInClick);
}
if (refs.btnSingUpClick) {
  refs.btnSingUpClick.addEventListener('click', onBtnSignUpClick);
}

function onBtnClick() {
  refs.formSingInBtn.classList.toggle('form-signin-left');
  refs.formSingUpBtn.classList.toggle('form-signup-left');
  refs.frameRef.classList.toggle('frame-long');
  refs.signUpItemRef.classList.toggle('signup-active');
  refs.signUpItemRef.classList.toggle('signup-inactive');
  refs.signInItemRef.classList.toggle('signin-inactive');
  refs.signInItemRef.classList.toggle('signin-active');
  // btnRef.forEach(ref => ref.classList.add('active'));
}

function onBtnSignInClick() {
  const email = refs.signinEmail.value;
  const password = refs.signinPassword.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('auth', '1');
      addNav('index');
      removeAuthBtns();
      addLogOutButton();
      onLogin(`Welcome, ${user.email}`);
      setTimeout(() => {
        onCloseModal();
      }, 3000);
      refs.signinEmail.value = '';
      refs.signinPassword.value = '';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      onLogin(`Login Error. Wrong user or password.`);

      // refs.elems.formErrorLabel.textContent =

      //   'Login Error. Wrong user or password.';
      // ..
    });
}

function onAuthError() {
  setTimeout(() => {
    //   onCloseModal();
    refs.btnAnimateDiv.classList.toggle('btn-animate-grow');
    refs.welcome.classList.toggle('welcome-left');
    refs.welcome.style.color = '#232b55';
  }, 3000);
}

function onBtnSignUpClick() {
  const name = refs.signupName.value;
  const email = refs.signupEmail.value;
  const password = refs.signupPassword.value;
  console.log(validateData(name, email, password).error);

  if (validateData(name, email, password).error) {
    onLogin(`${validateData(name, email, password).error}`, '#fff');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('auth', '1');
      addNav('index');
      removeAuthBtns();
      addLogOutButton();
      onLogin(`Welcome, ${name}`, '#fff');
      setTimeout(() => {
        onCloseModal();
      }, 3000);
      addUser(user.uid, name);
      refs.signupName.value = '';
      refs.signupEmail.value = '';
      refs.signupPassword.value = '';
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      onLogin(`Sign Up Error. Something wrong.`, '#fff');
      setTimeout(() => {
        //   onCloseModal();
        refs.btnAnimateDiv.classList.toggle('btn-animate-grow');
        refs.welcome.classList.toggle('welcome-left');
        refs.welcome.style.color = '#232b55';
      }, 4000);
      // ..
    });
}

function onLogin(message, color = '#232b55') {
  refs.welcome.textContent = message;
  refs.welcome.style.color = color;
  refs.btnAnimateDiv.classList.add('btn-animate-grow');
  refs.welcome.classList.add('welcome-left');
  setTimeout(() => {
    //   onCloseModal();
    refs.welcome.classList.remove('welcome-left');
    refs.btnAnimateDiv.classList.remove('btn-animate-grow');

    refs.welcome.style.color = '#232b55';
  }, 3000);
}

// function onRegister() {
//   //   refs.frame.classList.toggle('nav-up');
//   //   refs.formSingUpBtn.classList.toggle('form-signup-down');
//   refs.welcome.textContent = 'hello';
//   refs.btnAnimateSignupDiv.classList.toggle('btn-animate-grow-signup');
//   refs.welcome.classList.toggle('welcome-left');

//   //   refs.success.classList.toggle('success-left');
// }

export function onLogOut() {
  auth.signOut();
}

export function onShowAuthModal() {
  formBackdropRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}

function onCloseModal() {
  formBackdropRef.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
  refs.btnAnimateDiv.classList.remove('btn-animate-grow');
  refs.welcome.classList.remove('welcome-left');
  // document.body.style.overflow = 'visible';
}

export function onClickBackdrop(e) {
  if (e.target.classList.contains('formbackdrop-close-modal')) {
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
