import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

test('Menu shows up', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Choose between Foods, Drinks and Most Liked to see our products/i);
  expect(linkElement).toBeInTheDocument();
});

it('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});