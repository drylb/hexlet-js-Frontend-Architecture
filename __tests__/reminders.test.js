/* eslint-disable no-undef */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import testingLibraryUserEvent from '@testing-library/user-event';

import run from '../src/reminders';

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'remindersIndex.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application', () => {
  const task1 = 'First Task in General';
  userEvent.type(screen.getByLabelText(/new task name/i), task1);
  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue(task1);
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue('');
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));

  const task2 = 'Second Task in General';
  userEvent.type(screen.getByLabelText(/new task name/i), task2);
  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue(task2);
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue('');
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));

  const list1 = 'Random';
  userEvent.type(screen.getByRole('textbox', { name: /new list name/i }), list1);
  expect(screen.getByRole('textbox', { name: /new list name/i })).toHaveDisplayValue(list1);
  userEvent.click(screen.getByRole('button', { name: /add list/i }));

  expect(screen.getByRole('textbox', { name: /new list name/i })).toHaveDisplayValue('');
  expect(screen.getByRole('link', { name: list1 })).toBeInTheDocument();
  expect(document.querySelector('[data-container="lists"]')).toContainElement(screen.getByText(list1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));

  const linkToRandom = screen.getByText(list1);
  userEvent.click(linkToRandom);

  expect(screen.queryByRole('link', { name: list1 })).not.toBeInTheDocument();
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();

  const task3 = 'Task in Random';
  userEvent.type(screen.getByLabelText(/new task name/i), task3);
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task3));

  const linkToGeneral = screen.getByRole('link', { name: /general/i });
  userEvent.click(linkToGeneral);

  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));
});

test('fresh application', () => {
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();
  expect(document.querySelector('[data-container="lists"]')).toContainElement(screen.getByRole('listitem'));
});
