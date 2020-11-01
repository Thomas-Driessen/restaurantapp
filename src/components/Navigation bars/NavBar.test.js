import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import renderer from 'react-test-renderer';

it('NavBar renders correctly', () => {
  const tree = renderer
    .create(<NavBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render NavBar Restaurant Button', () => {
    const { getByText } = render(<NavBar />);
    const linkElement = getByText(/Restaurant/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Render NavBar Menu Button', () => {
    const { getByText } = render(<NavBar />);
    const linkElement = getByText(/Menu/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('Render NavBar QR Button', () => {
    const { getByText } = render(<NavBar />);
    const linkElement = getByText(/Scan QR/i);
    expect(linkElement).toBeInTheDocument();
  });