import React from 'react';
import { render } from '@testing-library/react';
import IngredientsList from './IngredientsList';
import renderer from 'react-test-renderer';

const ingredients = [
  {
    ingredientId: 1,
    ingredientTitle: "Salt",
    ingredientQuantity: 400,
    price: 2.5,
  },
  {
    ingredientId: 2,
    ingredientTitle: "Vinegar",
    ingredientQuantity: 400,
    price: 2.5,
  },
];

test('Render Ingredient Salt', () => {
  const { getByText } = render(<IngredientsList ingredients={ingredients} />);
  const linkElement = getByText(/Salt/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Ingredient Vinegar', () => {
  const { getByText } = render(<IngredientsList ingredients={ingredients} />);
  const linkElement = getByText(/Vinegar/i);
  expect(linkElement).toBeInTheDocument();
});

it('IngredientsList renders correctly', () => {
  const tree = renderer
    .create(<IngredientsList ingredients={ingredients} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})