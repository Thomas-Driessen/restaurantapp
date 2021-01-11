import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuRedirectPage from './pages/MenuRedirectPage';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Admin from './pages/Admin'
import NotFoundPage from './pages/NotFoundPage'
import KitchenOverview from './pages/KitchenOverview'
import AssistanceOverview from './pages/AssistanceOverview'
import LoginPage from './pages/AdminLoginPage'
import { observer } from 'mobx-react'
import UserStore from './components/Admin Login/UserStore'
import { runInAction } from 'mobx'

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
  constructor() {
    super();
    this.state = {
      restaurantName: "Restaurant"
    };
    runInAction(() => {
      let data = sessionStorage.getItem('sessionUserStore');
      if (data != null) {
        data = JSON.parse(data);
        UserStore.isLoggedIn = data.isLoggedIn;
        UserStore.username = data.username;
        UserStore.loading = data.loading;
      }
    })
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="loginForm">
          <div className="box">
            Loading, please wait...
          </div>
        </div>
      )
    }
    else {
      if (UserStore.isLoggedIn) {
        return (
          <MuiThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route exact path="/" component={ () => (<Menu name={this.state.restaurantName} />)}/>
                <Route exact path="/menuredirect/:tableNumber" component={ () => (<MenuRedirectPage name={this.state.restaurantName} />)} />
                <Route exact path="/kitchenOverview" component={ () => (<KitchenOverview name={this.state.restaurantName} />)} />
                <Route exact path="/assistanceOverview" component={ () => (<AssistanceOverview name={this.state.restaurantName} />)} />
                <Route exact path="/menu" component={ () => (<Menu name={this.state.restaurantName} />)} />
                <Route path="/order" component={ () => (<Order name={this.state.restaurantName} />)} />
                <Route exact path="/admin" component={ () => (<Admin name={this.state.restaurantName} />)} />
                <Route exact path="/login" render={() => (<Redirect to="/admin" />)} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </MuiThemeProvider>
        )
      }
      return (
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={ () => (<Menu name={this.state.restaurantName}/>)}/>
              <Route exact path="/menuredirect/:tableNumber" component={ () => (<MenuRedirectPage name={this.state.restaurantName} />)} />
              <Route exact path="/kitchenOverview" component={ () => (<KitchenOverview name={this.state.restaurantName} />)} />
              <Route exact path="/assistanceOverview" component={ () => (<AssistanceOverview name={this.state.restaurantName} />)} />
              <Route exact path="/menu" component={ () => (<Menu name={this.state.restaurantName} />)} />
              <Route path="/order" component={ () => (<Order name={this.state.restaurantName} />)} />
              <Route exact path="/admin" render={() => (<Redirect to="/login" />)} />
              <Route exact path="/login" component={ () => (<LoginPage name={this.state.restaurantName} />)} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      )
    }
  }
}
export default observer(App)