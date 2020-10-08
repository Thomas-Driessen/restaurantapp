import React from 'react';
import { render } from '@testing-library/react';
import CurrentOrder from './CurrentOrder';
import renderer from 'react-test-renderer';

it('CurrentOrder renders correctly', () => {
  const tree = renderer
    .create(<CurrentOrder />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CurrentOrder', () => {
    const { getByText } = render(<CurrentOrder />);
    const linkElement = getByText(/This is your current order/i);
    expect(linkElement).toBeInTheDocument();
  });