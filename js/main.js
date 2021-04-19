'use strict';

const _token = getToken();
const POST = 'POST';
const GET = 'GET';
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

// Forms
const callbackForm = document.querySelector('#callbackForm');

//mobileMenu
const mobileMenuBtn = document.querySelector('#menuBtn');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileMenuCloseBtn = document.querySelector('#mobileMenuClose');
const elementLinks = document.querySelectorAll('.js-element-link');

const upwardBtn = document.querySelector('#upwardBtn');
const upBtn = document.querySelector('#up');

const dropdownsBtn = document.querySelectorAll('.js-dropdown-btn');
//Карусели
const mainSlider = document.querySelector('#mainSlider');
const productCarusel = document.querySelector('#productCarusel');
const popularGoods = document.querySelector('#popularGoods');
const sectionSlider = document.querySelector('#sectionSlider');
const newsSlider = document.querySelector('#newsSlider');

const switchToggle = document.querySelector('#switchToggle');

const map = document.querySelector('#map');

const regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/;
const regMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

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

if (map) {
  ymaps.ready(initMap);
}

if (switchToggle) {
  switchToggle.addEventListener('click', toggleSwitch);
}

//карусели
if (mainSlider) {
  slider(mainSlider, true);
}

if (popularGoods) {
  slider(popularGoods, false);
}

if (newsSlider) {
  slider(newsSlider, false);
}
if (sectionSlider) {
  slider(sectionSlider);
}
if (productCarusel) {
  carusel(productCarusel);
}

// Forms
if (callbackForm) {
  callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendCallbackForm();
}

function sendCallbackForm() {
  const api = callbackForm.action;
  const mailInput = callbackForm.querySelector('.js-mail-input');
  const fileInput = callbackForm.querySelector('.js-file-input');
  const fileName = callbackForm.querySelector('.js-file-name');
  const checkbox = callbackForm.querySelector('.js-checkbox');
  const checkboxInput = callbackForm.querySelector('.js-checkbox-input');
  const submitBtn = callbackForm.querySelector('.js-submit');
  const formMessage = callbackForm.querySelector('.js-message');
  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  })
  fileInput.addEventListener('change', () => setFileName(fileInput, fileName));
  submitBtn.addEventListener('click', formCheck)
  function formCheck() {
    let res = true;
    let formData = null;
    res = checkInput(mailInput);

    if (!checkboxInput.checked) {
      test('not send, checked false');
      checkbox.classList.add('animation-shake');
      setTimeout(() => {
        checkbox.classList.remove('animation-shake');
      }, 800)
      return;
    }

    if (!res) {
      test('not send, input false, checked true');
      return;
    }
    formData = new FormData(callbackForm);
    //formData
    send(POST, formData, api)
      .then((data) => setMessage(data, formMessage))
  }
}

function setMessage(data, el) {
  el.innerHTML = data.desc;
  if (data.rez == 1) {
    el.classList.add('form-error--is-success');
    el.classList.remove('form-error--is-error');
  }
  if (data.rez != 1) {
    el.classList.remove('form-error--is-success');
    el.classList.add('form-error--is-error');
  }
}

function send(method, data, api) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, api, true);
    xhr.send(data);

    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log('Ошибка: ' + xhr.status);
        return;
      } else {
        let response = JSON.parse(xhr.response);
        resolve(response);
        if (response) {
          console.log("Форма отправилась");
        } else {
          console.log("Неудачная отправка");
        }
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"))
    };
  })
}


function setFileName(input, el) {
  const fileName = input.files[0].name;
  el.innerHTML = fileName;
}
function checkInput(input) {
  const resChecking = checkValue(input.value, regMail);
  if (resChecking) {
    input.classList.remove('input--is-error');
    input.classList.add('input--is-success');
    return true;
  } else {
    input.classList.remove('input--is-success');
    input.classList.add('input--is-error');
    return false;
  }

}
function checkValue(value, reg) {
  return reg.test(value)
}

