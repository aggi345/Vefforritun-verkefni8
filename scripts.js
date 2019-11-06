const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;

    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      item.querySelector('.item__checkbox').addEventListener('change', finish);

      item.querySelector('.item__text').addEventListener('click', edit);

      item.querySelector('.item__button').addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    let input = e.target.querySelector('.form__input')
    let text = input.value;

    if (text.trim().length > 0) {
      add(text);
      input.value = '';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let text = e.target.textContent

    let input = el('input', 'item__edit');
    input.value = text;
    input.addEventListener('keypress', commit);

    e.target.parentNode.replaceChild(input, e.target);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      const text = e.target.value;

      const span = el('span', 'item__text', edit);
      span.textContent = text;

      e.target.parentNode.replaceChild(span, e.target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let ele = el('li', 'item');

    let input = el('input', 'item__checkbox');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', finish);

    let span = el('span', 'item__text', edit);
    span.textContent = value;

    let button = el('button', 'item__button', deleteItem);
    button.textContent = 'Eyða';

    ele.appendChild(input);
    ele.appendChild(span);
    ele.appendChild(button);

    items.appendChild(ele);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentNode.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let element = document.createElement(type);

    if (className) {
      element.setAttribute('class', className);
    }

    if (clickHandler) {
      element.addEventListener('click', clickHandler);
    }

    return element;
  }

  return {
    init: init
  }
})();
