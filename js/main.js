'use strict';
const body = document.querySelector('body');


//modal
const modalsWrap = document.querySelector('#modalsWrap');
const feetbackBtn = document.querySelector('#feetbackBtn');
const fastOrdenBtns = document.querySelectorAll('.js-fast-order');
const feetbackModal = document.querySelector('#feetback');
const fastOrderModal = document.querySelector('#fastOrder');
const modalCloseBtns = document.querySelectorAll('.js-close-modal');
const ordenBtn = document.querySelector('#orderBtn');
const ordenModal = document.querySelector('#order');

//mobileMenu
const mobileMenuBtn = document.querySelector('#menuBtn');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileMenuCloseBtn = document.querySelector('#mobileMenuClose');


const upwardBtn = document.querySelector('#upwardBtn');
const upBtn = document.querySelector('#up');

const dropdownsBtn = document.querySelectorAll('.js-dropdown-btn');


const mainSlider = document.querySelector('#mainSlider');

const switchToggle = document.querySelector('#switchToggle');

if (switchToggle) {
  switchToggle.addEventListener('click', toggleSwitch);
}

if (mainSlider) {
  slider(mainSlider);
}


function slider(el) {
  const slideList = el.querySelector('.slides');
  const slides = el.querySelectorAll('.slide');
  let newSlidesArrey = slides
  const arrowNext = el.querySelector('.next');
  const arrowPrev = el.querySelector('.prev');

  const sensitivity = 30;
  let touchStart = null;
  let touchPosition = null;

  let isMove = false;
  const speed = 200;
  //const intervalTime = 0;
  if (slides.length == 1) {
    return;
  }
  arrowNext.addEventListener('click', next);
  arrowPrev.addEventListener('click', prev);
  //Начало движения
  el.addEventListener('touchstart', function (e) { startTouchMove(e) });
  el.addEventListener('touchmove', function (e) { touchMove(e) });
  el.addEventListener('touchend', function () { touchEnd(next, prev) });

  // управление стрелками
  function next() {
    if (isMove) {
      return
    }
    isMove = true;
    const slideWidth = slides[0].offsetWidth;
    //clearInterval(interval);

    slideList.style.cssText = `transition: ${speed}ms ease;`;
    slideList.style.transform = `translate(-${slideWidth}px, 0)`;

    setTimeout(() => {
      slideList.style.cssText = 'transition: none;';
      slideList.style.transform = `translate(0, 0)`;
      newSlidesArrey[newSlidesArrey.length - 1].after(newSlidesArrey[0]);
      newSlidesArrey = el.querySelectorAll('.slide');
      isMove = false;
      //interval = setInterval(next, intervalTime);
    }, speed);
  }

  function prev() {
    if (isMove) {
      return
    }
    const slideWidth = slides[0].offsetWidth;
    //isMove = true;
    //clearInterval(interval);
    newSlidesArrey[0].before(newSlidesArrey[newSlidesArrey.length - 1]);
    slideList.style.transform = `translate(-${slideWidth}px, 0)`;

    //slideList.style.cssText = `transition: ${speed}ms ease;`;
    //slideList.style.transform = `translate(0, 0)`;
    //setTimeout(() => {


    //}, speed);

    //setTimeout(() => {
    //  slideList.style.cssText = 'transition: none;';
    //  slideList.style.transform = `translate(0, 0)`;
    //isMove = false;
    //interval = setInterval(next, intervalTime);
    //}, speed + 1);

    newSlidesArrey = el.querySelectorAll('.slide');
  }

  //let interval = setInterval(next, intervalTime);

  function startTouchMove(e) {
    touchStart = e.changedTouches[0].clientX;
    touchPosition = touchStart;
  }

  //Отслеживает джижение
  function touchMove(e) {
    touchPosition = e.changedTouches[0].clientX;
  }

  // Конец движения
  function touchEnd(next, prev) {
    let distance = touchStart - touchPosition;
    if (distance > 0 && distance >= sensitivity) {
      next();
    }
    if (distance < 0 && distance * -1 >= sensitivity) {
      prev();
    }
  }

  function test() {
    slideList.style.cssText = `transition: ${speed}ms ease;`;
  }
}



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

function toggleSwitch() {
  const left = switchToggle.classList.contains('switch__toggle--is-left');
  const right = switchToggle.classList.contains('switch__toggle--is-right');
  if (!left) {
    switchToggle.classList.remove('switch__toggle--is-right');
    switchToggle.classList.add('switch__toggle--is-left');
    switchSection('left')
    return;
  }
  if (!right) {
    switchToggle.classList.remove('switch__toggle--is-left');
    switchToggle.classList.add('switch__toggle--is-right');
    switchSection('right')
    return;
  }

  function switchSection(section) {
    const switchLeft = document.querySelector('#switchLeft');
    const switchRight = document.querySelector('#switchRight');

    if (section === 'left') {
      switchLeft.style.display = 'block';
      switchRight.style.display = 'none';
    }
    if (section === 'right') {

      switchRight.style.display = 'block';
      switchLeft.style.display = 'none';
    }
  }
}

//map
let map;
let marker;
function initMap() {
  map = new ymaps.Map("map", {
    center: [56.836101, 60.614578],
    zoom: 16
  });
  marker = new ymaps.Placemark([56.836101, 60.614578], {
    hintContent: 'Расположение',
    balloonContent: 'Это наша организация'
  });
  map.geoObjects.add(marker);
}
ymaps.ready(initMap);

