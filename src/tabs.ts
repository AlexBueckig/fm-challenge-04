const tabsTitles = document.querySelectorAll('.tabs__title');
const tabs = document.querySelectorAll('.tab');

console.log(tabs);

tabsTitles.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    const index = i;
    tabsTitles.forEach(t => {
      t.classList.remove('tabs__title--active');
    });
    tab.classList.toggle('tabs__title--active');
    tabs.forEach(t => {
      t.classList.remove('tab--active');
    });
    tabs[index].classList.add('tab--active');
  });
});
