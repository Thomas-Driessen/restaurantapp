import React from 'react';
import { render } from '@testing-library/react';
import KitchenProduct from './KitchenProduct';
import renderer from 'react-test-renderer';

it('KitchenProduct renders correctly', () => {
  const tree = renderer
    .create(<KitchenProduct />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render KitchenProduct', () => {
  var product = {
    title: "Coca-Cola",
  };
  const { getByText } = render(<KitchenProduct product={product}/>);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
  });