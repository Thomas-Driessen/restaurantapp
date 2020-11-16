import React from 'react';
import { render } from '@testing-library/react';
import AddCategoryButton from './AddCategoryButton';
import renderer from 'react-test-renderer';

const products = [
  {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: "",
    category: { categoryName: "Drinks" }
  },
  {
    id: 2,
    title: "Pepsi",
    price: 2,
    description: "",
    category: { categoryName: "Drinks" }
  },
];

const categories = [
  { categoryName: "Drinks" },
  { categoryName: "Coffee" }
]

test('Render AddCategoryButton', () => {
  const { getByText } = render(<AddCategoryButton products={products} foodCategories={categories} drinkCategories={categories} />);
  const linkElement = getByText(/Add Category/i);
  expect(linkElement).toBeInTheDocument();
});

it('AddCategoryButton renders correctly', () => {
  const tree = renderer
    .create(<AddCategoryButton products={products} foodCategories={categories} drinkCategories={categories} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})