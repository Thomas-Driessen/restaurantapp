import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core';

const SortBar = () =>{
    return(
        <div>
            <AppBar position="static" color="contrastText">
                <ToolBar>
                    <Button  variant="contained" color="default">
                    Food
                    </Button>
                    <Button  variant="contained" color="default">
                    Drinks
                    </Button>
                    <Button  variant="contained" color="default">
                    Most Liked
                    </Button>
                </ToolBar>
            </AppBar>
        </div>

    )
}

export default SortBar;