import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core';

const SortBar = (props) => {
    return(
        <div>
            <AppBar position="static" color="contrastText">
                <ToolBar>
                    <Button  onClick={props.showFoods} variant="contained" color="default">
                    Food
                    </Button>
                    <Button onClick={props.showDrinks} variant="contained" color="default">
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