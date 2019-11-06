const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let form;

  function init(_form, _items) {
    items = _items;
    form = _form;
    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      console.log(item)
      item.querySelector('.item__checkbox').addEventListener('change', finish);

      item.querySelector('.item__text').addEventListener('click', edit);

      item.querySelector('.item__button').addEventListener('click', deleteItem);


    }

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    const INPUT = e.target.querySelector('.form__input')
    let text = INPUT.value;

    if (text.trim().length > 0) {
      add(text);
      INPUT.value = '';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const text = e.target.textContent

    const input = el('input', 'item__edit');
    input.value = text;
    input.addEventListener('keypress', commit);

    e.target.parentNode.replaceChild(input, e.target);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === 13) {
      const text = e.target.value;

      const span = el('span', 'item__text', edit);
      span.textContent = text;

      e.target.parentNode.replaceChild(span, e.target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let ele = el('li', 'item', null);

    const input = el('input', 'item__checkbox');
    input.addEventListener('change', finish);
    input.setAttribute('type', 'checkbox');

    const span = el('span', 'item__text', edit);
    span.textContent = value;

    const button = el('button', 'item__button', deleteItem);
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
    const element = document.createElement(type);

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
