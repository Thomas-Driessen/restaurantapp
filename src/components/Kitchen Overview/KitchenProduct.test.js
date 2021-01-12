import React from 'react';
import { render } from '@testing-library/react';
import KitchenProduct from './KitchenProduct';
import renderer from 'react-test-renderer';

const product = {
    title: ["Coca-Cola"],
    tableNumber: 3,
    state: [false],
    timestamp: "14:51:58"
};

it('KitchenProduct renders correctly', () => {
  const tree = renderer
    .create(<KitchenProduct />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render KitchenProduct', () => {
  const { getByText } = render(<KitchenProduct product={"Coca-Cola"} enabled={false} element={product} position={0}/>);
  const linkElement = getByText(/Coca-cola/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})