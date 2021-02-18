import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import testingLibraryUserEvent from '@testing-library/user-event';

import run from '../src/calc';

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'calcIndex.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('working process 1', () => {
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');
  const reset = screen.getByRole('button', { name: /reset/i });
  const result = document.getElementById('result');
  expect(result).toHaveTextContent(/^0$/);

  userEvent.type(input, '3');
  userEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);

  userEvent.type(input, '10');
  userEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^13$/);

  userEvent.type(input, '7');
  userEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^20$/);

  userEvent.click(reset);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^0$/);
});

test('working process 2', () => {
  const result = document.getElementById('result');
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');

  expect(result).toHaveTextContent(/^0$/);

  userEvent.type(input, '3');
  userEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);
});
