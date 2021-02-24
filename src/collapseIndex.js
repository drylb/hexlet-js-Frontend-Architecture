// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './collapse';

const companies = [
  { id: 1, name: 'Hexlet', description: 'online courses' },
  { id: 2, name: 'Google', description: 'search engine' },
  { id: 3, name: 'Facebook', description: 'social network' },
];

app(companies);
