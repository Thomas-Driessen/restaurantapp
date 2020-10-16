import React from 'react';
import { render } from '@testing-library/react';
import Category from './Category';
import renderer from 'react-test-renderer';

it('Category renders correctly', () => {
  const tree = renderer
    .create(<Category />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Category', () => {
  var category = "Cold";
  const { getByText } = render(<Category category={category}/>);
  const linkElement = getByText(/Cold/i);
  expect(linkElement).toBeInTheDocument();
  });