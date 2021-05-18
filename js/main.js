'use strict';

const _token = getToken();
const POST = 'GET';
const GET = 'GET';
const body = document.querySelector('body');

//modal
const modalsWrap = document.querySelector('#modalsWrap');
const bgModals = document.querySelector('.bg-modals')
const feetbackBtn = document.querySelector('#feetbackBtn');
const fastOrderBtns = document.querySelectorAll('.js-fast-order');
const feetbackModal = document.querySelector('#feetback');
const fastOrderModal = document.querySelector('#fastOrder');
const modalCloseBtns = document.querySelectorAll('.js-close-modal');
const closeFastOrderBtn = document.querySelector('#closeFastOrderBtn');
const orderBtn = document.querySelector('#orderBtn');
const orderModal = document.querySelector('#order');
const helpModal = document.querySelector('#help');
const helpBtn = document.querySelector('#helpBtn');
const connectionThanksModal = document.querySelector('#connectionThanks');
const orderThanksModal = document.querySelector('#orderThanks');

// Forms
const callbackForm = document.querySelector('#callbackForm');
const feetbackForm = document.querySelector('#feetbackForm');
const helpForm = document.querySelector('#helpForm');
const fastOrderForm = document.querySelector('#fastOrderForm');
const orderForm = document.querySelector('#orderForm');
const loginForm = document.querySelector('#loginForm');
const registrationForm = document.querySelector('#registrationForm');

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
const productSlider = document.querySelector('#productSlider');

//btns
const favoriteBtns = document.querySelectorAll('.js-favorite');
const inBasketBns = document.querySelectorAll('.js-in-basket');
const upwardBtn = document.querySelector('#upwardBtn');
const upBtn = document.querySelector('#up');
const removeProductBtns = document.querySelectorAll('.js-remove-product');

const elementLinks = document.querySelectorAll('.js-element-link');
const dropdownsBtns = document.querySelectorAll('.js-dropdown-btn');
const switchToggles = document.querySelectorAll('[data-switch]');
const switchFixed = document.querySelector('#switchFixed');
const counters = document.querySelectorAll('.js-counter');
const catalogNav = document.querySelector('#catalogNav');
const news = document.querySelector('#news');

//filters
const filtersForm = document.querySelector('#filters');
const filters = document.querySelectorAll('.js-filter');
const expandFiltersBtn = document.querySelector('#expandFiltersBtn');
const filterInputs = document.querySelectorAll('.js-filter-input');
const rollUpBtns = document.querySelectorAll('.js-roll-up-btn');

const map = document.querySelector('#map');
const regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/;
const regMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

let yandexMap;
let marker;

const sensitivity = 20;
let touchStart = null;
let touchPosition = null;

let moveStart = null;
let moveEnd = null;

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendLoginForm();
}

if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendRegistrationForm();
}

if (counters.length) {
  Array.from(counters).forEach((counter) => {
    managingСounter(counter);
  })
}

if (favoriteBtns.length) {
  Array.from(favoriteBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      addFavorite(btn)
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
if (dropdownsBtns.length) {
  Array.from(dropdownsBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      dropdownOpen(btn);
      rotateSortingArrow(btn);
    })
  })
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
if (switchToggles.length) {

  Array.from(switchToggles).forEach((toggle) => {
    toggle.addEventListener('click', () => {
      toggleSwitch(toggle);
    });
  })
  //switchToggle.addEventListener('click', toggleSwitch);
}
//карусели
if (mainSlider) {
  slider(mainSlider, true);
}

if (productSlider) {
  slider(productSlider);
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
  sendFastOrderForm()
}
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  sendOrderForm();
}
if (removeProductBtns.length) {
  Array.from(removeProductBtns).forEach((btn) => {
    btn.addEventListener('click', () => { removeProduct(btn) })
  });
}


window.addEventListener('scroll', function () {
  if (news) {
    loadingNews()
  }

  if (switchFixed) {
    showSwitchFixed()
  }
});

if (switchFixed) {
  clickToggleToUp()
}

function clickToggleToUp() {
  const toggle = switchFixed.querySelector('[data-switch]');
  toggle.addEventListener('click', goTop);
}

function showSwitchFixed() {
  const scrollTop = getScrollTop()
  if (scrollTop > 170) {
    switchFixed.classList.add('switch-wrap-fixed--is-show');
  } else {
    switchFixed.classList.remove('switch-wrap-fixed--is-show');
  }
}

function getScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop)
}

//switchFixed

// block filters
if (rollUpBtns.length) {
  Array.from(rollUpBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      rollUpFiltersbtn()
    })
  })
}

if (expandFiltersBtn) {
  expandFiltersBtn.addEventListener('click', expandFilters);
}

if (filters.length) {
  Array.from(filters).forEach((item) => {
    filterFn(item);
    changePlaceholder(item);
  })
}

//modals
if (feetbackModal && modalsWrap) {
  feetbackBtn.addEventListener('click', () => {
    modalOpen(feetbackModal);
  });
}

if (fastOrderBtns.length && modalsWrap) {
  Array.from(fastOrderBtns).forEach((btn) => {
    btn.addEventListener('click', () => modalOpen(fastOrderModal));
    btn.addEventListener('click', () => renderModalProduct(fastOrderModal, btn));
  });
}

if (orderModal && orderBtn) {
  orderBtn.addEventListener('click', () => modalOpen(orderModal));
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
function carusel(el,) {
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




  //управление мышью
  slideWrap.addEventListener('dragstart', (e) => {
    e.preventDefault();
  })
  slideWrap.addEventListener('mousedown', function (e) { startCursorMove(e) });
  slideWrap.addEventListener('mouseup', function (e) { endCursorMove(e, prev, next) });


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

  slideWrap.addEventListener('dragstart', (e) => {
    e.preventDefault();
  })
  slideWrap.addEventListener('mousedown', function (e) { startCursorMove(e) });
  slideWrap.addEventListener('mouseup', function (e) { endCursorMove(e, prev, next) });

  slideWrap.addEventListener('mouseover', () => {
    intervalSwitch(autoplay, false);
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
    intervalSwitch(autoplay, false);
    i++;
    isMove = true;
    const step = slides[0].offsetWidth;
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
    intervalSwitch(autoplay, false);

    i--;
    isMove = true;
    const step = slides[0].offsetWidth;
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
// управление мышью
function startCursorMove(e) {
  moveStart = e.clientX;
}

function endCursorMove(e, prev, next) {
  moveEnd = e.clientX;
  let distance = moveStart - moveEnd;
  if (distance > 0 && distance >= sensitivity) {
    next();
  }
  if (distance < 0 && distance * -1 >= sensitivity) {
    prev();
  }
}
// Функции работы модульных окон
function modalOpen(modal) {
  body.classList.add('no-scroll');
  modalsWrap.classList.add('modals--is-show');

  setTimeout(() => {
    bgModals.classList.add('bg-modals--is-open');
    modal.classList.add('modal--is-show');
  }, 10)

}

function modalClose(btn) {
  const modal = btn.closest(".js-modal");
  modal.classList.remove('modal--is-show');
  body.classList.remove('no-scroll');
  bgModals.classList.remove('bg-modals--is-open');
  setTimeout(() => {
    modalsWrap.classList.remove('modals--is-show');
  }, 510)


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

//Функции для работы переключателя

function toggleSwitch(switcher) {
  const left = switcher.classList.contains('switch__toggle--is-left');
  const right = switcher.classList.contains('switch__toggle--is-right');
  if (!left) {

    switchToggles.forEach((switcher) => {
      switcher.classList.remove('switch__toggle--is-right');
      switcher.classList.add('switch__toggle--is-left');
    })

    switchSection('left')
    return;
  }
  if (!right) {
    switchToggles.forEach((switcher) => {
      switcher.classList.remove('switch__toggle--is-left');
      switcher.classList.add('switch__toggle--is-right');
    })

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
    el.classList.remove('switching-tab--is-active')
  });

  elementLink.classList.add('switching-tab--is-active');

  Array.from(elements).forEach((el) => {
    const elId = el.getAttribute('id');
    el.classList.remove('switching-tab__content--is-active')
    if (elId == idElement) {
      el.classList.add('switching-tab__content--is-active')
    }
  });
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

async function loadingNews() {
  const api = news.getAttribute('data-link');
  const newsList = news.querySelector('#newsList');
  const coordNewsList = newsList.getBoundingClientRect();
  const innerHeight = window.innerHeight;
  const res = coordNewsList.bottom - innerHeight;
  const newsCard = newsList.querySelectorAll('.news-card');
  let countNews = null;
  let response = null;
  const message = `<span class="spinner__text">Это все новости</span>`
  const data = { _token: _token };
  if (res > 0) {
    return;
  }
  if (news.classList.contains('js-all-loaded')) {
    return;
  }

  if (news.classList.contains('js-loading')) {
    return;
  }
  news.classList.add('js-loading');
  render(news, [1], getMarkupSpinner);


  response = await getData(POST, data, api);
  countNews = response.content.news_more;
  newsCard
  if (countNews <= newsCard.length) {
    news.querySelector('.spinner').innerHTML = message;
    news.classList.add('js-all-loaded');
    news.classList.remove('js-loading');
    return;
  }

  renderNews(response.content.news);
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
      result = isEmptyInput(input.value);
      statusVisualInput(input, result);
      break;
    case 'consent':
      result = checkCheckbox(input);
      statusVisualCheckbox(input, result);
      break;
    case 'password':
      result = isEmptyInput(input.value);
      statusVisualInput(input, result);
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
function sendRegistrationForm() {
  const api = registrationForm.action;
  const inputs = registrationForm.querySelectorAll('.js-input');
  const mailInput = registrationForm.querySelector('.js-input-email');
  const pasInput = registrationForm.querySelector('.js-pas-input');
  const repeatPasInput = registrationForm.querySelector('.js-repeat-pass-input');
  const submitBtn = registrationForm.querySelector('.js-submit');
  const formMessage = registrationForm.querySelector('.js-message');
  const registrationTab = document.querySelector('#registrationTab');
  const resultTab = document.querySelector('#resultTab');
  const resultMessage = document.querySelector('#resultMessage');
  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  });

  pasInput.addEventListener('blur', () => {
    checkInput(pasInput);
  });

  repeatPasInput.addEventListener('input', () => {
    checkingPasMatch()
  });
  pasInput.addEventListener('input', () => {
    checkingPasMatch()
  });

  function checkingPasMatch() {
    const pasValue = pasInput.value.trim();
    const repeatValue = repeatPasInput.value.trim();
    if (pasValue === '') {
      repeatPasInput.classList.remove('input--is-error');
      repeatPasInput.classList.remove('input--is-success');
      return;
    }

    if (pasValue === repeatValue) {
      repeatPasInput.classList.remove('input--is-error');
      repeatPasInput.classList.add('input--is-success');
      return true;
    }

    if (pasValue !== repeatValue) {
      repeatPasInput.classList.add('input--is-error');
      repeatPasInput.classList.remove('input--is-success');
      return false;
    }

  }

  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, pasInput);
    const checkRepeat = checkingPasMatch();
    if (result && checkRepeat) {
      postLogin(POST, api);
    }
  });
  async function postLogin(method, api) {
    const data = new FormData(registrationForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessageError(response, formMessage);
    if (res) {
      clearInput(inputs);
      registrationTab.classList.remove('switching-tab__content--is-active');
      resultTab.classList.add('switching-tab__content--is-active');
      resultMessage.innerHTML = response.desc;
    }
  }
}

function sendLoginForm() {
  const api = loginForm.action;
  const inputs = loginForm.querySelectorAll('.js-input');
  const mailInput = loginForm.querySelector('.js-input-email');
  const pasInput = loginForm.querySelector('.js-pas-input');
  const submitBtn = loginForm.querySelector('.js-submit');
  const formMessage = loginForm.querySelector('.js-message');
  const loginTab = document.querySelector('#loginTab');
  const resultTab = document.querySelector('#resultTab');
  const resultMessage = document.querySelector('#resultMessage');
  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  });

  pasInput.addEventListener('blur', () => {
    checkInput(pasInput);
  });

  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, pasInput);

    if (result) {
      postLogin(POST, api)
    }
  });
  async function postLogin(method, api) {
    const data = new FormData(loginForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessageError(response, formMessage);
    if (res) {
      clearInput(inputs);
      loginTab.classList.remove('switching-tab__content--is-active');
      resultTab.classList.add('switching-tab__content--is-active');
      resultMessage.innerHTML = response.desc;
    }
  }
}
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
  const checkboxInput = helpForm.querySelector('.js-input-checkbox');
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
  const checkboxInput = feetbackForm.querySelector('.js-input-checkbox');
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

