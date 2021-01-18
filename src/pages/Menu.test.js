import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';
import renderer from 'react-test-renderer';

it('Menu renders correctly', () => {
  const tree = renderer
    .create(<Menu />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Menu', () => {
  const { getByText } = render(<Menu />);
  const linkElement = getByText(/Welcome in our restaurant!/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc();
})