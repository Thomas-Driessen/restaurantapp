import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import currentFoodList from '../Current Order/CurrentFoodList';
import currentDrinkList from '../Current Order/CurrentDrinkList';
import { Redirect } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';

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
            <AppBar position="static" elevation={0}>
                <ToolBar>
                    <Typography variant="h5" color="inherit" text-align="center">
                        Restaurant
                    </Typography>
                    {this.renderRedirect()}
                    {this.renderRedirectMenu()}
                    <Container disableGutters>
                        <div style={{float: 'right'}}>
                        <ButtonGroup variant="text" size="large" color="inherit" aria-label="text primary button group">
                            <Button  onClick = {this.setRedirectMenu} color="inherit">
                                Menu
                            </Button>
                            <Button  onClick = {this.setRedirect} color="inherit" startIcon={<FastfoodIcon />}>
                                My orders {this.state.totalProductsInOrder ? ` (${this.state.totalProductsInOrder})` : ''}
                            </Button>
                        </ButtonGroup>
                        </div>
                    </Container>
                </ToolBar>
            </AppBar>
        </div>

    )}
}

export default NavBar;