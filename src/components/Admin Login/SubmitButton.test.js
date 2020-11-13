import React from 'react';
import { render } from '@testing-library/react';
import SubmitButton from './SubmitButton';
import renderer from 'react-test-renderer';

test('Render SubmitButton Restaurant', () => {
    const { getByText } = render(<SubmitButton text='Login'/>);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
});

it('SubmitButton renders correctly', () => {
    const tree = renderer
        .create(<SubmitButton text='Login'/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});