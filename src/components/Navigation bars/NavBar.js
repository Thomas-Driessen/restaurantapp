import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';
import currentFoodList from '../Current Order/CurrentFoodList';
import currentDrinkList from '../Current Order/CurrentDrinkList';
import { Redirect } from 'react-router-dom'

class NavBar extends React.Component{
    constructor(){
        super();
        this.state={
            totalProductsInOrder: 0,
            redirect: false,
            redirectMenu: false
        }
    }
    componentDidMount(){
        let mounted = true;

        if(mounted) {
            let items = sessionStorage.getItem("currentFoodList") ? JSON.parse(sessionStorage.getItem("currentFoodList") || []) : [];
            currentFoodList.splice(0,currentFoodList.length);
            items.map(item => {
                currentFoodList.push(item);
                return true;
            })
            
            items = sessionStorage.getItem("currentDrinkList") ? JSON.parse(sessionStorage.getItem("currentDrinkList") || []) : [];
            currentDrinkList.splice(0,currentDrinkList.length);
            items.map(item => {
                currentDrinkList.push(item);
                return true;
            })
        }
        
        setInterval(() => {
            this.totalProductsInOrder();
        }, 10);

        return () => mounted = false;

    }
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/order' />
        }
    }
    setRedirectMenu = () => {
        this.setState({
          redirectMenu: true
        })
    }
    renderRedirectMenu = () => {
        if (this.state.redirectMenu) {
          return <Redirect to='/menu' />
        }
    }
    totalProductsInOrder(){
        if(currentFoodList.length + currentDrinkList.length !== this.state.totalProductsInOrder) {
            this.setState({totalProductsInOrder: currentFoodList.length + currentDrinkList.length});
        }
    }
    render(){
    return(
        <div>
            <AppBar position="static">
                <ToolBar>
                    <Typography variant="h5" color="inherit" text-align="center">
                        Restaurant
                    </Typography>
                    {this.renderRedirect()}
                    {this.renderRedirectMenu()}
                    <Button  onClick = {this.setRedirectMenu} variant="contained" color="default">
                        Menu
                    </Button>
                    <Button  onClick = {this.setRedirect} variant="contained" color="default" startIcon={<FastfoodIcon />}>
                        My orders {this.state.totalProductsInOrder ? ` (${this.state.totalProductsInOrder})` : ''}
                    </Button>
                    <IconButton>
                    <SettingsIcon />
                    </IconButton >
                </ToolBar>
            </AppBar>
        </div>

    )}
}

export default NavBar;