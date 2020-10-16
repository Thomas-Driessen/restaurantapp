import React from 'react';
import { render } from '@testing-library/react';
import KitchenOverview from './KitchenOverview';
import renderer from 'react-test-renderer';

it('KitchenOverview renders correctly', () => {
  const tree = renderer
    .create(<KitchenOverview />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render KitchenOverview', () => {
  const { getByText } = render(<KitchenOverview />);
  const linkElement = getByText(/To do/i);
  expect(linkElement).toBeInTheDocument();
});