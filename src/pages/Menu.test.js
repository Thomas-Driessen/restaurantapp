import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';

test('Render Menu', () => {
  const { getByText } = render(<Menu />);
  const linkElement = getByText(/Choose between Foods, Drinks and Most Liked to see our products/i);
  expect(linkElement).toBeInTheDocument();
});