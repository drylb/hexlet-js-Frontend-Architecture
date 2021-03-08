/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign, no-console  */

import _ from 'lodash';
import * as yup from 'yup';
// import onChange from 'on-change';
import axios from 'axios';

// Never hardcore urls
const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation does not match to password',
    ),
});

const networkErrorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};

// BEGIN (write your solution here)

export default () => {
  const form = document.querySelector('form');
  const inputs = document.querySelectorAll('input');

  const sendToDB = async (data) => {
    const response = await axios.post(routes.usersPath(), data);
    return response;
  };

  const render = async (state) => {
    const { errorMessages } = state;
    Object.entries(errorMessages).forEach(([errKey, errMessage]) => {
      const elementToSelect = document.querySelector(`[name=${errKey}]`);
      elementToSelect.classList.remove('is-valid');
      elementToSelect.classList.add('is-invalid');
      const closestGroup = elementToSelect.closest('.form-group');
      if (closestGroup.lastElementChild.textContent.startsWith('password')
          || closestGroup.lastElementChild.textContent.startsWith('Password')
          || closestGroup.lastElementChild.textContent.startsWith('email')) {
        closestGroup.lastElementChild.remove();
      }
      if (errMessage === null) {
        elementToSelect.classList.remove('is-invalid');
        elementToSelect.classList.add('is-valid');
      } else {
        const div = document.createElement('div');
        div.textContent = errMessage;
        div.classList.add('invalid-feedback');
        closestGroup.appendChild(div);
      }
    });
    const submitBtn = document.querySelector('.btn');
    const result = Object.entries(errorMessages).every(([, value]) => value === null);
    if (result) {
      submitBtn.disabled = false;
      const { email, password, passwordConfirmation } = state;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cardBody = document.querySelector('.card-body');
        submitBtn.disable = true;
        const response = await sendToDB({ email, password, passwordConfirmation });
        submitBtn.disabled = false;
        if (response.status === 200) {
          cardBody.textContent = 'User Created';
        } else {
          cardBody.textContent = networkErrorMessages.network.error;
        }
      });
    } else {
      submitBtn.disabled = true;
    }
  };
  const state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    errorMessages: {
      email: null,
      password: null,
      passwordConfirmation: null,
    },
  };
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      e.preventDefault();
      const { name: fieldName } = e.target;
      const { value } = e.target;
      state[fieldName] = value;
      const validationResult = validate(state);
      state.errorMessages[fieldName] = null;
      Object.entries(validationResult).forEach(([errKey, errMessage]) => {
        state.errorMessages[errKey] = String(errMessage).slice(17);
      });
      render(state);
    });
  });
};
// END
/*
В этой задаче вам предстоит реализовать форму регистрации. Форма состоит из 4 полей (имя, email, пароль и его подтверждение). Начальный HTML доступен в public/index.html.

Форма должна быть контролируемой. Во время набора данных выполняется валидация сразу всех полей (для простоты). Валидацию нужно построить на базе библиотеки yup. В коде уже описана вся нужная валидация. Осталось только вызвать проверку и записать тексты ошибок в объект состояния.

Кнопка отправки формы по умолчанию заблокирована. Она разблокируется когда валидна вся форма целиком и блокируется сразу, как только появляется невалидное значение.

HTML когда введены неправильные email и password (один из возможных вариантов):

<div data-container="sign-up">
  <form data-form="sign-up" method="post">
    <div class="form-group">
      <label for="sign-up-name">Name</label>
      <input id="sign-up-name" type="text" class="form-control" name="name">
    </div>
    <div class="form-group">
      <label for="sign-up-email">Email<sup>*</sup></label>
      <!-- Если поле невалидно, то добавляется класс is-invalid -->
      <input id="sign-up-email" required="" type="email" class="form-control is-invalid" name="email"><div class="invalid-feedback">Value is not a valid email</div>
    </div>
    <div class="form-group">
      <label for="sign-up-password">Password<sup>*</sup></label>
      <input id="sign-up-password" required="" type="password" class="form-control is-invalid" name="password"><div class="invalid-feedback">Must be at least 6 letters</div>
    </div>
    <div class="form-group">
      <label for="sign-up-password-confirmation">Password Confirmation<sup>*</sup></label>
      <input id="sign-up-password-confirmation" required="" type="password" class="form-control" name="passwordConfirmation">
    </div>
    <input type="submit" class="btn btn-primary" value="Submit" disabled>
  </form>
</div>
После того как все поля введены правильно, данные формы отправляются постом на урл /users. Во время отправки кнопка отправки блокируется (во избежание двойной отправки).

Когда форма отправлена, HTML меняется на следующий:

<div data-container="sign-up">User Created!</div>
src/application.js
Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику. */
