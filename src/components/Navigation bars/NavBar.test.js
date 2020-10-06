import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

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
  
  test('Render NavBar My Orders Button', () => {
    const { getByText } = render(<NavBar />);
    const linkElement = getByText(/My orders/i);
    expect(linkElement).toBeInTheDocument();
  });