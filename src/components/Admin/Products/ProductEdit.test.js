import React from 'react';
import ProductEdit from './ProductEdit';
import renderer from 'react-test-renderer';


const product = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: "",
    category: { categoryName: "Drinks" },
    onMenu: true,
    ingredients: [{
      ingredient: [{
        ingredientTitle: ""
      }]
    }]
};

const categories = [
    { categoryName: "Drinks" },
    { categoryName: "Coffee" }
]

it('ProductEdit renders correctly', () => {
    const tree = renderer
        .create(<ProductEdit product={product} foodCategories={categories} drinkCategories={categories} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    global.gc && global.gc()
})