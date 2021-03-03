/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here)
const render = (state) => {
  const dataContainerLists = document.querySelector('[data-container="lists"]');
  const dataContainerTasks = document.querySelector('[data-container="tasks"]');

  const ulTasks = document.createElement('ul');
  const ul = document.createElement('ul');

  dataContainerTasks.innerHTML = '';
  dataContainerTasks.appendChild(ulTasks);

  dataContainerLists.innerHTML = '';
  dataContainerLists.appendChild(ul);

  const html = state.lists.map((list) => {
    if (list.name === state.selectedList) {
      return `<li><b>${list.name}</b></li>`;
    }
    return `<li><a href="#${list.name.trim().toLowerCase()}">${list.name}</a></li>`;
  }).join('');
  ul.innerHTML = html;

  const tasksHTML = state.lists.map((list) => {
    if (list.name === state.selectedList) {
      return list.tasks.map((item) => `<li>${item}</li>`).join('');
    }
    return [];
  }).join('');
  ulTasks.innerHTML = tasksHTML;

  if (dataContainerTasks.firstElementChild.firstElementChild === null) {
    dataContainerTasks.innerHTML = '';
  }

  const ulLists = document.querySelector('[data-container="lists"] > ul');
  ulLists.childNodes.forEach((child) => {
    child.addEventListener('click', (e) => {
      e.preventDefault();
      state.selectedList = e.target.textContent;
      render(state);
    });
  });
};

export default () => {
  const state = {
    selectedList: '',
    lists: [],
  };

  state.lists.push({ name: 'General', tasks: [] });
  state.selectedList = 'General';

  const taskForm = document.querySelector('[data-container="new-task-form"');
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const input = document.querySelector('[data-container="new-task-form"] > input');
    input.value = '';
    input.focus();
    if (name !== '') {
      const selectedName = state.selectedList;
      state.lists.forEach((item) => {
        if (item.name === selectedName) {
          item.tasks.push(name);
        }
      });
      render(state);
    }
  });

  const listForm = document.querySelector('[data-container="new-list-form"]');
  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const input = document.querySelector('[data-container="new-list-form"] > input');
    input.value = '';
    input.focus();
    if (name !== '') {
      state.lists.push({ name, tasks: [] });
      render(state);
    }
  });
  render(state);
};
// END

/* В этой задаче вам предстоит сделать список задач похожий на Reminders из MacOS.
Reminder позволяет планировать задачи и создавать списки задач. По умолчанию,
в нашей реализации сразу должен быть создан список General.
Начальный HTML доступен в public/index.html. После инициализации js он становится таким
(туда добавляется General):

<div class="row">
    <div class="col-4">
        <h3>Lists</h3>
        <form class="form-inline mb-2" data-container="new-list-form">
            <label for="new-task-name" class="sr-only">New list name</label>
            <input type="text" id="new-list-name" class="form-control mr-2" name="name">
            <input type="submit" class="btn btn-primary" value="Add List">
        </form>
        <div data-container="lists"><ul><li><b>General</b></li></ul></div>
    </div>
    <div class="col-4">
        <h3>Tasks</h3>
        <form class="form-inline mb-2" data-container="new-task-form">
            <label for="new-list-name" class="sr-only">New task name</label>
            <input type="text" id="new-task-name" class="form-control mr-2" name="name">
            <input type="submit" class="btn btn-primary" value="Add Task">
        </form>
        <div data-container="tasks"></div>
    </div>
</div>
После добавления первой задачи в список General:

<div class="row">
  <div class="col-4">
    <h3>Lists</h3>
    <form class="form-inline" data-container="new-list-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add List">
    </form>
    <div data-container="lists"><ul><li><b>General</b></li></ul></div>
  </div>
  <div class="col-4">
    <h3>Tasks</h3>
    <form class="form-inline" data-container="new-task-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add Task">
    </form>
    <div data-container="tasks"><ul><li>My First Task</li></ul></div>
  </div>
</div>
После создания нового списка (но до переключения на него):

<div class="row">
  <div class="col-4">
    <h3>Lists</h3>
    <form class="form-inline" data-container="new-list-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add List">
    </form>
    <div data-container="lists"><ul><li><b>General</b></li><li>
    <a href="#random">Random</a></li></ul></div>
  </div>
  <div class="col-4">
    <h3>Tasks</h3>
    <form class="form-inline" data-container="new-task-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add Task">
    </form>
    <div data-container="tasks"><ul><li>My First Task</li></ul></div>
  </div>
</div>
После переключения на список Random:

<div class="row">
  <div class="col-4">
    <h3>Lists</h3>
    <form class="form-inline" data-container="new-list-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add List">
    </form>
    <div data-container="lists"><ul><li><a href="#general">General</a>
    </li><li><b>Random</b></li></ul></div>
  </div>
  <div class="col-4">
    <h3>Tasks</h3>
    <!-- Форма добавления задачи добавляет задачу в текущий активный список -->
    <form class="form-inline" data-container="new-task-form">
      <input type="text" class="form-control mr-2 mb-2" name="name">
      <input type="submit" class="btn btn-primary" value="Add Task">
    </form>
    <div data-container="tasks"></div>
  </div>
</div>
src/application.js
Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику. */
