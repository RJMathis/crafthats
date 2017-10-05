import React from 'react';
import ReactDOM from 'react-dom';
import Styles from "../components/Styles"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Styles/>, div);
});
