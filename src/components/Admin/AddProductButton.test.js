import React from 'react';
import { render } from '@testing-library/react';
import AddProductButton from './AddProductButton';
import renderer from 'react-test-renderer';

const products = [
    {
        id: 1,
        title: "Coca-Cola",
        price: 2.5,
        description: "",
        category: {categoryName: "Drinks"}
      },
      {
        id: 2,
        title: "Pepsi",
        price: 2,
        description: "",
        category: {categoryName: "Drinks"}
      },
];

const categories= [
  {categoryName: "Drinks"},
  {categoryName: "Coffee"}
]

test('Render AddProductButton', () => {
  const { getByText } = render(<AddProductButton products={products} foodCategories={categories} drinkCategories={categories}/>);
  const linkElement = getByText(/Add product/i);
  expect(linkElement).toBeInTheDocument();
});

it('AddProductButton renders correctly', () => {
    const tree = renderer
      .create(<AddProductButton products={products} foodCategories={categories} drinkCategories={categories}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
});