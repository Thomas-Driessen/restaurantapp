import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';

const NavBar = () =>{
    return(
        <div>
            <AppBar position="static">
                <ToolBar>
                    <Typography variant="title" color="inherit" text-align="center">
                        Restaurant
                    </Typography>
                    <Button  variant="contained" color="default" startIcon={<FastfoodIcon />}>
                    View my order
                    </Button>
                    <Button href={"/camera"} variant="contained" color="default" startIcon={<FastfoodIcon />}>
                        Camera page
                    </Button>
                    <IconButton>
                    <SettingsIcon />
                    </IconButton >
                </ToolBar>
            </AppBar>
        </div>

    )
}

export default NavBar;
