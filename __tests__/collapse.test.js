/* eslint-disable no-undef */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import testingLibraryUserEvent from '@testing-library/user-event';

import run from '../src/collapse';

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

let companies;

beforeEach(() => {
  companies = [
    { id: 1, name: 'Hexlet', description: 'online courses' },
    { id: 2, name: 'Google', description: 'search engine' },
    { id: 3, name: 'Facebook', description: 'social network' },
  ];

  const initHtml = fs.readFileSync(path.join('__fixtures__', 'collapseIndex.html')).toString();
  document.body.innerHTML = initHtml;
  run(companies);
});

test('working process', () => {
  const company1 = companies[0];
  userEvent.click(screen.getByText(company1.name));
  expect(document.body).toHaveTextContent(company1.description);

  userEvent.click(screen.getByText(company1.name));
  expect(document.body).not.toHaveTextContent(company1.description);

  const company2 = companies[1];
  userEvent.click(screen.getByText(company2.name));
  expect(document.body).toHaveTextContent(company2.description);

  const company3 = companies[2];
  userEvent.click(screen.getByText(company3.name));
  expect(document.body).toHaveTextContent(company3.description);

  userEvent.click(screen.getByText(company3.name));
  expect(document.body).not.toHaveTextContent(company3.description);
});

test('initial state', async () => {
  companies.forEach((c) => {
    expect(document.body).not.toHaveTextContent(c.description);
  });

  companies.forEach((c) => {
    expect(document.body).toHaveTextContent(c.name);
  });
});
