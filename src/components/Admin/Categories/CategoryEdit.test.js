import React from 'react';
import CategoryEdit from './CategoryEdit';
import renderer from 'react-test-renderer';

const category = {
  categoryName: "Cold"
};

it('CategoryEdit renders correctly', () => {
  const tree = renderer
    .create(<CategoryEdit category={category} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  global.gc && global.gc()
})