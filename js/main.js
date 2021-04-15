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
const elementLinks = document.querySelectorAll('.js-element-link');

const upwardBtn = document.querySelector('#upwardBtn');
const upBtn = document.querySelector('#up');

const dropdownsBtn = document.querySelectorAll('.js-dropdown-btn');

const mainSlider = document.querySelector('#mainSlider');
const productCarusel = document.querySelector('#productCarusel');

const switchToggle = document.querySelector('#switchToggle');

const map = document.querySelector('#map');

let yandexMap;
let marker;

const sensitivity = 20;
let touchStart = null;
let touchPosition = null;


if (elementLinks.length) {
  Array.from(elementLinks).forEach((link) => {
    link.addEventListener('click', () => showIElement(link));
  });
}

if (productCarusel) {
  carusel(productCarusel);
}



if (map) {
  ymaps.ready(initMap);
}

if (switchToggle) {
  switchToggle.addEventListener('click', toggleSwitch);
}

if (mainSlider) {
  slider(mainSlider, true);
}

function slider(el, autoplay = false) {
  const slideWrap = el.querySelector('#sliderWrap');
  const slides = el.querySelectorAll('.js-slide');
  const numLastSlide = slides.length - 1;
  const arrowNext = el.querySelector('#nextSlideBtn');
  const arrowPrev = el.querySelector('#prevSlideBtn');
  let isMove = false;
  const timeInterval = 8000;
  let moveInterval = setInterval(next, timeInterval);

  //управление стрелками
  if (arrowNext) {
    arrowNext.addEventListener('click', next);
  }
  if (arrowPrev) {
    arrowPrev.addEventListener('click', prev);
  }


  //Управление сенсером
  slideWrap.addEventListener('touchstart', function (e) { startTouchMove(e) });
  slideWrap.addEventListener('touchmove', function (e) { touchMove(e) });
  slideWrap.addEventListener('touchend', function () { touchEnd(next, prev) });

  if (!autoplay) {
    clearInterval(moveInterval);
  }

  // функции управление стрелками
  function next() {
    if (isMove) {
      return;
    }
    if (autoplay) {
      clearInterval(moveInterval);
    }

    isMove = true;
    const step = slides[0].offsetWidth;
    let newSlidesArr = el.querySelectorAll('.js-slide');
    slideWrap.style.transform = `translate(-${step}px, 0)`;
    slideWrap.classList.add('slides--is-move');
    setTimeout(() => {
      slideWrap.style.transform = `translate(0, 0)`;
      slideWrap.classList.remove('slides--is-move');
      newSlidesArr[numLastSlide].after(newSlidesArr[0]);
      isMove = false;
      if (autoplay) {
        moveInterval = setInterval(next, timeInterval);
      }
    }, 200);
  }

  function prev() {
    if (isMove) {
      return;
    }
    if (autoplay) {
      clearInterval(moveInterval);
    }
    isMove = true;
    const step = slides[0].offsetWidth;
    slideWrap.classList.remove('slides--is-move');
    let newSlidesArr = el.querySelectorAll('.js-slide');
    newSlidesArr[0].before(newSlidesArr[numLastSlide]);
    slideWrap.style.transform = `translate(-${step}px, 0)`;
    setTimeout(() => {
      slideWrap.classList.add('slides--is-move');
      slideWrap.style.transform = `translate(0, 0)`;
    }, 20);
    setTimeout(() => {
      isMove = false;
      if (autoplay) {
        moveInterval = setInterval(next, timeInterval);
      }
    }, 220);
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

if (fastOrdenBtns.length) {
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
//Слайдеры
function carusel(el) {
  const slideWrap = el.querySelector('#caruselSlidesWrap');
  const slideTreck = el.querySelector('#caruselSlides');
  const slides = el.querySelectorAll('.js-carusel-slide');
  const slidesLenght = slides.length;
  const prevArrow = el.querySelector('#caruselArrowPrev');
  const nextArrow = el.querySelector('#caruselArrowNext');
  const dotList = el.querySelectorAll('.js-carusel-dote');
  const caruselDotsWrap = el.querySelector('#caruselDots');
  const caruselDotsTreck = el.querySelector('#caruselDotsTreck');
  const caruselDotsSlides = el.querySelectorAll('.js-carusel-dote-slide');

  let i = 0;
  let isMove = false;

  window.addEventListener('resize', treckShift, false);

  // управление стрелками
  if (nextArrow) {
    nextArrow.addEventListener('click', next);
  }

  if (prevArrow) {
    prevArrow.addEventListener('click', prev);
  }

  // управление точками
  if (dotList.length) {
    Array.from(dotList).forEach((el, idx) => {
      el.addEventListener('click', () => {
        dotNavigation(idx)
      })
    })
  }

  if (caruselDotsWrap) {
    Array.from(caruselDotsSlides).forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        dotNavigation(idx);
      })
    });
  }

  //Управление сенсером
  slideWrap.addEventListener('touchstart', function (e) { startTouchMove(e) });
  slideWrap.addEventListener('touchmove', function (e) { touchMove(e) });
  slideWrap.addEventListener('touchend', function () { touchEnd(next, prev) });

  // функции управление стрелками
  function next() {
    if (i == slidesLenght - 1) {
      return;
    }
    i++;
    treckShift();
    setActiveDot(dotList, 'dot--is-active');
    treckDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');

  }

  function prev() {
    if (i == 0) {
      return;
    }
    i--;
    treckShift();
    setActiveDot(dotList, 'dot--is-active');
    treckDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');
  }
  // функции управление точками
  function dotNavigation(idx) {
    i = idx;
    treckShift();
    setActiveDot(dotList, 'dot--is-active');
    treckDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');
  }

  //функции движения
  function treckShift() {
    const step = slideWrap.offsetWidth;
    const slideTreckShift = i * step;
    slideTreck.style.transform = `translate(-${slideTreckShift}px, 0)`;
  }

  function treckDotsShift() {
    let countDot = i - 1;

    if (countDot < 0) {
      countDot = 0;
    }
    if (i >= caruselDotsSlides.length - 1) {
      countDot = caruselDotsSlides.length - 3
    }

    const dotHeight = caruselDotsSlides[0].offsetHeight;
    const dotMarginBottom = parseInt(getComputedStyle(caruselDotsSlides[0], true).marginBottom);
    const step = dotHeight + dotMarginBottom;
    const dotsTreckShift = countDot * step;
    caruselDotsTreck.style.transform = `translate(0, -${dotsTreckShift}px)`;
  }
  //функция присваивающая активный клас точке
  function setActiveDot(dots, cls) {
    Array.from(dots).forEach((dot, idx) => {
      dot.classList.remove(cls);
      if (idx == i) {
        dot.classList.add(cls);
      }
    });
  }
}
//Слайдеры конец

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

