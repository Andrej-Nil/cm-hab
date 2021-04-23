'use strict';

const _token = getToken();
const POST = 'GET';
const GET = 'GET';
const body = document.querySelector('body');

//modal
const modalsWrap = document.querySelector('#modalsWrap');
const feetbackBtn = document.querySelector('#feetbackBtn');
const fastOrdenBtns = document.querySelectorAll('.js-fast-order');
const feetbackModal = document.querySelector('#feetback');
const fastOrderModal = document.querySelector('#fastOrder');
const modalCloseBtns = document.querySelectorAll('.js-close-modal');
const closeFastOrderBtn = document.querySelector('#closeFastOrderBtn');
const ordenBtn = document.querySelector('#orderBtn');
const ordenModal = document.querySelector('#order');
const helpModal = document.querySelector('#help');
const helpBtn = document.querySelector('#helpBtn');
const connectionThanksModal = document.querySelector('#connectionThanks');
const orderThanksModal = document.querySelector('#orderThanks');

const fastOrderTotalPrice = document.querySelector('#fastOrderTotalPrice');

// Forms
const callbackForm = document.querySelector('#callbackForm');
const feetbackForm = document.querySelector('#feetbackForm');
const helpForm = document.querySelector('#helpForm');
const fastOrderForm = document.querySelector('#fastOrderForm');

//mobileMenu
const mobileMenuBtn = document.querySelector('#menuBtn');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileMenuCloseBtn = document.querySelector('#mobileMenuClose');

//Карусели
const mainSlider = document.querySelector('#mainSlider');
const productCarusel = document.querySelector('#productCarusel');
const popularGoods = document.querySelector('#popularGoods');
const sectionSlider = document.querySelector('#sectionSlider');
const newsSlider = document.querySelector('#newsSlider');

//btns
const favoriteBtns = document.querySelectorAll('.js-favorite');
const inBasketBns = document.querySelectorAll('.js-in-basket');
const upwardBtn = document.querySelector('#upwardBtn');
const upBtn = document.querySelector('#up');

const elementLinks = document.querySelectorAll('.js-element-link');
const dropdownsBtn = document.querySelectorAll('.js-dropdown-btn');
const switchToggle = document.querySelector('#switchToggle');
const counters = document.querySelectorAll('.js-counter')
const catalogNav = document.querySelector('#catalogNav');

const map = document.querySelector('#map');

const regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/;
const regMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

let yandexMap;
let marker;

const sensitivity = 20;
let touchStart = null;
let touchPosition = null;

if (counters.length) {
  Array.from(counters).forEach((counter) => {
    managingСounter(counter);
  })
}

if (favoriteBtns.length) {
  Array.from(favoriteBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      addFafavorite(btn)
    })
  });
}
if (inBasketBns.length) {
  Array.from(inBasketBns).forEach((btn) => {
    btn.addEventListener('click', () => {
      addInBasketBns(btn)
    })
  });
}

if (catalogNav) {
  window.addEventListener('load', renderCatalogNav);
}
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
if (feetbackForm) {
  feetbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendFeetbackForm();
}
if (helpForm) {
  helpForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendHelpForm();
}
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', mobileMenuOpen);
}

if (fastOrderForm) {
  fastOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendOrderForm()
}

//modals
if (feetbackModal && modalsWrap) {
  feetbackBtn.addEventListener('click', () => {
    modalOpen(feetbackModal);
  });
}

if (fastOrdenBtns.length && modalsWrap) {
  Array.from(fastOrdenBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalOpen(fastOrderModal));
    btn.addEventListener('click', () => renderModalProduct(fastOrderModal, btn));
  });
}

if (ordenBtn) {
  ordenBtn.addEventListener('click', () => modalOpen(ordenModal));
}

if (helpBtn) {
  helpBtn.addEventListener('click', () => modalOpen(helpModal));
}

if (modalCloseBtns.length) {
  Array.from(modalCloseBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalClose(btn));
  });
}

if (closeFastOrderBtn) {
  closeFastOrderBtn.addEventListener('click', clearFastOrderList)
}
























