import React from 'react';
import SplitItems from './SplitItems';
import renderer from 'react-test-renderer';


var order = [
    {title: "Coca-Cola"},
    {title: "Pizza"}
];

it('SplitItems renders correctly', () => {
  const tree = renderer
    .create(<SplitItems order={order}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});