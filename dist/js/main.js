/* eslint-disable func-names */
(function anon() {
  const inputContainer = document.querySelector('.input');
  const inputField = document.querySelector('.input__field');
  const checkBtns = [];
  const closeBtns = [];

  const createArrow = function () {
    const arrow = document.createElement('div');
    arrow.innerHTML = '&#60';
    arrow.classList.add('arrow');
    inputContainer.appendChild(arrow);
  };

  const addNewItem = function (val) {
    const newItem = document.createElement('div');
    newItem.innerHTML = val;
    newItem.classList.add('input__item');

    const content = document.querySelector('.input__content');
    content.appendChild(newItem);

    const footer = document.querySelector('.input__footer');
    footer.classList.add('active-footer');

    const checkedIcon = document.createElement('div');
    checkedIcon.classList.add('input__item-unchecked');
    newItem.appendChild(checkedIcon);
    checkBtns.push(checkedIcon);

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('input__item-close');
    newItem.appendChild(closeIcon);
    closeBtns.push(closeIcon);
  };

  const itemsCounter = function () {
    const counterItems = document.querySelectorAll('.input__item').length;
    const counterActiveItems = document.querySelectorAll('.crossed').length;
    const leftItems = counterItems - counterActiveItems;

    document.querySelector('.input__footer-counter span').innerHTML = leftItems;
  };

  inputField.addEventListener('keypress', (e) => {
    const inputValue = inputField.value;

    if (e.key === 'Enter' && inputValue !== '') {
      createArrow();
      addNewItem(inputValue);
      itemsCounter();

      closeBtns.forEach((element) => {
        element.addEventListener('click', () => {
          element.parentNode.remove();
        });
      });

      const content = document.querySelector('.input__content');
      content.addEventListener('click', () => {
        const target = event.target;
        const parent = target.parentElement;
        target.classList.toggle('checked');
        parent.classList.toggle('crossed');
        itemsCounter();
      });

      const footerBtns = document.querySelectorAll('[data-action]');
      footerBtns.forEach((element) => {
        const allItems = document.querySelectorAll('.input__item');

        element.addEventListener('click', () => {
          if (element.dataset.action === 'all') {
            allItems.forEach((element) => {
              element.style.display = 'block';
            });
          } else if (element.dataset.action === 'active') {
            allItems.forEach((element) => {
              element.style.display = 'block';
              if (element.classList.contains('crossed') === true) {
                element.style.display = 'none';
              }
            });
          } else if (element.dataset.action === 'completed') {
            allItems.forEach((element) => {
              element.style.display = 'block';
              if (element.classList.contains('crossed') === false) {
                element.style.display = 'none';
              }
            });
          } else if (element.dataset.action === 'clear') {
            itemsCounter();
            allItems.forEach((element) => {
              element.remove();
            });
          }
        });
      });
    }
  });
}());
