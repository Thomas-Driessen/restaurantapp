import React from 'react';
import { render } from '@testing-library/react';
import KitchenProductList from './KitchenProductList';
import renderer from 'react-test-renderer';

const products = [
  {
    title: ["Coca-Cola"],
    tableNumber: 3,
    state: [false],
    timestamp: "14:51:58"
  },
  {
    title: ["Pepsi"],
    tableNumber: 2,
    state: [false],
    timestamp: "14:53:11"
  },
];

test('Render Product Coca-Cola', () => {
  const { getByText } = render(<KitchenProductList products={products} />);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Product Pepsi', () => {
  const { getByText } = render(<KitchenProductList products={products} />);
  const linkElement = getByText(/Pepsi/i);
  expect(linkElement).toBeInTheDocument();
});

it('KitchenProductList renders correctly', () => {
  const tree = renderer
    .create(<KitchenProductList products={products} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})