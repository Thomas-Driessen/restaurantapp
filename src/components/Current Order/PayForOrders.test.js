import React from 'react';
import { render } from '@testing-library/react';
import PayForOrders from './PayForOrders';
import renderer from 'react-test-renderer';

it('PayForOrders render correctly', () => {
    const tree = renderer
        .create(<PayForOrders priceCurrentDrinks={2} priceCurrentFoods={3} pricePreviousDrinks={1} pricePreviousFoods={0} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render PayForOrders', () => {
    const { getByText } = render(<PayForOrders priceCurrentDrinks={2} priceCurrentFoods={3} pricePreviousDrinks={1} pricePreviousFoods={0} />);
    const linkElement = getByText(/Pay for Orders/i);
    expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
    global.gc && global.gc()
})