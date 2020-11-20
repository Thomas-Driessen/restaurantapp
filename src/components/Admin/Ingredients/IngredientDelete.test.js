import React from 'react';
import IngredientDelete from './IngredientDelete';
import renderer from 'react-test-renderer';

const ingredient = {
  ingredientId: 1,
  ingredientTitle: "Salt",
  ingredientQuantity: 400,
  price: 2.5
};

it('IngredientDelete renders correctly', () => {
  const tree = renderer
    .create(<IngredientDelete ingredient={ingredient} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})