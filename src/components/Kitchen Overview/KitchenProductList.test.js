import React from 'react';
import { render } from '@testing-library/react';
import KitchenProductList from './KitchenProductList';
import renderer from 'react-test-renderer';

const products = [
    {
        title: "Coca-Cola",
      },
      {
        title: "Pepsi",
      },
];

test('Render Product Coca-Cola', () => {
    const { getByText } = render(<KitchenProductList products={products}/>);
    const linkElement = getByText(/Coca-cola/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('Render Product Pepsi', () => {
    const { getByText } = render(<KitchenProductList products={products}/>);
    const linkElement = getByText(/Pepsi/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('KitchenProductList renders correctly', () => {
    const tree = renderer
      .create(<KitchenProductList products={products}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
});