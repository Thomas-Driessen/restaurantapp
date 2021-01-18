import React from 'react';
import { render } from '@testing-library/react';
import ProductsList from './ProductsList';
import renderer from 'react-test-renderer';

const categories = [
  {
    id: "08d879eb-470a-48fd-831c-3434cd5d9538",
    categoryName: "Beverages",
    image: "https://res.cloudinary.com/drb2yh2dy/image/upload/v1604402030/Categories/fimtdknnspi1unrwnpqq.jpg",
    products: [
      {
        ingredients: [],
        id: 2,
        title: "Pepsi",
        price: 2.5,
        image: "https://res.cloudinary.com/drb2yh2dy/image/upload/v1604401540/Drink/s1e8ifglldkffmzof5ib.jpg",
        onMenu: true,
        category: { categoryName: "Drinks" },
      }
    ]
  },
  {
    id: "08d879f8-803f-4047-83fc-d90260c109dc",
    categoryName: "Beverages",
    image: "https://res.cloudinary.com/drb2yh2dy/image/upload/v1604402030/Categories/fimtdknnspi1unrwnpqq.jpg",
    products: [
      {
        ingredients: [],
        id: 2,
        title: "Coca-Cola",
        price: 6,
        image: "https://res.cloudinary.com/drb2yh2dy/image/upload/v1604401540/Drink/s1e8ifglldkffmzof5ib.jpg",
        onMenu: true,
        category: { categoryName: "Drinks" },
      }
    ]
  },
];

const categoryFood = [
  { categoryName: "Pizza" },
  { categoryName: "Pasta" }
]

const categoryDrink = [
  { categoryName: "Drinks" },
  { categoryName: "Coffee" }
]

const ingredients = [
  {ingredient: [{
    ingredientTitle: "Salt"
  }]},
  {ingredient: [{
    ingredientTitle: "Water"
  }]}
]

test('Render Product Coca-Cola', () => {
  const { getByText } = render(<ProductsList categories={categories} foodCategories={categoryFood} drinkCategories={categoryDrink} ingredients={ingredients} />);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Product Pepsi', () => {
  const { getByText } = render(<ProductsList categories={categories} foodCategories={categoryFood} drinkCategories={categoryDrink} ingredients={ingredients} />);
  const linkElement = getByText(/Pepsi/i);
  expect(linkElement).toBeInTheDocument();
});

it('ProductsList renders correctly', () => {
  const tree = renderer
    .create(<ProductsList categories={categories} foodCategories={categoryFood} drinkCategories={categoryDrink} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})