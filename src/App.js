import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import ProductsList from './components/ProductsList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <NavBar />
      <ProductsList />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
