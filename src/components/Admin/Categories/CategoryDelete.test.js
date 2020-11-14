import React from 'react';
import { render } from '@testing-library/react';
import CategoryDelete from './CategoryDelete';
import renderer from 'react-test-renderer';

const category = {
  categoryName: "Cold"
};

it('CategoryDelete renders correctly', () => {
  const tree = renderer
    .create(<CategoryDelete category={category} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CategoryDelete', () => {
  const { getByText } = render(<CategoryDelete category={category} />);
  const linkElement = getByText(/Delete/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})