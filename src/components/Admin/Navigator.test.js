import React from 'react';
import { render } from '@testing-library/react';
import Navigator from './Navigator';
import renderer from 'react-test-renderer';

test('Render Navigator Restaurant', () => {
    const { getByText } = render(<Navigator />);
    const linkElement = getByText(/Restaurant/i);
    expect(linkElement).toBeInTheDocument();
});

test('Render Navigator Dashboard', () => {
    const { getByText } = render(<Navigator />);
    const linkElement = getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
});

it('Navigator renders correctly', () => {
    const tree = renderer
        .create(<Navigator />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    global.gc && global.gc()
})