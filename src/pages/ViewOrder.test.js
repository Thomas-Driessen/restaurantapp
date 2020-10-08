import React from 'react';
import { render } from '@testing-library/react';
import ViewOrder from './ViewOrder'
import renderer from 'react-test-renderer';

it('ViewOrder renders correctly', () => {
  const tree = renderer
    .create(<ViewOrder />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

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