function showIElement(elementLink) {
  const elements = document.querySelectorAll('.js-element');
  const idElement = elementLink.dataset.type;

  Array.from(elementLinks).forEach((el) => {
    el.classList.remove('product-info__item--is-active')
  });

  elementLink.classList.add('product-info__item--is-active');

  Array.from(elements).forEach((el) => {
    const elId = el.getAttribute('id');
    el.classList.remove('product-info__text--is-active')
    if (elId == idElement) {
      el.classList.add('product-info__text--is-active')
    }
  });
}

//Функции Отслеживающие джижение по сенсеру
// и опроеделяющик длину движения
function startTouchMove(e) {
  touchStart = e.changedTouches[0].clientX;
  touchPosition = touchStart;
}

function touchMove(e) {
  touchPosition = e.changedTouches[0].clientX;
}

function touchEnd(next, prev) {
  let distance = touchStart - touchPosition;
  if (distance > 0 && distance >= sensitivity) {
    next();
  }
  if (distance < 0 && distance * -1 >= sensitivity) {
    prev();
  }
}

//map
function initMap() {
  yandexMap = new ymaps.Map("map", {
    center: [56.836101, 60.614578],
    zoom: 16
  });
  marker = new ymaps.Placemark([56.836101, 60.614578], {
    hintContent: 'Расположение',
    balloonContent: 'Это наша организация'
  });
  yandexMap.geoObjects.add(marker);
}