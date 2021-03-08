/* eslint-disable no-undef */

import '@testing-library/jest-dom';
import testingLibrary from '@testing-library/dom';
import fs from 'fs';
import path from 'path';
import testingLibraryUserEvent from '@testing-library/user-event';
import nock from 'nock';
import run from '../src/registrationForm';

const { screen, waitFor } = testingLibrary;
const userEvent = testingLibraryUserEvent.default;

nock.disableNetConnect();

let elements;

beforeEach(() => {
  const pathToFixture = path.join('__fixtures__', 'registrationFormIndex.html');
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
  run();

  elements = {
    submit: screen.getByText(/Submit/),
    nameInput: screen.getByRole('textbox', { name: /Name/ }),
    emailInput: screen.getByRole('textbox', { name: /Email/ }),
    passwordInput: screen.getByLabelText(/Password/, { selector: '[name="password"]' }),
    passwordConfirmationInput: screen.getByLabelText(/Password Confirmation/),
  };
});

test('submit disabled', async () => {
  expect(screen.queryByText('email must be a valid email')).not.toBeInTheDocument();
  expect(screen.queryByText('Password confirmation does not match to password')).not.toBeInTheDocument();
  expect(elements.emailInput).not.toHaveClass('is-invalid');
  expect(elements.passwordInput).not.toHaveClass('is-invalid');

  await userEvent.type(elements.nameInput, 'Petya');
  await userEvent.type(elements.emailInput, 'wrong-email');
  await userEvent.type(elements.passwordInput, 'long password without confirmation');

  expect(screen.getByRole('button', { selector: '[type="submit"]' })).toBeDisabled();
  expect(elements.emailInput).toHaveClass('is-invalid');
  expect(elements.passwordConfirmationInput).toHaveClass('is-invalid');
  expect(screen.queryByText('email must be a valid email')).toBeInTheDocument();

  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, 'qwert');
  expect(elements.passwordInput).toHaveClass('is-invalid');
  expect(screen.queryByText('password must be at least 6 characters')).toBeInTheDocument();

  expect(screen.getByRole('button', { selector: '[type="submit"]' })).toBeDisabled();

  await userEvent.type(elements.emailInput, 'support@hexlet.io');
  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, 'qwerty');
  await userEvent.clear(elements.passwordConfirmationInput);
  await userEvent.type(elements.passwordConfirmationInput, 'qwerty');

  const scope = nock('http://localhost')
    .post('/users')
    .reply(200);

  userEvent.click(elements.submit);
  await waitFor(() => {
    expect(document.body).toHaveTextContent('User Created');
  });

  scope.done();
});

test('fresh application', async () => {
  expect(screen.getByRole('button')).toBeDisabled();
});
