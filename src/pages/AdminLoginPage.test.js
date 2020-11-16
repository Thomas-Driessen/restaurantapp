import React from 'react';
import { render } from '@testing-library/react';
import AdminLoginPage from './AdminLoginPage';
import renderer from 'react-test-renderer';

test('Render AdminLoginPage Restaurant', () => {
    const { getByText } = render(<AdminLoginPage />);
    const linkElement = getByText(/Log in/i);
    expect(linkElement).toBeInTheDocument();
});

it('AdminLoginPage renders correctly', () => {
    const tree = renderer
        .create(<AdminLoginPage />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    global.gc && global.gc()
})