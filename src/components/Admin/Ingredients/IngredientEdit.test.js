import React from 'react';
import IngredientEdit from './IngredientEdit';
import renderer from 'react-test-renderer';

const ingredient = {
  ingredientId: 1,
  ingredientTitle: "Salt",
  ingredientQuantity: 400,
  price: 2.5
};

it('IngredientEdit renders correctly', () => {
  const tree = renderer
    .create(<IngredientEdit ingredient={ingredient} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})