import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import renderer from 'react-test-renderer';

test('Render LoginForm Restaurant', () => {
    const { getByText } = render(<LoginForm />);
    const linkElement = getByText(/Log in/i);
    expect(linkElement).toBeInTheDocument();
});

it('LoginForm renders correctly', () => {
    const tree = renderer
        .create(<LoginForm />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});