function sendFastOrderForm() {
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

function sendOrderForm() {
  const api = orderForm.action;
  const inputs = orderForm.querySelectorAll('.js-input');
  const mailInput = orderForm.querySelector('.js-input-email');
  const phoneInput = orderForm.querySelector('.js-input-phone');
  const checkboxInput = orderForm.querySelector('.js-input-checkbox');
  const submitBtn = orderForm.querySelector('.js-submit');
  const formMessage = orderForm.querySelector('.js-message');
  mailInput.addEventListener('blur', () => {
    checkInput(mailInput);
  });
  phoneInput.addEventListener('blur', () => {
    checkInput(phoneInput);
  });

  submitBtn.addEventListener('click', () => {
    const result = formCheck(mailInput, phoneInput, checkboxInput);
    if (result) {
      postOrdet(POST, api)
    }
  });

  async function postOrdet(method, api) {
    const data = new FormData(orderForm);
    data.append('_token', _token);
    const response = await getData(method, data, api);
    const res = showMessage(response, formMessage);
    if (res) {
      clearInput(inputs);
      orderThanksModal.classList.add('modal--is-show');
      orderModal.classList.remove('modal--is-show');
      clearBasketList();
    }
  }
}

// Прочие функции
function goTop() {
  let timeOut = null;
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -150);
    timeOut = setTimeout('goTop()', 5);
  } else clearTimeout(timeOut);
}

