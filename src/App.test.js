import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Menu from './pages/Menu'
import ViewOrder from './pages/ViewOrder'

test('404 Not Found', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/It seems that this page does not exist/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Menu', () => {
  const { getByText } = render(
    <Menu />
  );
  const linkElement = getByText(/Choose between Foods, Drinks and Most Liked to see our products/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render ViewOrder', () => {
  const { getByText } = render(
    <ViewOrder />
  );
  const linkElement = getByText(/Pay for orders/i);
  expect(linkElement).toBeInTheDocument();
});