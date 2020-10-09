import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuRedirectPage from './pages/MenuRedirectPage';
//import CameraPage from "./pages/CameraPage";
import Menu from './pages/Menu';
import ViewOrder from './pages/ViewOrder';
import NotFoundPage from './pages/NotFoundPage'
import KitchenOverview from './pages/KitchenOverview'
import { observer } from 'mobx-react'

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
            <Route exact path="/" component={Menu} />
            
            <Route exact path="/menuredirect/:tableNumber" component={MenuRedirectPage} />
            <Route exact path="/kitchenOverview" component={KitchenOverview}/>
            <Route exact path="/menu" component={Menu}/>
            <Route path="/order" component={() => <ViewOrder tableId="1"/>} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
  );
}
export default observer(App)