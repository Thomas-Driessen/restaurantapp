import React from 'react';
import { render } from '@testing-library/react';
import PreviousOrders from './PreviousOrders';
import renderer from 'react-test-renderer';

it('PreviousOrders render correctly', () => {
  const tree = renderer
    .create(<PreviousOrders />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render PreviousOrders', () => {
    const { getByText } = render(<PreviousOrders />);
    const linkElement = getByText(/These are your previous orders/i);
    expect(linkElement).toBeInTheDocument();
  });