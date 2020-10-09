import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

test('404 Not Found', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/It seems that this page does not exist/i);
  expect(linkElement).toBeInTheDocument();
});

it('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});