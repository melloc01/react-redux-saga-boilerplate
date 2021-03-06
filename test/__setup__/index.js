import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'vendor/polyfills';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'http://localhost:3000/',
});

Object.defineProperty(window.location, 'pathname', {
  writable: true,
  value: '/',
});

Object.defineProperty(window.location, 'search', {
  writable: true,
  value: '',
});

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

const consoleError = console.error;
console.error = jest.fn(message => {
  const skipMessages = [
    'redux-persist failed to create sync storage.',
  ];
  let shouldSkip = false;

  for (const s of skipMessages) {
    if (message.includes(s)) {
      shouldSkip = true;
    }
  }

  if (!shouldSkip) {
    consoleError(message);
  }
});

global.getSaga = (sagas, action) =>
  sagas
    .filter(d => d.FORK.args[0] === action)
    .map(d => d.FORK.args[1])
    .reduce((acc, d) => d);
