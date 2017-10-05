import React from 'react';
import ReactDOM from 'react-dom';
import Beers from '../components/Beers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Beers />, div);
});
