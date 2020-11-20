import React from 'react';
import { render } from '@testing-library/react';
import AddIngredientButton from './AddIngredientButton';
import renderer from 'react-test-renderer';

test('Render AddIngredientButton', () => {
  const { getByText } = render(<AddIngredientButton  />);
  const linkElement = getByText(/Add Ingredient/i);
  expect(linkElement).toBeInTheDocument();
});

it('AddIngredientButton renders correctly', () => {
  const tree = renderer
    .create(<AddIngredientButton />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})