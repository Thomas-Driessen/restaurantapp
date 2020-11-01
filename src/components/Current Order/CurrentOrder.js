import React from 'react';
import currentFoodList from './CurrentFoodList'
import currentDrinkList from './CurrentDrinkList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

class CurrentOrder extends React.Component { 

    render(){
    return(
        <div>
            <h2 style={{paddingLeft: 20, textDecorationLine: 'underline', textDecorationColor: 'primary'}}>This is your current order</h2>
            { currentFoodList ? (
                <Grid container spacing={2} style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
                    { currentFoodList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Food" remove={this.props.removeFood}/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentDrinkList ? (
                <Grid container spacing={2} style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
                    { currentDrinkList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Drink" remove={this.props.removeDrink}/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentFoodList.length + currentDrinkList.length ? (
                <div>
                    <AppBar position="static" color="transparent"  elevation={0} style={{paddingLeft: 15, paddingRight: 20}}>
                        <ToolBar disableGutters>
                            <Button variant="contained" disableElevation style={{float: 'left', minWidth:"160px", minHeight:"40px", borderRadius: 50}} size="large" color="primary" onClick={ () => this.props.sendOrder()}>
                                Place Order
                            </Button>
                            <Container disableGutters>
                            <h3 style={{float: 'right'}}>
                                Subtotal:  <span style={{color:"green"}}>{(this.props.totalPrice).toFixed(2)}€</span>
                            </h3>
                            </Container>
                        </ToolBar>
                    </AppBar>
                </div>
            ) : null}
        </div>
    )}
}

export default CurrentOrder