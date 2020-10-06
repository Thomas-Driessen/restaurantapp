import React from 'react';
import { render } from '@testing-library/react';
import PreviousOrders from './PreviousOrders';

test('Render PreviousOrders', () => {
    const { getByText } = render(<PreviousOrders />);
    const linkElement = getByText(/These are your previous orders/i);
    expect(linkElement).toBeInTheDocument();
  });