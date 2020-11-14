import React from 'react';
import { render } from '@testing-library/react';
import ProductEdit from './ProductEdit';
import renderer from 'react-test-renderer';


const product = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: "",
    category: { categoryName: "Drinks" },
    onMenu: true
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

test('Render ProductEdit', () => {
    const { getByText } = render(<ProductEdit product={product} foodCategories={categories} drinkCategories={categories} />);
    const linkElement = getByText(/Edit/i);
    expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
    global.gc && global.gc()
})