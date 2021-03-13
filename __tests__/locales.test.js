// @ts-check

import fs from 'fs';
import path from 'path';
import testingLibrary from '@testing-library/dom';
import userEventHelpers from '@testing-library/user-event';
import '@testing-library/jest-dom';

import run from '../src/locales';

const { screen } = testingLibrary;
const userEvent = userEventHelpers.default;

const getFixture = (filename) => fs.readFileSync(path.join('__fixtures__', filename)).toString();

beforeEach(async () => {
  const initHtml = getFixture('localesIndex.html');
  document.body.innerHTML = initHtml;
  await run();
});

test('i18n', async () => {
  expect(screen.getByRole('button', { name: /0 clicks/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /русский/i }));
  expect(await screen.findByRole('button', { name: /0 кликов/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /сбросить/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /english/i }));
  expect(await screen.findByRole('button', { name: /0 clicks/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
});

test('plurals', async () => {
  userEvent.click(screen.getByRole('button', { name: /0 clicks/i }));
  expect(screen.getByRole('button', { name: /1 click/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /1 click/i }));
  expect(screen.getByRole('button', { name: /2 clicks/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /русский/i }));
  expect(await screen.findByRole('button', { name: /2 клика/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /2 клика/i }));
  userEvent.click(screen.getByRole('button', { name: /3 клика/i }));
  userEvent.click(screen.getByRole('button', { name: /4 клика/i }));
  userEvent.click(screen.getByRole('button', { name: /5 кликов/i }));
  userEvent.click(screen.getByRole('button', { name: /сбросить/i }));
  userEvent.click(screen.getByRole('button', { name: /0 кликов/i }));
  expect(screen.getByRole('button', { name: /1 клик/i })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /english/i }));
  expect(await screen.findByRole('button', { name: /1 click/i })).toBeInTheDocument();
});