function setTotalPrice(totalPrice) {

  const totalPrices = document.querySelectorAll('.js-total-price');
  Array.from(totalPrices).forEach((item) => {
    item.innerHTML = totalPrice + "₽";
  })

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
    setTotalPrice(response.card.total_price);
  }

  async function inc() {
    let quantity = +quantityInput.value;
    quantity += 1;
    data.count = quantity;
    response = await getData(POST, data, api);
    quantityInput.value = response.prod.count;
    setTotalPrice(response.card.total_price);
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

function rotateSortingArrow(btn) {
  const arrow = findChildren(btn, '.sorting__arrow-img');
  arrow.classList.toggle('sorting__arrow--is-down')
}

function findChildren(el, domClass) {
  const children = el.querySelector(domClass);
  return children;
}


function setFavoriteIcon(el, boolean) {
  const imgEl = el.querySelector('.js-favorite-img');
  const pathToImage = './img/icon/favorite-icon.svg';
  const pathToImageActive = './img/icon/favorite-active-icon.svg';
  if (!boolean) {
    imgEl.src = pathToImage;
    return;
  }
  imgEl.src = pathToImageActive;
}

function clearBasketList() {
  const basket = document.querySelector('#basket');
  const totalPrices = document.querySelectorAll('.js-total-price')
  const basketList = basket.querySelector('#basketList');
  basketList.innerHTML = '';
  Array.from(totalPrices).forEach((item) => {
    console.log(item)
    item.innerHTML = '0 ₽';
  })

  console.log(basketList)
}

//Функции для работы филтров
async function filterFn(filter) {
  const api = filter.getAttribute('data-link');
  const data = {
    _token: _token
  };

  const response = await getData(POST, data, api);
  const filterListArr = response.content;
  const resetFiltersBtn = document.querySelector('#resetFilters');
  const removeFilterBtns = document.querySelectorAll('.js-remove-filter');
  const arrowBtn = filter.querySelector('.js-filter-arrow');
  const arrowBtnIcon = filter.querySelector('.js-filter-arrow-icon');
  const filterInput = filter.querySelector('.js-filter-input');
  const filterBody = filter.querySelector('.js-filter-body');
  const filterList = filter.querySelector('.js-filter-list');
  const filtersTop = filter.closest('.js-filters-top');
  const filtersList = filtersTop.querySelector('.js-filters-list');
  let sortedFilters = sortFilters(filterListArr, filter, true);
  let filtersListHeight = filtersList.offsetHeight;

  //filtersTop.style.minHeight = filtersListHeight + 'px';
  window.addEventListener('resize', () => {
    filtersListHeight = filtersList.offsetHeight;
    filtersTop.style.minHeight = filtersListHeight + 'px';
    closeAllFilter(filters, filter);
  })


  renderFilterList(filter, sortedFilters, showSelectedFilter);
  resetFiltersBtn.addEventListener('click', () => {
    resetFilters(filter, filterListArr)
  })


  arrowBtn.addEventListener('click', (e) => {
    const isSorted = filter.classList.contains('js-sorted');
    openFilterList(e);
    if (isSorted) {
      return;
    }

    sortedFilters = sortFilters(filterListArr, filter, true);
    renderFilterList(filter, sortedFilters, showSelectedFilter);
  });
  filterInput.addEventListener('click', openFilterList);

  filterInput.addEventListener('input', () => {
    searchFilter(filterInput, filterListArr, filter)
  })

  if (removeFilterBtns.length) {
    Array.from(removeFilterBtns).forEach((btn) => {
      removeSelectedFilterWithBtn(btn, filterListArr);
    })
  }

  function searchFilter(input, arr, filter) {
    const value = input.value.trim();
    let sortedFilters = null;
    console.log(value);
    const newArr = arr.filter((item) => {
      const filretName = item.field_value_name;
      if (filretName.includes(value)) {
        return item;
      }

    })

    if (value !== '') {
      sortedFilters = newArr.sort((a, b) => {
        return sorting(a, b)
      });
    }
    if (value === '') {
      sortedFilters = sortFilters(newArr, filter, true);
    }

    renderFilterList(filter, sortedFilters, showSelectedFilter);

  }


  function openFilterList(e) {
    const target = e.target;
    const isOpen = filterBody.classList.contains('filter__body--is-open');

    const isInput = target.classList.contains('js-filter-input');

    if (isOpen && isInput) {
      return;
    }

    if (!isOpen) {
      filterList.scrollTop = 0;
    }
    closeAllFilter(filters, filter);
    filterBody.classList.toggle('filter__body--is-open');

    filter.classList.toggle('filter--is-open');
    arrowBtnIcon.classList.toggle('filter__arrow-icon--is-up');


    openFilterTop(filter)

    if (!filter.classList.contains('filter--is-open')) {
      filtersListHeight = filtersList.offsetHeight;
      filtersTop.style.minHeight = filtersListHeight + 'px';

    }
  }

  function openFilterTop(filter) {

    const filterCoords = filter.getBoundingClientRect();
    const filterHalfHeight = filter.offsetHeight / 2;
    const filtersTop = filter.closest('.js-filters-top');
    const filtersTopHeight = filtersTop.offsetHeight;
    const filtersTopCoords = filtersTop.getBoundingClientRect();



    const filtersList = filtersTop.querySelector('.js-filters-list');
    const filtersListHeight = filtersList.offsetHeight;

    const filterStyles = getComputedStyle(filter);
    const filterMarginBottom = parseInt(filterStyles.marginBottom);

    const filterList = filter.querySelector('.js-filter-list');
    const filterListHeight = filterList.offsetHeight;

    filtersTop.style.minHeight = filterListHeight + 'px';
    //Находим высоту от filter без MarginBottom до низа filterTopWrap;
    const heightFromFilterTofiltersTopBottom = filtersTopCoords.bottom
      - filterCoords.bottom
      - filterMarginBottom;
    //console.log(heightFromFilterTofiltersTopBottom)


    //Находим высоту, которую необходимо добавить  
    //к текущей высоте filterTopWrapp

    const heightToAdd = filterListHeight - heightFromFilterTofiltersTopBottom - filterHalfHeight;

    const totalFiltersTop = heightToAdd + filtersTopHeight;

    if (totalFiltersTop <= filtersListHeight) {
      filtersTop.style.minHeight = filtersListHeight + 'px';
      return;
    }
    //if (filtersTopHeight > filtersListHeight) {
    //  filtersTop.style.minHeight = filtersListHeight + 'px';
    //  return;
    //}
    filtersTop.style.minHeight = totalFiltersTop + 'px';
  }

  function removeSelectedFilter(checkbox, arr) {
    const fieldSlug = checkbox.getAttribute('name');
    const checkboxValue = checkbox.value;
    const selectedFilterList = document.querySelector(`#selectedFilters`);
    const selectedFilter = selectedFilterList.querySelector(`#${fieldSlug}${checkboxValue}`);


    arr.forEach((item, idx) => {
      const fieldValueSlug = item.field_value_slug;
      if (fieldValueSlug == checkboxValue) {
        arr[idx].checked = false;
      }
    })
    selectedFilterList.removeChild(selectedFilter);
  }

  function removeSelectedFilterWithBtn(btn, arr) {
    const selectedFilter = btn.closest('.js-selected-filter')
    const filtersTop = document.querySelector('.js-filters-top');
    const dataId = btn.getAttribute('data-id');
    const checkbox = filtersTop.querySelector(`[data-id=${dataId}]`);
    const filter = checkbox.closest('.js-filter')
    const checkboxValue = checkbox.value;
    checkbox.checked = false;
    filter.classList.remove('js-sorted');

    arr.forEach((item, idx) => {
      const fieldValueSlug = item.field_value_slug;
      if (fieldValueSlug == checkboxValue) {
        arr[idx].checked = false;
      }
    })
    selectedFilter.remove();
  }

  function renderFilterList(filter, arr, showSelectedFilter) {
    let checkboxList = null;
    const filterList = filter.querySelector('.js-filter-list');
    filterList.innerHTML = '';

    render(filterList, arr, getMarkupEl);


    checkboxList = filter.querySelectorAll('.js-filter-checkbox');

    Array.from(checkboxList).forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        showSelectedFilter(checkbox, arr);
        getFilterProguct();
      })
    })



    function getMarkupEl(obj) {
      const { field_slug, field_value_slug, field_value_name, checked } = obj;
      const checkboxActive = checked ? 'checked="checked"' : '';
      return (`
      <li class="filter__item">
        <div class="filter__check input-check">
          <label class="filter__check-label input-check__label">
            <input data-id="${field_slug}${field_value_slug}" class='input-check__checkbox js-filter-checkbox' type="checkbox" ${checkboxActive} data-name='${field_value_name}' name='${field_slug}' value="${field_value_slug}">
            <span class="input-check__fake filter-check__fake"></span>
            <span class="sorting__text input-check__text">
            ${field_value_name}
            </span>
          </label>
        </div>
      </li>
      `)
    }
  }

  async function getFilterProguct() {
    const filterFormSumbit = filtersForm.querySelector('#filterFormSumbit');
    const api = 'testAjax/filter-product.json';
    const data = new FormData(filtersForm);
    let response = null
    let count = null;
    data.append('_token', _token);
    response = await getData(POST, data, api);
    count = response.content.count;

    filterFormSumbit.value = `Показать (${count})`;

    console.log(filterFormSumbit);

    //console.log(filtersForm)
    //for (let [name, value] of data) {
    //  console.log(`${name} = ${value}`);
    //}

  }

  function renderSelectedFilter(checkbox, arr) {
    const selectedFilters = document.querySelector('#selectedFilters');
    const dataName = checkbox.getAttribute('data-name');
    const value = checkbox.value;
    const name = checkbox.getAttribute('name');
    const selectedFilterArr = [{
      field_value_name: dataName,
      field_slug: name,
      field_value_slug: value
    }]
    let selectedFilterRemeveBtns = null;
    arr.forEach((item, idx) => {
      const fieldValueSlug = item.field_value_slug;
      if (fieldValueSlug == value) {
        arr[idx].checked = true;
      }
    })

    render(selectedFilters, selectedFilterArr, getMarkupEl);
    selectedFilterRemeveBtns = selectedFilters.querySelectorAll('.js-remove-filter');
    Array.from(selectedFilterRemeveBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        removeSelectedFilterWithBtn(btn, arr);
      })
    })

    function getMarkupEl(obj) {
      const { field_slug, field_value_slug, field_value_name } = obj;
      return (`
      <div id="${field_slug}${field_value_slug}" class="selected-filter js-selected-filter" data-filter="${field_slug}", data-value="" >
      <span class="selected-filter__name">
        ${field_value_name}
      </span>
      <div class="selected-filter__delete">
        <span data-id="${field_slug}${field_value_slug}" class="btn js-remove-filter">
          <img src="./img/controls/close-btn-dark.svg" alt="" class="btn__icon">
        </span>
      </div>
    </div>
      `)
    }

  }

  function sortFilters(arr, filter, splitMarked) {
    if (splitMarked) {
      const checkedArr = arr.filter((item) => item.checked == true);
      const noCheckedArr = arr.filter((item) => item.checked == false);
      noCheckedArr.sort((a, b) => {
        return sorting(a, b)
      })
      checkedArr.sort((a, b) => {
        return sorting(a, b)
      })
      filter.classList.add('js-sorted');
      return checkedArr.concat(noCheckedArr);
    }
  }


  function resetFilters(filter, arr) {
    const checkboxes = filter.querySelectorAll('.js-filter-checkbox');
    const selectedFiltersList = document.querySelector('#selectedFilters');
    Array.from(checkboxes).forEach((checkbox) => {
      checkbox.checked = false;
    })

    arr.forEach((item) => {
      item.checked = false
    })
    selectedFiltersList.innerHTML = '';
    filter.classList.remove('js-sorted');
  }

  function showSelectedFilter(checkbox, arr) {
    if (checkbox.checked) {

      renderSelectedFilter(checkbox, arr);
      filter.classList.remove('js-sorted');
    }
    if (!checkbox.checked) {
      removeSelectedFilter(checkbox, arr);
      filter.classList.remove('js-sorted');
    }

  }


}

