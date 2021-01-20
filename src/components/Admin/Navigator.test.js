import React from 'react';
import Navigator from './Navigator';
import renderer from 'react-test-renderer';

it('Navigator renders correctly', () => {
    const tree = renderer
        .create(<Navigator />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    global.gc && global.gc()
})