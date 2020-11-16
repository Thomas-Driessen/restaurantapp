import React from 'react';
import { render } from '@testing-library/react';
import ProductsList from './ProductsList';
import renderer from 'react-test-renderer';

const products = [
  {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: ""
  },
  {
    id: 2,
    title: "Pepsi",
    price: 2,
    description: ""
  },
];

test('Render Product Coca-Cola', () => {
  const { getByText } = render(<ProductsList products={products} />);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Product Pepsi', () => {
  const { getByText } = render(<ProductsList products={products} />);
  const linkElement = getByText(/Pepsi/i);
  expect(linkElement).toBeInTheDocument();
});

it('ProductsList renders correctly', () => {
  const tree = renderer
    .create(<ProductsList products={products} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})