function slider(el, autoplay = false) {
  const slideWrap = el.querySelector('.js-slider-wrap');
  const slides = el.querySelectorAll('.js-slide');
  const numLastSlide = slides.length - 1;
  const arrowNext = el.querySelector('.js-next');
  const arrowPrev = el.querySelector('.js-prev');
  const dots = el.querySelectorAll('.js-dot');
  let dataSlide = null;
  let i = 0;
  let newSlidesArr = null;
  let isMove = false;
  let moveInterval = null
  const timeInterval = 8000
  if (slides.length == 1) {
    return;
  }

  //управление интервалом
  intervalSwitch(autoplay, true, timeInterval);

  slideWrap.addEventListener('mouseover', () => {
    intervalSwitch(autoplay);
  });
  slideWrap.addEventListener('mouseout', () => {
    intervalSwitch(autoplay, true, timeInterval);
  });

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

  //управление точками
  //if (dots.length) {
  //  Array.from(dots).forEach((dot, idx) => {
  //    dot.addEventListener('click', () => {
  //      dotsNavigation(idx);
  //    });
  //  })
  //}

  //function dotsNavigation(idx) {
  //  newSlidesArr = el.querySelectorAll('.js-slide');
  //  const numFirstSlide = +newSlidesArr[0].getAttribute('data-slide');
  //  const numberOfSteps = numFirstSlide - idx * 1;
  //  if (numFirstSlide === idx) {
  //    return;
  //  }
  //  if (numFirstSlide < idx) {
  //    movingForward(numberOfSteps);
  //  }

  //  if (numFirstSlide > idx) {
  //    movingBackwards()
  //    console.log(numFirstSlide, idx)
  //  }
  //}

  //function movingForward(num) {
  //  const slideWidth = newSlidesArr[0].offsetWidth;
  //  const numberOfSteps = Math.abs(num);
  //  const step = numberOfSteps * slideWidth;

  //  slideWrap.classList.add('slides--is-move');
  //  slideWrap.style.transform = `translate(-${step}px, 0)`;
  //  setTimeout(() => {
  //    for (numberOfSteps; numberOfSteps == 1; numberOfSteps--) {
  //      newSlidesArr = el.querySelectorAll('.js-slide');
  //      newSlidesArr[numLastSlide].after(newSlidesArr[0]);
  //    }
  //  }, 200);

  //}

  //function movingBackwards() {
  //  console.log('<---');
  //}

  function setActiveDot(cls) {
    Array.from(dots).forEach((dot, idx) => {
      dot.classList.remove(cls)
      if (i > dots.length - 1) {
        i = 0
      }
      if (i < 0) {
        i = dots.length - 1;
      }
      if (i == idx) {
        dot.classList.add(cls)
      }
    })
  }


  // функции управление стрелками
  function next() {
    if (isMove) {
      return;
    }
    intervalSwitch(autoplay);
    i++;
    isMove = true;
    const step = slideWrap.offsetWidth;
    newSlidesArr = el.querySelectorAll('.js-slide');
    slideWrap.style.transform = `translate(-${step}px, 0)`;
    slideWrap.classList.add('slides--is-move');
    setActiveDot('dot--is-active');
    setTimeout(() => {
      slideWrap.style.transform = `translate(0, 0)`;
      slideWrap.classList.remove('slides--is-move');
      newSlidesArr[numLastSlide].after(newSlidesArr[0]);
      isMove = false;
      intervalSwitch(autoplay, true, timeInterval);
    }, 200);
  }



  function prev() {
    if (isMove) {
      return;
    }
    intervalSwitch(autoplay);
    i--;
    isMove = true;
    const step = slideWrap.offsetWidth;
    slideWrap.classList.remove('slides--is-move');
    newSlidesArr = el.querySelectorAll('.js-slide');
    newSlidesArr[0].before(newSlidesArr[numLastSlide]);
    slideWrap.style.transform = `translate(-${step}px, 0)`;
    setActiveDot('dot--is-active');
    setTimeout(() => {
      slideWrap.classList.add('slides--is-move');
      slideWrap.style.transform = `translate(0, 0)`;
    }, 20);
    setTimeout(() => {
      isMove = false;
      intervalSwitch(autoplay, true, timeInterval);
    }, 220);
  }

  // функции управление точками


  //прочие функции
  function intervalSwitch(autoplay, toggle = false, timeInterval = 8000) {
    if (!autoplay) {
      return;
    }
    if (toggle) {
      moveInterval = setInterval(next, timeInterval);
    } else {
      clearInterval(moveInterval);
    }
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
  const slideTrack = el.querySelector('#caruselSlides');
  const slides = el.querySelectorAll('.js-carusel-slide');
  const slidesLenght = slides.length;
  const prevArrow = el.querySelector('#caruselArrowPrev');
  const nextArrow = el.querySelector('#caruselArrowNext');
  const dotList = el.querySelectorAll('.js-carusel-dote');
  const caruselDotsWrap = el.querySelector('#caruselDots');
  const caruselDotsTrack = el.querySelector('#caruselDotsTrack');
  const caruselDotsSlides = el.querySelectorAll('.js-carusel-dote-slide');

  let i = 0;
  let isMove = false;

  window.addEventListener('resize', trackShift, false);


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
    trackShift();
    setActiveDot(dotList, 'dot--is-active');
    trackDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');

  }

  function prev() {
    if (i == 0) {
      return;
    }
    i--;
    trackShift();
    setActiveDot(dotList, 'dot--is-active');
    trackDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');
  }
  // функции управление точками
  function dotNavigation(idx) {
    i = idx;
    trackShift();
    setActiveDot(dotList, 'dot--is-active');
    trackDotsShift();
    setActiveDot(caruselDotsSlides, 'pic-dots__item--is-active');
  }

  //функции движения
  function trackShift() {
    const step = slideWrap.offsetWidth;
    const slideTrackShift = i * step;
    slideTrack.style.transform = `translate(-${slideTrackShift}px, 0)`;
  }

  function trackDotsShift() {
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
    const dotsTrackShift = countDot * step;
    caruselDotsTrack.style.transform = `translate(0, -${dotsTrackShift}px)`;
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

function getToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta.getAttribute('content')
}

function test(data) {
  console.log(data);
}