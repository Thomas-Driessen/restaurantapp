import React from 'react';
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

afterAll(() => {
  global.gc && global.gc()
})