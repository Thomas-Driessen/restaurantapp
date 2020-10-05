import React from 'react';
import { render } from '@testing-library/react';
import CurrentOrder from './CurrentOrder';

test('Render CurrentOrder', () => {
    const { getByText } = render(<CurrentOrder />);
    const linkElement = getByText(/This is your current order/i);
    expect(linkElement).toBeInTheDocument();
  });