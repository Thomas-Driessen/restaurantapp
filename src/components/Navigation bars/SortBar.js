import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';

const SortBar = (props) => {
    return (
        <div>
            <AppBar position="static" color="transparent">
                <Container disableGutters>
                    <ButtonGroup fullWidth variant="text" size="large" color="primary" aria-label="text primary button group">
                        <Button onClick={props.showFoods}>
                            Food
                        </Button>
                        <Button onClick={props.showDrinks}>
                            Drinks
                        </Button>
                        <Button>
                            Most Liked
                        </Button>
                    </ButtonGroup>
                </Container>
            </AppBar>
        </div>
    )
}

export default SortBar;