if (upwardBtn) {
  upwardBtn.addEventListener('click', goTop);
  window.addEventListener('scroll', showUpBtn);
}

if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', mobileMenuClose);
}

// Функции для работы слайдеров
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
  //  slideWrap.style.transform = `translate(-${ step }px, 0)`;
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
// Функции работы модульных окон
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

function clearFastOrderList() {
  const lisrWrap = fastOrderModal.querySelector('.js-list-wrap');
  lisrWrap.innerHTML = '';
}

// Функции для открытия/закрытия мобильного меня
function mobileMenuOpen() {
  mobileMenu.classList.add('mobile-menu--is-open');
}

function mobileMenuClose() {
  mobileMenu.classList.remove('mobile-menu--is-open');
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

//Функция для получения ответа с сервира
function getData(method, data, api) {

  return new Promise(function (resolve, reject) {

    const xhr = new XMLHttpRequest();
    let response = null
    xhr.open(method, api, true);
    xhr.send(data);
    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log('Ошибка: ' + xhr.status);
        return;
      } else {
        response = JSON.parse(xhr.response);
        resolve(response);
        if (response) {
          console.log("Запрос отправлен");
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

//функции для работой с формой
function clearInput(inputs) {
  Array.from(inputs).forEach(input => {
    input.value = '';
    input.classList.remove('input--is-error');
    input.classList.remove('input--is-success');
  })
}

function formCheck(...inputs) {
  let res = true;
  inputs.forEach((item) => {
    res = checkInput(item) && res;
  })
  if (!res) {
    console.log('not sent');
    return res;
  }
  if (res) {
    console.log('sent');
    return res;
  }
}

function setFileName(input, el) {
  const fileName = input.files[0].name;
  el.innerHTML = fileName;
}

function checkValue(value, reg) {
  return reg.test(value)
}

function checkInput(input) {
  const name = input.getAttribute('name');
  let result;
  switch (name) {
    case 'email':
      result = checkValue(input.value, regMail);
      statusVisualInput(input, result);
      break;
    case 'phone':
      result = checkValue(input.value, regTel);
      statusVisualInput(input, result);
      break;
    case 'message':
      result = isEmptyInput(input.value)
      statusVisualInput(input, result);
      break;
    case 'consent':
      result = checkCheckbox(input);
      statusVisualCheckbox(input, result);
      break;
  }

  return result;
}

function isEmptyInput(value) {
  const str = value.trim();
  if (str) {
    return true;
  } else {
    return false;
  }
}

function showMessage(response, el) {
  el.innerHTML = response.desc;
  if (response.rez == 1) {
    el.classList.add('form-error--is-success');
    el.classList.remove('form-error--is-error');
    return true;
  }
  if (response.rez != 1) {
    el.classList.remove('form-error--is-success');
    el.classList.add('form-error--is-error');
    return false;
  }
}

function showMessageError(response, el) {
  el.innerHTML = response.desc;
  if (response.rez == 1) {
    return true;
  }
  if (response.rez != 1) {
    el.classList.remove('form-error--is-success');
    el.classList.add('form-error--is-error');
    return false;
  }
}

function checkCheckbox(checkbox) {
  return checkbox.checked
}

function statusVisualCheckbox(checkbox, result = false) {
  const parent = checkbox.closest('.js-checkbox')
  if (!result) {
    parent.classList.add('animation-shake');
    setTimeout(() => {
      parent.classList.remove('animation-shake');

    }, 800)
    return;
  }
}

function statusVisualInput(input, result = false) {
  if (result) {
    input.classList.remove('input--is-error');
    input.classList.add('input--is-success');
    return true;
  } else {
    input.classList.remove('input--is-success');
    input.classList.add('input--is-error');
    return false;
  }
}

//отправка форм
function sendCallbackForm() {
  const api = callbackForm.action;
  const inputs = callbackForm.querySelectorAll('.js-input');
  const mailInput = callbackForm.querySelector('.js-mail-input');
  const fileInput = callbackForm.querySelector('.js-file-input');
  const fileName = callbackForm.querySelector('.js-file-name');
  const checkboxInput = callbackForm.querySelector('.js-checkbox-input');
  const submitBtn = callbackForm.querySelector('.js-submit');
  const formMessage = callbackForm.querySelector('.js-message');

  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  })
  fileInput.addEventListener('change', () => setFileName(fileInput, fileName));
  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, checkboxInput);
    if (result) {
      postCallback(POST, api)
    }
  });
  async function postCallback(method, api) {
    const data = new FormData(callbackForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessage(response, formMessage);
    if (res) {
      clearInput(inputs);
    }
  }
}

function sendHelpForm() {
  const api = helpForm.action;
  const inputs = helpForm.querySelectorAll('.js-input');
  const mailInput = helpForm.querySelector('.js-input-email');
  const textareaInput = helpForm.querySelector('.js-input-textarea');
  const checkboxInput = helpForm.querySelector('.js-checkbox-input');
  const submitBtn = helpForm.querySelector('.js-submit');
  const formMessage = helpForm.querySelector('.js-message');
  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  });
  textareaInput.addEventListener('blur', () => {
    checkInput(textareaInput);
  });
  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, textareaInput, checkboxInput);

    if (result) {
      postHelp(POST, api)
    }
  });
  async function postHelp(method, api) {
    const data = new FormData(helpForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessageError(response, formMessage);
    if (res) {
      clearInput(inputs);
      helpModal.classList.remove('modal--is-show');
      connectionThanksModal.classList.add('modal--is-show');
    }
  }
}

