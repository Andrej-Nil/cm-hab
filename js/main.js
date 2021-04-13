'use strict';
const body = document.querySelector('body');
const app = document.querySelector('#app');

//modal
const modalsWrap = app.querySelector('#modalsWrap');
const feetbackBtn = app.querySelector('#feetbackBtn');
const fastOrdenBtns = app.querySelectorAll('.js-fast-order');
const feetbackModal = app.querySelector('#feetback');
const fastOrderModal = app.querySelector('#fastOrder');
const modalCloseBtns = app.querySelectorAll('.js-close-modal');
const ordenBtn = app.querySelector('#orderBtn');
const ordenModal = app.querySelector('#order');

//mobileMenu
const mobileMenuBtn = app.querySelector('#menuBtn');
const mobileMenu = app.querySelector('#mobileMenu');
const mobileMenuCloseBtn = app.querySelector('#mobileMenuClose');


const upwardBtn = app.querySelector('#upwardBtn');
const upBtn = app.querySelector('#up');

const dropdownsBtn = app.querySelectorAll('.js-dropdown-btn');

let timeOut;

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', mobileMenuOpen);
}

if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', mobileMenuClose);
}

//modals
if (feetbackModal && modalsWrap) {
  feetbackBtn.addEventListener('click', () => {
    modalOpen(feetbackModal);
  });
}

if (fastOrderModal && modalsWrap) {
  Array.from(modalCloseBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalClose(btn));

  });
}

if (fastOrdenBtns) {
  Array.from(fastOrdenBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalOpen(fastOrderModal));
  });
}

if (ordenBtn) {
  ordenBtn.addEventListener('click', () => modalOpen(ordenModal));
}

if (ordenModal && modalsWrap) {
  Array.from(modalCloseBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalClose(btn));
  });
}


// modals end

if (upwardBtn) {
  upwardBtn.addEventListener('click', goTop);
  window.addEventListener('scroll', showUpBtn);
}


if (dropdownsBtn) {
  Array.from(dropdownsBtn).forEach((btn) => {
    btn.addEventListener('click', () => dropdownOpen(btn));
    btn.addEventListener('click', () => rotateArrowDropdownsBtn(btn));
  });
}


//Функции
function modalOpen(modal) {
  body.classList.add('no-scroll');
  modalsWrap.classList.add('modals--is-show');
  modal.classList.add('modal--is-show');
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


function goTop() {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -150);
    timeOut = setTimeout('goTop()', 5);
  } else clearTimeout(timeOut);
}

function showUpBtn() {
  const coord = body.getBoundingClientRect();
  if (coord.top < -1000) {
    upBtn.classList.add('up--is-show');
  } else {
    upBtn.classList.remove('up--is-show');
  }
}

function dropdownOpen(btn) {
  const dropdown = btn.closest('.js-dropdown');
  const dropdownBody = dropdown.querySelector('.js-dropdown-body');
  const dropdownContent = dropdown.querySelector('.js-dropdown-content');
  const dropdownContentHeight = dropdownContent.offsetHeight;
  if (dropdownBody.offsetHeight == 0) {
    dropdownBody.style.height = dropdownContentHeight + 'px';
  } else {
    dropdownBody.style.height = 0;
  }

}

function rotateArrowDropdownsBtn(btn) {
  const arrow = findChildren(btn, '.category__arrow');
  arrow.classList.toggle('category__arrow--is-up')
}

function findChildren(el, domClass) {
  const children = el.querySelector(domClass);
  return children;
}

