/* eslint-disable no-undef */
/* eslint no-param-reassign: ["error", { "props": false }] */

import i18n from 'i18next';
import onChange from 'on-change';
import resources from './localesModule';

// BEGIN (write your solution here)

// VERSION #1 With custom translate function.

/* const translate = ({ lng, clicks }) => {
  const resetBtn = document.querySelector('.btn-warning');
  const counterBtn = document.querySelector('.btn-info');
  if (lng === 'ru') {
    resetBtn.textContent = 'сбросить';
    if (clicks === 0) {
      counterBtn.textContent = `${clicks} кликов`;
    } else if (clicks === 1) {
      counterBtn.textContent = `${clicks} клик`;
    } else if (clicks === 2) {
      counterBtn.textContent = `${clicks} клика`;
    } else if (clicks === 3) {
      counterBtn.textContent = `${clicks} клика`;
    } else if (clicks === 4) {
      counterBtn.textContent = `${clicks} клика`;
    } else {
      counterBtn.textContent = `${clicks} кликов`;
    }
  } else {
    resetBtn.textContent = 'reset';
    if (clicks === 0) {
      counterBtn.textContent = `${clicks} clicks`;
    } else if (clicks === 1) {
      counterBtn.textContent = `${clicks} click`;
    } else {
      counterBtn.textContent = `${clicks} clicks`;
    }
  }
};

export default () => {
  const state = {
    lng: 'en',
    clicks: 0,
  };

  const watchedState = onChange(state, (path, value) => {
    const selectedBtn = document.querySelector('.btn-primary');
    const unSelectedBtn = document.querySelector('.btn-outline-primary');

    if (value === 'ru') {
      selectedBtn.classList.add('btn-outline-primary');
      selectedBtn.classList.remove('btn-primary');

      unSelectedBtn.classList.add('btn-primary');
      unSelectedBtn.classList.remove('btn-outline-primary');
    }
    if (value === 'en') {
      selectedBtn.classList.add('btn-outline-primary');
      selectedBtn.classList.remove('btn-primary');

      unSelectedBtn.classList.add('btn-primary');
      unSelectedBtn.classList.remove('btn-outline-primary');
    }
    translate(state);
  });

  const container = document.querySelector('.container');
  const lngButtonsHTML = `
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-primary">English</button>
    <button type="button" class="btn btn-outline-primary">Русский</button>
  </div>`;
  container.innerHTML = lngButtonsHTML;

  const counterBtn = document.createElement('button');
  counterBtn.classList.add('btn', 'btn-info');
  counterBtn.textContent = `${state.clicks} clicks`;

  container.appendChild(counterBtn);

  const resetBtn = document.createElement('button');
  resetBtn.classList.add('btn', 'btn-warning');
  resetBtn.textContent = 'reset';

  container.appendChild(resetBtn);

  const otherBtns = document.querySelectorAll('.btn');
  otherBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if ([...e.target.classList].includes('btn-info')) {
        watchedState.clicks += 1;
      }
      if ([...e.target.classList].includes('btn-warning')) {
        watchedState.clicks = 0;
      }
      const lang = e.target.textContent;
      if (lang === 'Русский') {
        watchedState.lng = 'ru';
      }
      if (lang === 'English') {
        watchedState.lng = 'en';
      }
    });
  });
}; */

// VERSION #2 using i18n library
export default async () => {
  const state = {
    languages: {
      Русский: 'ru',
      English: 'en',
    },
    activeLng: 'English',
    clickValue: 0,
  };
  await i18n.init({
    lng: state.languages[state.activeLng],
    resources,
  });

  const render = (stat) => {
    const btnGroup = document.createElement('div');
    const clickBtn = document.createElement('button');
    const resetBtn = document.createElement('button');
    const container = document.querySelector('.container');
    const newContainer = document.createElement('div');

    newContainer.setAttribute('class', 'container card w-25 p-3 m-3');
    btnGroup.setAttribute('class', 'btn-group');
    btnGroup.setAttribute('role', 'group');
    const languages = Object.entries(state.languages);
    languages.forEach(([language]) => {
      const langBtn = document.createElement('button');
      langBtn.setAttribute('type', 'button');
      if (language === stat.activeLng) {
        langBtn.setAttribute('class', 'btn btn-primary');
      } else {
        langBtn.setAttribute('class', 'btn btn-outline-primary');
      }
      langBtn.textContent = language;
      btnGroup.append(langBtn);
    });

    clickBtn.setAttribute('type', 'button');
    clickBtn.setAttribute('class', 'btn btn-info');
    clickBtn.textContent = i18n.t('clickButton.key', {
      count: stat.clickValue,
    });
    resetBtn.setAttribute('type', 'button');
    resetBtn.setAttribute('class', 'btn btn-warning');
    resetBtn.textContent = i18n.t('resetButton');
    newContainer.appendChild(btnGroup);
    newContainer.appendChild(clickBtn);
    newContainer.appendChild(resetBtn);
    container.replaceWith(newContainer);

    const langButtons = document.querySelectorAll('.btn-group .btn');
    const watchedState = onChange(stat, (path, value) => {
      if (path === 'clickValue') {
        const clickButton2 = document.querySelector('.btn-info');
        clickButton2.textContent = i18n.t('clickButton.key', { count: value });
      }
      if (path === 'activeLng') {
        i18n.changeLanguage(watchedState.languages[value]);
        clickBtn.textContent = i18n.t('clickButton.key', {
          count: watchedState.clickValue,
        });
        resetBtn.textContent = i18n.t('resetButton');
        watchedState.activeLng = value;
        render(watchedState);
      }
    });

    clickBtn.addEventListener('click', () => {
      watchedState.clickValue += 1;
    });

    resetBtn.addEventListener('click', () => {
      watchedState.clickValue = 0;
    });

    langButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        watchedState.activeLng = e.target.textContent;
      });
    });
  };
  render(state);
};
// END

/* В этом упражнении вам предостоит запрограммировать мультиязычный счётчик нажатий,
состоящий из переключателя языка, кнопки с числом кликов и кнопки сброса счётчика.

Начальное состояние:

<div class="btn-group" role="group">
    <button type="button" class="btn btn-primary">English</button>
    <button type="button" class="btn btn-outline-primary">Русский</button>
</div>
<button type="button" class="btn btn-info">0 clicks</button>
<button type="button" class="btn btn-warning">Reset</button>
После двух нажатий и переключения на русский язык:

<div class="btn-group" role="group">
    <button type="button" class="btn btn-outline-primary">English</button>
    <button type="button" class="btn btn-primary">Русский</button>
</div>
<button type="button" class="btn btn-info">2 клика</button>
<button type="button" class="btn btn-warning">Сбросить</button>
src/application.js

Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.
Тексты должны подставляться через библиотеку i18next.

src/locales/en.js
Реализуйте тексты для англоязычной версии приложения.

src/locales/ru.js
Реализуйте тексты для русскоязычной версии приложения. */
