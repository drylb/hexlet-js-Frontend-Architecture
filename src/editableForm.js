/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here)

// VERSION #1 =====================================

export default () => {
  const state = {
    name: {
      open: false,
      string: '',
      key: 'name',
    },
    email: {
      open: false,
      string: '',
      key: 'email',
    },
  };

  const render = (s) => {
    const objToRender = document.querySelector(`[data-editable-target=${s.key}]`);
    if (s.open) {
      objToRender.innerHTML = `<form><input type="text" name="${s.key}" value=${s.string}><input type="submit" value="Save"></form>`;
    } else {
      objToRender.innerHTML = s.string === '' ? `<i>${s.key}</i>` : `${s.string}`;
    }
  };

  const divs = document.querySelectorAll('[data-editable-target]');
  divs.forEach((div) => {
    const key = div.getAttribute('data-editable-target');
    div.addEventListener('click', () => {
      if (!state[key].open) {
        state[key].open = true;
        render(state[key]);
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          state[key].string = formData.get(`${key}`);
          state[key].open = false;
          render(state[key]);
        });
      }
    });
  });
};

// VERSION #2 =====================================

/* const buildText = (name, { value }) => {
  const processedValue = value.trim();
  if (processedValue === '') {
    const i = document.createElement('i');
    i.innerHTML = name;
    return i;
  }
  return document.createTextNode(value);
};

const buildForm = (element, name, state, rerender) => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = name;
  input.setAttribute('value', state.value);
  form.appendChild(input);
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Save';
  form.appendChild(submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    state.value = formData.get(name);
    state.mode = 'text';
    rerender(element, name, state);
  });

  return { form, input, submit };
};

const render = (element, name, state) => {
  element.innerHTML = '';
  switch (state.mode) {
    case 'form': {
      const result = buildForm(element, name, state, render);
      element.appendChild(result.form);
      result.input.select();
      break;
    }
    case 'text':
      element.appendChild(buildText(name, state));
      break;
    default:
      throw new Error(`Unknown mode: ${state.mode}`);
  }
};

const handle = (element, name, state) => () => {
  if (state.mode === 'text') {
    state.mode = 'form';
    render(element, name, state);
  }
};

export default () => {
  const elements = document.querySelectorAll('[data-editable-target]');
  elements.forEach((element) => {
    const state = {
      mode: 'text',
      value: '',
    };
    const name = element.dataset.editableTarget;
    element.addEventListener('click', handle(element, name, state));
  });
}; */
// END
