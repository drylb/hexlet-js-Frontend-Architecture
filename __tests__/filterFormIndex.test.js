/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import testingLibraryDom from '@testing-library/dom';
import testingLibraryUserEvent from '@testing-library/user-event';

import run from '../src/filterForm';

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const getTree = (el) => prettier.format(el.innerHTML, options);

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'filterFormIndex.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('working process', async () => {
  const result = document.querySelector('.result');
  expect(getTree(result)).toMatchSnapshot();

  const frequencyMin = await screen.findByLabelText('Frequency Min');
  userEvent.type(frequencyMin, '3');
  expect(getTree(result)).toMatchSnapshot();

  userEvent.clear(frequencyMin);
  expect(getTree(result)).toMatchSnapshot();

  userEvent.type(frequencyMin, '4');
  expect(getTree(result)).toMatchSnapshot();

  userEvent.clear(frequencyMin);
  userEvent.type(frequencyMin, '1');
  expect(getTree(result)).toMatchSnapshot();

  const frequencyMax = await screen.findByLabelText('Frequency Max');
  userEvent.type(frequencyMax, '2');
  expect(getTree(result)).toMatchSnapshot();
});

test('initial state', async () => {
  const result = document.querySelector('.result');
  expect(getTree(result)).toMatchSnapshot();
});
