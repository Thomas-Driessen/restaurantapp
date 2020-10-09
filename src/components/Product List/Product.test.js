import React from 'react';
import { render } from '@testing-library/react';
import Product from './Product';
import renderer from 'react-test-renderer';

it('Product renders correctly', () => {
  const tree = renderer
    .create(<Product />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Product', () => {
  var product = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: ""
  };
  const { getByText } = render(<Product product={product}/>);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
  });