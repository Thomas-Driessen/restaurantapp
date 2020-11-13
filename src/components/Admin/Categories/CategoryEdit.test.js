import React from 'react';
import { render } from '@testing-library/react';
import CategoryEdit from './CategoryEdit';
import renderer from 'react-test-renderer';

const category = {
  categoryName: "Cold"
};

it('CategoryEdit renders correctly', () => {
  const tree = renderer
    .create(<CategoryEdit category={category}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CategoryEdit', () => {
  const { getByText } = render(<CategoryEdit category={category}/>);
  const linkElement = getByText(/Edit/i);
  expect(linkElement).toBeInTheDocument();
  });