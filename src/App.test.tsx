import React from 'react';
import ReactDom from 'react-dom'
import { render, screen, waitFor } from '@testing-library/react';

import App, {cityList} from './App';



it('renders without crashing', ()=>{
  const div = document.createElement('div')
  ReactDom.render(<App />, div)
})

it('should have a table', ()=>{
  const table = document.createElement('table')
  ReactDom.render(<App />, table)
})

test('renders title ', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather for Tomorrow/i);
  expect(linkElement).toBeInTheDocument();
});

