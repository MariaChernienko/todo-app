/* eslint-disable func-names */
(function anon() {
  const inputContainer = document.querySelector('.input');
  const inputField = document.querySelector('.input__field');
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

    const footer = document.querySelector('.input__footer');
    footer.classList.add('active-footer');
    inputContainer.insertBefore(newItem, footer);

    const checkedIcon = document.createElement('div');
    checkedIcon.classList.add('input__item-checked');
    newItem.appendChild(checkedIcon);

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('input__item-close');
    newItem.appendChild(closeIcon);
    closeBtns.push(closeIcon);
  };
  

  inputField.addEventListener('keypress', (e) => {
    const inputValue = inputField.value;

    if (e.key === 'Enter' && inputValue != '') {
      createArrow();
      addNewItem(inputValue);
      closeBtns.forEach((element) => {
        element.addEventListener('click', () => {
          element.parentNode.remove();
        });
      });
    }
  });
}());
