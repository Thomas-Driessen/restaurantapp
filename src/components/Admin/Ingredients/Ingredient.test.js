import React from 'react';
import { render } from '@testing-library/react';
import Ingredient from './Ingredient';
import renderer from 'react-test-renderer';


const ingredient = {
  ingredientId: 1,
  ingredientTitle: "Salt",
  ingredientQuantity: 400,
  price: 2.5
};

it('Ingredient renders correctly', () => {
  const tree = renderer
    .create(<Ingredient ingredient={ingredient} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Ingredient', () => {
  const { getByText } = render(<Ingredient ingredient={ingredient} />);
  const linkElement = getByText(/Salt/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})