import React from 'react';
import { render } from '@testing-library/react';
import CurrentOrder from './CurrentOrder';
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

it('CurrentOrder renders correctly', () => {
  const tree = renderer
    .create(<CurrentOrder theme={theme} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CurrentOrder', () => {
  const { getByText } = render(<CurrentOrder theme={theme} />);
  const linkElement = getByText(/This is your current order/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  global.gc && global.gc()
})