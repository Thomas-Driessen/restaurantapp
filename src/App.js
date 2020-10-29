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
import Order from './pages/Order';
import NotFoundPage from './pages/NotFoundPage'
import KitchenOverview from './pages/KitchenOverview'
import assistanceOverview from './pages/AssistanceOverview'
import LoginPage from './pages/AdminLoginPage'
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
class App extends React.Component {

  render(){
  return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Menu theme={theme} />} />
            <Route exact path="/menuredirect/:tableNumber" component={() => <MenuRedirectPage theme={theme} />} />
            <Route exact path="/kitchenOverview" component={() => <KitchenOverview theme={theme} />}/>
            <Route exact path="/assistanceOverview" component={() => <assistanceOverview theme={theme} />}/>
            <Route exact path="/menu" component={() => <Menu theme={theme} />}/>
            <Route path="/order" component={() => <Order theme={theme} />} />
            <Route exact path="/adminLogin" component={() => <LoginPage theme={theme} />}/>
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
  )}
}
export default observer(App)