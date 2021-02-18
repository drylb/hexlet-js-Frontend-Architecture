/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here)

// VERSION #1 =======================================

/* export default () => {
  const plusBtn = document.querySelector('.btn-primary');
  const resetBtn = document.querySelector('.btn-outline-primary');
  const result = document.querySelector('#result');
  const input = document.querySelector('.form-control');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let currentResult = parseInt(result.textContent, 10);
    currentResult += parseInt(input.value, 10);
    result.textContent = currentResult;
    input.value = '';
    input.focus();
  });
  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    result.textContent = 0;
  });
}; */

// VERSION #2 =======================================

const render = (state, formEl, inputEl, resultEl) => {
  formEl.reset();
  inputEl.focus();
  resultEl.textContent = state;
};

export default () => {
  let state = 0;

  const formEl = document.querySelector('form');
  const inputEl = document.querySelector('input');
  const resetEl = document.querySelector('button');
  const resultEl = document.querySelector('#result');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    state += parseInt(data.get('number'), 10);
    render(state, formEl, inputEl, resultEl);
  });
  resetEl.addEventListener('click', (e) => {
    e.preventDefault();
    state = 0;
    render(state, formEl, inputEl, resultEl);
  });
};

// END
