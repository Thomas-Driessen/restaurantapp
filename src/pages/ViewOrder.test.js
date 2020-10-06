import React from 'react';
import { render } from '@testing-library/react';
import ViewOrder from './ViewOrder'

test('Render ViewOrder', () => {
  const { getByText } = render(<ViewOrder/>);
  const linkElement = getByText(/Pay for orders/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render ViewOrder', () => {
  const { getByText } = render(<ViewOrder/>);
  const linkElement = getByText(/This is your current order/i);
  expect(linkElement).toBeInTheDocument();
});