function sendFeetbackForm() {
  const api = feetbackForm.action;
  const inputs = feetbackForm.querySelectorAll('.js-input');
  const phoneInput = feetbackForm.querySelector('.js-input-phone');
  const checkboxInput = feetbackForm.querySelector('.js-checkbox-input');
  const submitBtn = feetbackForm.querySelector('.js-submit');
  const formMessage = feetbackForm.querySelector('.js-message');
  phoneInput.addEventListener('blur', () => {
    checkInput(phoneInput);
  })
  submitBtn.addEventListener('click', () => {
    const result = formCheck(phoneInput, checkboxInput);
    if (result) {
      postFeetback(POST, api)
    }
  });
  async function postFeetback(method, api) {
    const data = new FormData(feetbackForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessageError(response, formMessage);
    if (res) {
      clearInput(inputs);
      feetbackModal.classList.remove('modal--is-show');
      connectionThanksModal.classList.add('modal--is-show');
    }
  }
}

function sendOrderForm() {
  const api = fastOrderForm.action;
  const inputs = fastOrderForm.querySelectorAll('.js-input');
  const mailInput = fastOrderForm.querySelector('.js-input-email');
  const mailPhine = fastOrderForm.querySelector('.js-input-phone');
  const checkboxInput = fastOrderForm.querySelector('.js-input-checkbox');
  const submitBtn = fastOrderForm.querySelector('.js-submit');
  const formMessage = fastOrderForm.querySelector('.js-message');
  const modalCards = fastOrderForm.querySelectorAll('.modal-card');

  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  })

  mailPhine.addEventListener('blur', () => {
    checkInput(mailPhine);
  })

  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, mailPhine, checkboxInput);
    if (result) {
      postOrder(POST, api)
    }
  });

  async function postOrder(method, api) {
    const data = new FormData(fastOrderForm);
    data.append('_token', _token);
    data.append('prod', getArticlesAndQuantityArr(modalCards));
    const response = await getData(method, data, api);
    const res = showMessage(response, formMessage);

    if (res) {
      clearInput(inputs);
      orderThanksModal.classList.add('modal--is-show');
      fastOrderModal.classList.remove('modal--is-show');
      clearFastOrderList();
    }
  }
}

// Прочие функции
function goTop() {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -150);
    timeOut = setTimeout('goTop()', 5);
  } else clearTimeout(timeOut);
}

function setTotlePrice(el, totlePrice) {
  el.innerHTML = totlePrice
}

function showUpBtn() {
  const coord = body.getBoundingClientRect();
  if (coord.top < -1000) {
    upBtn.classList.add('up--is-show');
  } else {
    upBtn.classList.remove('up--is-show');
  }
}