function closeAllFilter(filters, filter) {
  const filtersTop = filters[0].closest('.js-filters-top');

  const filtersList = filtersTop.querySelector('.js-filters-list');
  const filtersListHeight = filtersList.offsetHeight;
  let hasFiter = false;
  Array.from(filters).forEach((item) => {
    if (filter === item) {
      hasFiter = true;
      return;
    }
    const arrowBtnIcon = item.querySelector('.js-filter-arrow-icon');
    const filterItem = item.closest('.js-filter');
    const filterBody = filterItem.querySelector('.js-filter-body');
    filterBody.classList.remove('filter__body--is-open');
    item.classList.remove('filter--is-open');
    arrowBtnIcon.classList.remove('filter__arrow-icon--is-up');
  })
  if (hasFiter) {
    return;
  }
  filtersTop.style.minHeight = filtersListHeight + 'px';

}

function rollUpFiltersbtn() {
  const filters = filtersWrap.querySelector('#filters');
  const rollUpBtn = filtersWrap.querySelector('#rollUpBtn');
  const filtersHeight = filters.offsetHeight;
  filtersWrap.style.height = filtersHeight + 'px';
  setTimeout(() => {
    filtersWrap.style.height = '60px';
    rollUpBtn.classList.remove('filters__roll-up--is-show');
  }, 20);
  setTimeout(() => {
    filtersWrap.style.width = '190px';
    filtersWrap.classList.add('js-filters-close');
  }, 220);

}

