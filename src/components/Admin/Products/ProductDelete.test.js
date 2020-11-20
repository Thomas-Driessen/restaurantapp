import React from 'react';
import { render } from '@testing-library/react';
import ProductDelete from './ProductDelete';
import renderer from 'react-test-renderer';

const product = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: "",
    category: { categoryName: "Drinks" },
    onMenu: true
};

const productNotOnMenu = {
    id: 1,
    title: "Coca-Cola",
    price: 2.5,
    description: "",
    category: { categoryName: "Drinks" },
    onMenu: false
};

it('ProductDelete renders correctly', () => {
    const tree = renderer
        .create(<ProductDelete product={product} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render ProductDelete NotOnMenu', () => {
    const { getByText } = render(<ProductDelete product={productNotOnMenu} />);
    const linkElement = getByText(/Back to menu/i);
    expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
    global.gc && global.gc()
})