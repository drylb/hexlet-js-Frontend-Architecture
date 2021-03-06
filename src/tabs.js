/* eslint-disable no-undef */
import onChange from 'on-change';

// BEGIN (write your solution here)

// VERSION #1 ======================================

export default () => {
  const state = {
    selectedTab1: 'list-home-list',
    selectedTab2: 'list2-home-list',
  };

  const allTabs = [...document.querySelectorAll('.list-group')];

  const watchedState = onChange(state, (path, value, previousValue) => {
    const removeSelect = document.querySelector(`#${previousValue}`);
    removeSelect.classList.remove('active');

    const addSelect = document.querySelector(`#${value}`);
    addSelect.classList.add('active');

    const removeContent = document.querySelector(`#${previousValue.slice(0, -5)}`);
    removeContent.classList.remove('active', 'show');

    const addContent = document.querySelector(`#${value.slice(0, -5)}`);
    addContent.classList.add('active', 'show');
  });

  allTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const name = e.target.id;
      if (name.includes('2')) {
        watchedState.selectedTab2 = name;
      } else {
        watchedState.selectedTab1 = name;
      }
    });
  });
};

// VERSION #2 ======================================

/* export default () => {
   const state = {
    lists: {},
  };

  const lists = document.querySelectorAll('[role="tablist"]');

  lists.forEach((list) => {
    const listId = list.id;
    const activeTab = list.querySelector('[role="tab"].active');

    state.lists[listId] = {
      tabId: activeTab.id,
    };
  });

  const watchedState = onChange(state, (path, current, previous) => {
    const currentTab = document.querySelector(`#${current}`);
    const currentPanel = document.querySelector(`[aria-labelledby="${current}"]`);
    const previousTab = document.querySelector(`#${previous}`);
    const previousPanel = document.querySelector(`[aria-labelledby="${previous}"]`);

    currentTab.classList.add('active');
    currentPanel.classList.add('active', 'show');
    previousTab.classList.remove('active');
    previousPanel.classList.remove('active', 'show');
  });

  lists.forEach((list) => {
    const listId = list.id;
    list.addEventListener('click', (e) => {
      e.preventDefault();
      watchedState.lists[listId].tabId = e.target.id;
    });
  });
}; */
// END

/* eslint-disable max-len */
/* Бутстрап позволяет использовать списки для отображения контента при клике по элементу.
В этом задании такие группы списков уже подготовлены, вам предстоит только добавить функционал переключения.

src/application.js
Реализуйте логику переключения табов для компонента list-group бутстрапа, используя архитектуру MVC.

Активный элемент списка получает класс active, а контент, соответствующий ему, получает классы active show

<div class="row">
    <div class="col-4">
        <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
        </div>
    </div>
    <div class="col-8">
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade active show" id="list-home" role="tabpanel" aria-labelledby="list-home-list">Home Content</div>
            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">Profile Content</div>
        </div>
    </div>
</div>
Код должен работать даже в том случае, если на странице есть несколько компонентов list-group. */
