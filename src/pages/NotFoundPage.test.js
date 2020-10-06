import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

test('404 Not Found', () => {
  const { getByText } = render(<NotFoundPage/>);
  const linkElement = getByText(/It seems that this page does not exist/i);
  expect(linkElement).toBeInTheDocument();
});