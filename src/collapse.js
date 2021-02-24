/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
// @ts-check

// BEGIN (write your solution here)

// VERSION #1 ===========================================

/* const render = (state) => {
  const resultDiv = document.querySelector('.result');
  resultDiv.innerHTML = '';
  const html = state.uiState.collapse.map((item) => {
    if (item.visibility === 'show') {
      return `<div>${item.description}</div>`;
    }
    return '';
  }).join('');
  resultDiv.innerHTML = html;
};

export default (companies) => {
  const state = {
    companies: [...companies],
    uiState: {
      collapse: [
        { companyId: 1, visibility: 'hidden', description: 'online courses' },
        { companyId: 2, visibility: 'hidden', description: 'search engine' },
        { companyId: 3, visibility: 'hidden', description: 'social network' },
      ],
    },
  };
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  companies.forEach((company) => {
    const button = document.createElement('button');
    button.textContent = company.name;
    button.classList.add('btn', 'btn-primary');
    div.appendChild(button);
    container.appendChild(div);
  });
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('result');
  container.appendChild(resultDiv);
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const companyName = e.target.textContent;
      state.companies.forEach((company) => {
        if (company.name === companyName) {
          state.uiState.collapse.forEach((itemState) => {
            if (itemState.companyId === company.id) {
              if (itemState.visibility === 'show') {
                itemState.visibility = 'hidden';
              } else {
                itemState.visibility = 'show';
              }
            }
          });
        }
      });
      render(state);
    });
  });
}; */

// VERSION #2 ===========================================
const render = (state) => {
  const container = document.querySelector('.container');
  const buttonsContainer = document.createElement('div');

  container.innerHTML = '';

  const buttons = state.companies.map((company) => {
    const html = `
      <button class="btn btn-primary" data-id=${company.id}>
        ${company.name}
      <button>
    `;
    return html;
  });
  buttonsContainer.innerHTML = buttons.join('');

  buttonsContainer.addEventListener('click', (e) => {
    const companyId = parseInt(e.target.dataset.id, 10);
    if (companyId === state.uiState.selectedCompanyId) {
      state.uiState.selectedCompanyId = null;
    } else {
      state.uiState.selectedCompanyId = companyId;
    }
    render(state);
  });
  container.appendChild(buttonsContainer);

  const { selectedCompanyId } = state.uiState;
  const company = state.companies.find((c) => c.id === selectedCompanyId);

  if (company) {
    const outputContainer = document.createElement('div');
    outputContainer.textContent = company.description || '';
    container.appendChild(outputContainer);
  }
};

export default (companies) => {
  const state = {
    companies,
    uiState: {
      selectedCompanyId: null,
    },
  };
  render(state);
};
// END

/* В этой практике вам нужно будет реализовать Collapse

src/application.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход список компаний
(пример списка в файле src/index.js) и использует этот список для формирования кнопок
(по одной на каждую компанию). Нажатие на кнопку приводит к выводу описания компании
(если есть описание другой компании, оно заменяется). Повторное нажатие скрывает вывод.
По умолчанию не показывается никакое описание.

Пример начального вывода (может отличаться от вашего):

<div class="container m-3">
  <div>
    <button class="btn btn-primary">
      Hexlet
    </button>
    <button class="btn btn-primary">
      Google
    </button>
    <button class="btn btn-primary">
      Facebook
    </button>
  </div>
</div>
После клика на второй ссылке:

<div class="container m-3">
  <div>
    <button class="btn btn-primary">
      Hexlet
    </button>
    <button class="btn btn-primary">
      Google
    </button>
    <button class="btn btn-primary">
      Facebook
    </button>
  </div>
  <div>search engine</div>
</div> */
