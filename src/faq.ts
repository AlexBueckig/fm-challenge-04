const items = document.querySelectorAll('.faq__item');

const toggleOpen = items.forEach(item => {
  const button = item.querySelector('.faq__button');

  item.addEventListener('click', () => {
    item.classList.toggle('faq__item--open');
  });
});
