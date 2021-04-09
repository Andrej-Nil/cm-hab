'use strict';
const body = document.querySelector('body');
const app = document.querySelector('#app');
const modalsWrap = app.querySelector('#modalsWrap');
const feetbackBtn = app.querySelector('#feetbackBtn');
const feetbackModal = app.querySelector('#feetback');
const modalCloseBtns = app.querySelectorAll('.js-close-modal');
const mobileMenuBtn = app.querySelector('#menuBtn');
const mobileMenu = app.querySelector('#mobileMenu');
const mobileMenuCloseBtn = app.querySelector('#mobileMenuClose');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', mobileMenuOpen);
}

if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', mobileMenuClose);
}

if (feetbackModal && modalsWrap) {
  feetbackBtn.addEventListener('click', feetbackOpen);
}

if (modalCloseBtns) {
  Array.from(modalCloseBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalClose(btn));
  });
}





//Функции

function feetbackOpen() {
  body.classList.add('no-scroll');
  modalsWrap.classList.add('modals--is-show');
  feetbackModal.classList.add('modal--is-show');
}

function modalClose(btn) {
  const modal = btn.closest(".js-modal");
  modal.classList.remove('modal--is-show');
  body.classList.remove('no-scroll');
  modalsWrap.classList.remove('modals--is-show');
}

function mobileMenuOpen() {
  mobileMenu.classList.add('mobile-menu--is-open');
}

function mobileMenuClose() {
  mobileMenu.classList.remove('mobile-menu--is-open');
}