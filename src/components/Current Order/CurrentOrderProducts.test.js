import React from 'react';
import { render } from '@testing-library/react';
import CurrentOrderProducts from './CurrentOrderProducts';
import renderer from 'react-test-renderer';

it('CurrentOrderProducts render correctly', () => {
  const tree = renderer
    .create(<CurrentOrderProducts />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CurrentOrderProducts', () => {
  var product = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: ""
  };
  const { getByText } = render(<CurrentOrderProducts product={product}/>);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
  });