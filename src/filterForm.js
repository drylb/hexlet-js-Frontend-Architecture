/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

// BEGIN (write your solution here)

// VERSION #1 ============================================

/* const render = (state, laptops) => {
  const {
    processor_eq: processor,
    memory_eq: memory,
    frequency_gte: frequencyMin,
    frequency_lte: frequencyMax,
  } = state;
  let result = laptops.map((e) => e);
  const container = document.createElement('ul');
  const resultDiv = document.querySelector('.result');
  resultDiv.innerHTML = '';

  if (processor) {
    result = result.filter((laptop) => laptop.processor === processor);
  }
  if (memory) {
    result = result.filter((laptop) => laptop.memory === Number(memory));
  }
  if (frequencyMin) {
    result = result.filter((laptop) => laptop.frequency >= Number(frequencyMin));
  }
  if (frequencyMax) {
    result = result.filter((laptop) => laptop.frequency <= Number(frequencyMax));
  }
  result.forEach(({ model }) => {
    const list = document.createElement('li');
    list.textContent = model;
    container.appendChild(list);
    resultDiv.appendChild(container);
  });
};

export default () => {
  const state = {
    processor_eq: null,
    memory_eq: null,
    frequency_gte: null,
    frequency_lte: null,
  };
  const input = document.querySelectorAll('input');
  const select = document.querySelectorAll('select');

  input.forEach((inputEl) => {
    inputEl.addEventListener('input', (e) => {
      e.preventDefault();
      const { name } = e.target;
      state[name] = e.target.value;
      render(state, laptops);
    });
  });

  select.forEach((selectEl) => {
    selectEl.addEventListener('change', (e) => {
      e.preventDefault();
      const { name } = e.target;
      state[name] = e.target.value;
      render(state, laptops);
    });
  });
  render(state, laptops);
}; */

// VERSION #2 ============================================
const predicates = {
  eq: (value) => (el) => String(el) === String(value),
  gte: (value) => (el) => (el) >= Number(value),
  lte: (value) => (el) => (el) <= Number(value),
};

const filterItems = (query, items) => {
  const fields = Object.keys(query);
  const activeFields = fields.filter((field) => query[field]);
  const result = activeFields.reduce((acc, field) => {
    const [name, predicateName] = field.split('_');
    const match = predicates[predicateName];
    return acc.filter((item) => match(query[field])(item[name]));
  }, items);
  return result;
};

const render = (state) => {
  const resultElement = document.querySelector('.result');
  const filteredLaptops = filterItems(state.filter, laptops);
  if (filteredLaptops.length === 0) {
    resultElement.innerHTML = '';
    return;
  }
  const html = `<ul>${filteredLaptops.map((laptop) => `<li>${laptop.model}</li>`).join('')}</ul>`;
  resultElement.innerHTML = html;
};

export default () => {
  const state = {
    filter: {
      processor_eq: null,
      memory_eq: null,
      frequency_gte: null,
      frequency_lte: null,
    },
  };
  const items = [
    { name: 'processor_eq', eventType: 'change' },
    { name: 'memory_eq', eventType: 'change' },
    { name: 'frequency_gte', eventType: 'input' },
    { name: 'frequency_lte', eventType: 'input' },
  ];
  items.forEach(({ name, eventType}) => {
    const element = document.querySelector(`[name="${name}"]`);
    element.addEventListener(eventType, ({ target }) => {
      state.filter[target.name] = target.value === '' ? null : target.value;
      render(state);
    });
  });
  render(state);
};
// END

/*
src/application.js
Реализуйте и экспортируйте функцию по умолчанию,
которая активизирует фильтр на основе формы доступной в public/index.html.
Изменение любого параметра должно сразу приводить к фильтрации.
Ноутбуки, подходящие под фильтр,выводятся внутри <div class="result"></div> как список ul/li моделей
(свойство model внутри объекта представляющего ноутбук).
Полный список ноутбуков доступен в файле src/application.js.

Условия:

Если фильтр пустой, то выводится все.
Если под фильтр ничего не подходит, то список не выводится. */
