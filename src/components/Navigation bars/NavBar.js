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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import QRScanner from '../QRScanner'
//import classes from '*.module.css';


/* const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const classes = useStyles();*/


class NavBar extends React.Component{
    constructor(){
        super();
        this.state={
            totalProductsInOrder: 0,
            redirect: false,
            redirectMenu: false,
            setOpen: false
        }
        //const classes = useStyles();
        //const [open, setOpen] = React.useState(false);
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
    useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    handleOpenModal = () => {
        this.setState({setOpen: true});
        console.log(this.state.setOpen);
    };
    handleCloseModal = () => {
        this.setState({setOpen: false});
        console.log(this.state.setOpen);
    };
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
                    <Button onClick = {this.setRedirectMenu} variant="contained" color="default">
                        Menu
                    </Button>
                    <Button onClick = {this.setRedirect} variant="contained" color="default" startIcon={<FastfoodIcon />}>
                        My orders {this.state.totalProductsInOrder ? ` (${this.state.totalProductsInOrder})` : ''}
                    </Button>
                    <Button type="button" onClick={this.handleOpenModal} variant="contained" color="default">
                        Scan table QR
                    </Button>
                    <IconButton>
                    <SettingsIcon />
                    </IconButton >
                </ToolBar>
            </AppBar>

            <Modal
                open={this.state.setOpen}
                onClose={this.handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                //className={NavBar.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <div>
                    <h2 id="server-modal-title">Server-side modal</h2>
                    <p id="server-modal-description">If you disable JavaScript, you will still see me.</p>
                    <QRScanner />
                </div>
            </Modal>
        </div>
    )}
}

export default NavBar;