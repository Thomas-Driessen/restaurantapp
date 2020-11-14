import React from 'react';
import { render } from '@testing-library/react';
import PreviousOrders from './PreviousOrders';
import renderer from 'react-test-renderer';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const previousFoods = [
  {
    id: 1,
    food: "Pizza"
  },
  {
    id: 2,
    food: "Pasta"
  }
];
const previousDrinks = [
  {
    id: 1,
    drink: "Coca-Cola"
  },
  {
    id: 2,
    drink: "Pepsi"
  }
];

it('PreviousOrders render correctly', () => {
  const tree = renderer
    .create(<PreviousOrders theme={theme} previousFoods={previousFoods} previousDrinks={previousDrinks} totalPrice={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render PreviousOrders', () => {
  const { getByText } = render(<PreviousOrders theme={theme} previousFoods={previousFoods} previousDrinks={previousDrinks} totalPrice={0} />);
  const linkElement = getByText(/These are your previous orders/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})