function managingСounter(counter) {
  const api = counter.getAttribute('data-link')
  const article = counter.getAttribute('data-article')
  const decBtn = counter.querySelector('.js-dec');
  const incBtn = counter.querySelector('.js-inc');
  const quantityInput = counter.querySelector('.js-quantity');
  let response = null;
  let data = {
    _token: _token,
    article: article
  }

  decBtn.addEventListener('click', dec);
  incBtn.addEventListener('click', inc);
  quantityInput.addEventListener('change', checkingValue);


  async function dec() {
    let quantity = +quantityInput.value;
    quantity -= 1;
    if (quantity === 0) {
      quantity = 1
      quantityInput.value = quantity;
      return;
    }
    data.count = quantity;
    response = await getData(POST, data, api);
    quantityInput.value = response.prod.count;
    setTotlePrice(fastOrderTotalPrice, response.card.totle_price);
  }

  async function inc() {
    let quantity = +quantityInput.value;
    quantity += 1;
    data.count = quantity;
    response = await getData(POST, data, api);
    quantityInput.value = response.prod.count;
    setTotlePrice(fastOrderTotalPrice, response.card.totle_price);
  }

  function checkingValue() {
    const value = +quantityInput.value;
    if (value <= 0) {
      quantityInput.value = 1;
      return;
    }
    if (isNaN(value)) {
      quantityInput.value = 1;
      return;
    }

    console.log(value);
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

function setFafavoriteIcon(el, boolean) {
  const imgEl = el.querySelector('.js-favorite-img');
  const pathToImage = './img/icon/favorite-icon.svg';
  const pathToImageActive = './img/icon/favorite-active-icon.svg';
  if (!boolean) {
    imgEl.src = pathToImage;
    return;
  }
  imgEl.src = pathToImageActive;
}

// функции для отправки запросов с кнопок
// фаврит, в корзину, удалит
function getInfoFromBtnToSend(btn) {
  const info = {};
  const api = btn.getAttribute('data-link');
  console.log(api);
  const article = btn.getAttribute('data-article');
  const data = {
    _token: _token,
    article: article
  }

  info.api = api;
  info.article = article;
  info.data = data;
  console.log(info);
  return info;

}

async function addInBasketBns(btn) {
  const info = getInfoFromBtnToSend(btn);
  const response = await getData(POST, info.data, info.api);
  setInBasketBtn(btn, response.toggle, response.desc)
}

function setInBasketBtn(el, toggle, desc) {
  console.log(toggle, desc)
  if (toggle) {
    el.classList.remove('yellow-btn');
    el.classList.add('white-btn');
    el.innerHTML = desc;
    return;
  }
  el.classList.add('yellow-btn');
  el.classList.remove('white-btn');
  el.innerHTML = desc;
}

function getArticlesAndQuantityArr(modalCards) {
  const arr = []
  Array.from(modalCards).forEach((item) => {
    let obj = {
      articles: getArticles(item),
      quantity: getQuantity(item)
    }
    arr.push(obj);

  })
  return arr;
}

function getArticles(product) {
  return product.getAttribute('data-article');
}

function getQuantity(product) {
  const quantityInput = product.querySelector('.js-quantity');
  return quantityInput.value;
}

async function addFafavorite(btn) {
  console.log(btn)
  const info = getInfoFromBtnToSend(btn);
  const response = await getData(POST, info.data, info.api);
  setFafavoriteIcon(btn, response.toggle);
}

// Функции для отрисовки элементов
function render(el, array, getMarkupStrFunct) {
  let markupAsStr = '';
  array.forEach((item) => {
    markupAsStr = markupAsStr + getMarkupStrFunct(item);
  })
  el.insertAdjacentHTML('beforeEnd', markupAsStr);
}

async function renderCatalogNav() {
  const api = catalogNav.getAttribute('data-link');
  const data = {
    _token: _token,
  }
  const response = await getData(POST, data, api);

  render(catalogNav, response.desc, getMarkupEl);
  const btns = document.querySelectorAll('.js-dropdown-btn');

  Array.from(btns).forEach((btn) => {
    btn.addEventListener('click', () => renderSubCatalogNav(btn));
  });

  function getMarkupEl(obj) {
    const { link, text, article } = obj;
    return (`
            <div class="category js-dropdown">
              <div class="category__name">
                <a href='${link}' class='category__link'>
                  ${text}
                </a >
                <div class="category__btn js-dropdown-btn" data-article="${article}">
                  <img src="./img/controls/dropdown-btn.svg" alt="" class="category__arrow">
                </div>
              </div>
              <div class="subcategories js-dropdown-body">
                <ul class="subcategories__list js-dropdown-content">
                  
                </ul>
              </div>
            </div >
    `)
  }

}

async function renderModalProduct(modal, btn) {
  const api = btn.getAttribute('data-link');
  const article = btn.getAttribute('data-article');
  const listWrap = modal.querySelector('.js-list-wrap');

  const data = {
    _token: _token,
    article: article
  }
  let counters = null
  let favoriteBtns = null
  const response = await getData(POST, data, api);

  render(listWrap, response.prod, getMarkupEl);

  counters = listWrap.querySelectorAll('.js-counter');
  favoriteBtns = listWrap.querySelectorAll('.js-favorite');

  if (counters.length) {
    Array.from(counters).forEach((counter) => {
      managingСounter(counter);
    })
  }

  if (favoriteBtns.length) {
    Array.from(favoriteBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        addFafavorite(btn)
      })
    });
  }

  setTotlePrice(fastOrderTotalPrice, response.card.totle_price)

  function getMarkupEl(obj) {
    const { article, count, link, title,
      img, favorite_link, count_link, sale,
      price, favorite } = obj;
    let favoriteIcon = null;
    if (favorite) {
      favoriteIcon = "./img/icon/favorite-active-icon.svg"
    } else {
      favoriteIcon = "./img/icon/favorite-icon.svg"
    }

    return (`
    <div class="modal-card" data-article='${article}'>
    <div class="modal-card__desc">
      <div class="modal-card__preview">
        <a href="${link}" class="modal-card__preview">
          <img src="${img}" alt="" class="modal-card__img">
        </a>
      </div>
      <h3 class='modal-card__title'>
        <a href="${link}" class="modal-card__link link">${title}</a>
      </h3>
    </div>
    <div class="modal-card__price">
      <div class="modal-card__discount">
        <span class="discount-sticker">${sale}</span>
      </div>
      <span class="modal-card__num">${price}</span>
    </div>
    <!--modal-card__control-->
    <div class="modal-card__control">

      <!--modal-card__counter-->
      <div class="modal-card__counter">
        <div class="counter js-counter" data-article="${article}" data-link="${count_link}">
          <span class="counter__sing js-dec">-</span>

          <input type='text' class="counter__quantity js-quantity" value='${count}'>

          <span class="counter__sing js-inc">+</span>
        </div>
      </div>
      <!--modal-card__counter-->

      <div class="modal-card__icon ">
        <span class="btn js-favorite" data-article='${article}' data-link="${favorite_link}">
          <img class="btn__icon js-favorite-img" src="${favoriteIcon}" alt="">
        </span>
      </div>

    </div>
    <!--modal-card__control-->
  </div>
    `)
  }
}

async function renderSubCatalogNav(btn) {
  const api = 'testAjax/sidebarSubMenu.json';
  const article = btn.getAttribute('data-article');
  const parent = btn.closest('.js-dropdown');
  const ul = parent.querySelector('.js-dropdown-content');
  const liList = ul.querySelectorAll('.js-item');
  const data = {
    _token: _token,
    article: article
  }

  if (!parent) {
    return;
  }
  if (liList.length) {
    return;
  }
  const response = await getData(POST, data, api);
  render(ul, response.desc, getMarkupEl);
  dropdownOpen(btn);
  rotateArrowDropdownsBtn(btn);

  btn.addEventListener('click', () => dropdownOpen(btn));
  btn.addEventListener('click', () => rotateArrowDropdownsBtn(btn));

  function getMarkupEl(obj) {
    const { link, text } = obj;
    return (`
    <li class="subcategories__item js-item">
      <a href="${link}" class="subcategories__link">
      ${text}
      </a>
    </li>
    `)
  }

}