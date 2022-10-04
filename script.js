'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});
/////////////////////////////////////
// Создние и вставка элементов
// .insertAdjacentHTML()
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `Мы используем на этот сайты cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ок!</button>`;

// const header = document.querySelector('.header');
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);
// //Удаление элемента
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message);
//   });

//Sтили
// message.style.backgroundColor = '#076785';
// message.style.width = '120%';
// console.log(message.style.width);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';
// document.documentElement.style.setProperty('--color-first', 'yellow');

// // Атрибуты
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Лого Прекрасного Банка';
// // Не стандартные атрибуты
// console.log(logo.developer);
// console.log(logo.getAttribute('developer'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data attribute

// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add();
// logo.classList.toggle();
// logo.classList.remove();
// logo.classList.contains();

//Scrool smooth

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  // console.log(sectionCoords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'Текущее прокручивание: x, y',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );
  // console.log(
  //   'Ширина и высота viewport',
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );
  // window.scrollTo(
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.top + window.pageYOffset
  // );
  //Для старых браузеров
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // Для новых браузеров
  section1.scrollIntoView({ behavior: 'smooth' });
});
/// Smooth page navigation

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Делегирование событий
// 1. Добавление event listener дял Общего родителя
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Определить target элемент
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // console.log(clickedButton);
  //Guard clause - Пункт охраны
  if (!clickedButton) return;
  // clickedButton.classList.add('operations__tab--active');
  //Активная вкладка
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');
  // Активный контент
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});
//Анимация при наведение в меню
const nav = document.querySelector('.nav');
//Рефакторинг
const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};
//Стандартный способ вызова функции в слушателе (navLinksHoverAnimation нужно добавить параметр opacity для функционирования)
// nav.addEventListener('mouseover', function (e) {
//   navLinksHoverAnimation(e, 0.4);
// });
// nav.addEventListener('mouseout', function (e) {
//   navLinksHoverAnimation(e, 1);
// });
//Через метод bind()
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));
//До рефакторинга
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const linkOver = e.target;
//     const siblingLinks = linkOver
//       .closest('.nav__links')
//       .querySelectorAll('.nav__link');
//     const logo = linkOver.closest('.nav').querySelector('img');
//     const logoText = linkOver.closest('.nav').querySelector('.nav__text');

//     siblingLinks.forEach(el => {
//       if (el !== linkOver) el.style.opacity = 0.4;
//     });
//     logo.style.opacity = 0.4;
//     logoText.style.opacity = 0.4;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const linkOver = e.target;
//     const siblingLinks = linkOver
//       .closest('.nav__links')
//       .querySelectorAll('.nav__link');
//     const logo = linkOver.closest('.nav').querySelector('img');
//     const logoText = linkOver.closest('.nav').querySelector('.nav__text');

//     siblingLinks.forEach(el => {
//       if (el !== linkOver) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//     logoText.style.opacity = 1;
//   }
// });

// Sticky navigation
//НЕ очень хороший и не оптимизированый способ
// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// Sticky navigation
// Intersectin Observer API способ лучше
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function (entries) {
  const entry = entries[0];
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Появление разделов сайта
const allSections = document.querySelectorAll('.section');
const apperanceSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry)
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(apperanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading изображения маленького качества меняем на высокое
const lazyImages = document.querySelectorAll('img[data-src]');

const laodImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry)
  if (!entry.isIntersecting) return;
  // Меняем на изображения с высоким качеством
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(laodImages, {
  root: null,
  threshold: 0.7,
  // rootMargin: '300px',
});
lazyImages.forEach(image => lazyImagesObserver.observe(image));
// Slider
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);
// slides.forEach(
//   (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
// );
const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%
  activateCurrentDot(currentSlide);
};
btnLeft.addEventListener('click', previousSlide);
btnRight.addEventListener('click', nextSlide);
// btnRight.addEventListener('click', function () {
//   if (currentSlide === slidesNumber - 1) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//   }
//   moveToSlide(currentSlide);
// });

// btnLeft.addEventListener('click', function () {
//   if (currentSlide === 0) {
//     currentSlide = slidesNumber - 1;
//   } else {
//     currentSlide--;
//   }
//   moveToSlide(currentSlide);
// });
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
////////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////
//Перемещение по DOM
//Перемещение вниз ( к потомкам)
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'yellow';
// console.log(h1.lastElementChild);

// //Перемещение вверх у родителям
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// const h2 = document.querySelector('h2');
// console.log(h2);
// h2.closest('.section').style.backgroundColor = 'blue';

// //Перемещение в стороны
// console.log(h2.previousElementSibling);
// console.log(h2.nextElementSibling);
// console.log(h1.parentElement.children);

//Виды События и обработчики событий
// const h1 = document.querySelector('h1');
// const alertMouseEnterH1 = function (e) {
//   alert('Hi you there');
//   h1.removeEventListener('mouseenter', alertMouseEnterH1);
// };
// h1.addEventListener('mouseenter', alertMouseEnterH1);

// const alertMouseEnterH1 = function (e) {
//   alert('Hi you there');
// };
// h1.addEventListener('mouseenter', alertMouseEnterH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertMouseEnterH1), 5000);

// h1.addEventListener('mouseenter', function (e) {
//   alert('Hi you there');
// });

// h1.onclick = function (e) {
//   alert('Onclick oldscool');
// };

//Event Proragation
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const getRandomColor = () =>
//   `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(
//     0,
//     255
//   )},${getRandomIntInclusive(0, 255)})`;

// console.log(getRandomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // console.log('you clicked on me');
//   this.style.backgroundColor = getRandomColor();
//   console.log('Link', e.target);
//   //Stop propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('you clicked on me');
//   this.style.backgroundColor = getRandomColor();
//   console.log('Links', e.target, e.currentTarget);
//   // console.log(e.currentTarget === this);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     // console.log('you clicked on me');
//     this.style.backgroundColor = getRandomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   }
//   //, true
// );
// document.querySelector('header').addEventListener('click', function (e) {
//   // console.log('you clicked on me');
//   this.style.backgroundColor = getRandomColor();
//   console.log('header', e.target, e.currentTarget);
// });
// document.querySelector('body').addEventListener('click', function (e) {
//   // console.log('you clicked on me');
//   this.style.backgroundColor = getRandomColor();
//   console.log('body', e.target, e.currentTarget);
// });

//Lifecycle DOM Events
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('Дерево Dom  создано', e);
// });
// Не нужно писать всему коду, если подключаю js в html перед закрытием body

// window.addEventListener('load', function (e) {
//   console.log('Страницы полностью загружена', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
