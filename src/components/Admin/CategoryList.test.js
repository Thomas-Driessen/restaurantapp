import React from 'react';
import { render } from '@testing-library/react';
import CategoryList from './CategoryList';
import renderer from 'react-test-renderer';

const categories = [{
        categoryName: "Pizza"
}];

test('Render Category Pizza', () => {
  const { getByText } = render(<CategoryList categories={categories}/>);
  const linkElement = getByText(/Pizza/i);
  expect(linkElement).toBeInTheDocument();
});

it('CategoryList renders correctly', () => {
    const tree = renderer
      .create(<CategoryList categories={categories}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
});