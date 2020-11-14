import React from 'react';
import { render } from '@testing-library/react';
import SortBar from './SortBar';
import renderer from 'react-test-renderer';

it('SortBar renders correctly', () => {
  const tree = renderer
    .create(<SortBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render SortBar Food Button', () => {
  const { getByText } = render(<SortBar />);
  const linkElement = getByText(/Food/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render SortBar Drink Button', () => {
  const { getByText } = render(<SortBar />);
  const linkElement = getByText(/Drink/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render SortBar Most Liked Button', () => {
  const { getByText } = render(<SortBar />);
  const linkElement = getByText(/Most Liked/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})