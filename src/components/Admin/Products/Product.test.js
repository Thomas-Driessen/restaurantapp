import React from 'react';
import { render } from '@testing-library/react';
import Product from './Product';
import renderer from 'react-test-renderer';


const product = {
  id: 1,
  title: "Coca-Cola",
  price: 2.5,
  description: "",
  category: {categoryName: "Drinks"}
};
const categories= [
  {categoryName: "Drinks"},
  {categoryName: "Coffee"}
]

it('Product renders correctly', () => {
  const tree = renderer
    .create(<Product product={product} foodCategories={categories} drinkCategories={categories}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Product', () => {
  const { getByText } = render(<Product product={product} foodCategories={categories} drinkCategories={categories}/>);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
  });