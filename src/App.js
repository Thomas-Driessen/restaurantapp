import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuPage from './pages/MenuPage';
import MenuRedirectPage from './pages/MenuRedirectPage';
import NotFoundPage from './pages/NotFoundPage'
import CameraPage from "./pages/CameraPage";

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
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
              <Route exact path="/" component={MenuPage} />
              <Route exact path="/camera" component={CameraPage} />
              <Route exact path="/menuredirect/:tableNumber" component={MenuRedirectPage} />
              <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
  );
}

export default App;
