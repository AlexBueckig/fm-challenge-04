const closeButton = document.querySelector('#menu-button');
const nav = document.querySelector('.nav');

closeButton.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});