function expandFilters() {
  const filtersWrap = document.querySelector('#filtersWrap');
  const filters = document.querySelector('#filters');
  const rollUpBtn = filtersWrap.querySelector('#rollUpBtn');
  filtersWrap.style.width = '100%';
  setTimeout(() => {
    rollUpBtn.classList.add('filters__roll-up--is-show');
    filtersWrap.style.height = filters.offsetHeight + 'px';
  }, 200)
  setTimeout(() => {
    filtersWrap.style.height = 'auto';
  }, 300)

}

function changePlaceholder(filter) {
  const input = filter.querySelector('.js-filter-input');
  const currentPliceholder = input.placeholder;
  const activePliceholder = 'Поиск по значениям';
  input.addEventListener('focus', () => {
    input.placeholder = activePliceholder;
  })
  input.addEventListener('blur', () => {
    input.placeholder = currentPliceholder;
  })
}

// функции для отправки запросов с кнопок
// фаврит, в корзину, удалит
function getInfoFromBtnToSend(btn) {
  const info = {};
  const api = btn.getAttribute('data-link');
  const article = btn.getAttribute('data-article');
  const data = {
    _token: _token,
    article: article
  }

  info.api = api;
  info.article = article;
  info.data = data;
  return info;

}

function setInBasketBtn(el, toggle, desc) {
  const parent = el.closest('.js-product-card');
  const iconBtn = parent.querySelector('.js-basket-icon');
  const btn = parent.querySelector('.js-basket-btn');
  if (btn) {
    toggleInBasketBtn(btn, toggle, desc)
  }
  if (iconBtn) {
    toggleInBasketIconBtn(iconBtn, toggle)
  }

}

