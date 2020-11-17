import React from 'react';
import { render } from '@testing-library/react';
import CurrentOrderProducts from './CurrentOrderProducts';
import renderer from 'react-test-renderer';

const product = {
  id: 1,
  title: "Coca-Cola",
  price: 2.5,
  description: "",
  ingredients: [
    {ingredient:[
      {IngredientTitle: "Water"}
    ]}
  ]
};

it('CurrentOrderProducts render correctly', () => {
  const tree = renderer
    .create(<CurrentOrderProducts product={product} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CurrentOrderProducts', () => {
  const { getByText } = render(<CurrentOrderProducts product={product} />);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})