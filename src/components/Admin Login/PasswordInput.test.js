import React from 'react';
import PasswordInput from './PasswordInput';
import renderer from 'react-test-renderer';

it('PasswordInput renders correctly', () => {
    const tree = renderer
        .create(<PasswordInput />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});