function toggleInBasketIconBtn(btn, toggle = false) {
  const pathToImage = './img/icon/card-basket-icon.svg';
  const pathToImageActive = './img/icon/in-basket-icon.svg';
  console.log(btn.src)
  if (toggle) {
    btn.src = pathToImageActive;
    return;
  }
  btn.src = pathToImage;

}

function toggleInBasketBtn(btn, toggle = false, desc) {
  if (toggle) {
    btn.classList.remove('yellow-btn');
    btn.classList.add('white-btn');
    btn.innerHTML = desc;
    return;
  }
  btn.classList.add('yellow-btn');
  btn.classList.remove('white-btn');
  btn.innerHTML = desc;
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

async function addInBasketBns(btn) {
  const info = getInfoFromBtnToSend(btn);
  const response = await getData(POST, info.data, info.api);
  setInBasketBtn(btn, response.toggle, response.desc)
  setBasketIndicator(response.count)
}

async function addFavorite(btn) {
  const info = getInfoFromBtnToSend(btn);
  const response = await getData(POST, info.data, info.api);
  setFavoriteIcon(btn, response.toggle);
  setFavoriteIndicator(response.count)
}

async function removeProduct(btn) {
  const productCard = btn.closest('.js-product-card');
  const productList = productCard.parentElement
  const info = getInfoFromBtnToSend(btn);
  const response = await getData(POST, info.data, info.api);
  if (response.toggle) {
    productList.removeChild(productCard);
    setTotalPrice(response.total_price);
  }
  if (response.count === 0) {

  }
  if (response.count > 0) {
    setBasketIndicator(response.count)
  }
  console.log(productCard)
}

function setBasketIndicator(count) {
  const iconIndicator = document.querySelector('#basketIndicator');
  const basketCount = document.querySelector('#basketCount');
  if (count === 0) {
    iconIndicator.classList.remove('h-icon__indicator--is-show');
    basketCount.innerHTML = 0;
  }
  if (count) {
    iconIndicator.classList.add('h-icon__indicator--is-show');
    basketCount.innerHTML = count;
  }
}

function setFavoriteIndicator(count) {
  const iconIndicator = document.querySelector('#favoriteIndicator');
  const favoriteCount = document.querySelector('#favoriteCount');
  console.log(favoriteCount);
  if (count === 0) {
    iconIndicator.classList.remove('h-icon__indicator--is-show');
    favoriteCount.innerHTML = 0;
  }
  if (count) {
    iconIndicator.classList.add('h-icon__indicator--is-show');
    favoriteCount.innerHTML = count;
  }
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
  const btns = document.querySelectorAll('.js-subcategory-btn');

  Array.from(btns).forEach((btn) => {
    btn.addEventListener('click', () => renderSubCatalogNav(btn));
  });
  function getMarkupEl(obj) {
    const { link, text, article, data_link } = obj;
    return (`
            <div class="category js-dropdown">
              <div class="category__name">
                <a href='${link}' class='category__link'>
                  ${text}
                </a>
                <div data-link="${data_link}" class="category__btn js-dropdown-btn js-subcategory-btn" data-article="${article}">
                  <img src="./img/controls/dropdown-btn.svg" alt="" class="category__arrow">
                </div>
              </div>
              <div class="subcategories js-dropdown-body">
                <ul class="subcategories__list js-dropdown-content">
            
                </ul>
              </div>
            </div>
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
        addFavorite(btn)
      })
    });
  }

  setTotalPrice(response.card.total_price)

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
  const api = btn.getAttribute('data-link');
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
    <li class="subcategories__item  js-item">
      <a href="${link}" class="subcategories__link">
      ${text}
      </a>
    </li>
    `)
  }

}

function renderNews(newsArr) {
  render(newsList, newsArr, getMarkupEl);
  news.classList.remove('js-loading');
  news.querySelector('.spinner').remove();
  function getMarkupEl(obj) {
    const { title, img, link } = obj;
    return (`
    <div class="news-card">
              <div class="news-card__preview">
                <a href="${link}" class="news-card__preview-link">
                  <img src="${img}" alt="" class="news-card__img">
                </a>
              </div>
              <div class="news-card__desc">
                <h2 class="news-card__title"><a href="${link}" class="news-card_link">${title}
                  </a>
                </h2>
              </div>
            </div>
    `)
  }
}

function getMarkupSpinner() {
  return (`
  <div class="spinner">
    <div class="loadingio-spinner-dual-ring-3inkns7bjnw">
      <div class="ldio-2ikg7lk3b38">
        <div></div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
    <span class="spinner__text">Загружаю...</span>
  </div>
  `)
}

function sorting(a, b) {
  if (a.field_value_name > b.field_value_name) {
    return 1;
  }
  if (a.field_value_name < b.field_value_name) {
    return -1;
  }
  // a должно быть равным b
  return 0;
}