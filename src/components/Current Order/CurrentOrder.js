import React from 'react';
import currentFoodList from './CurrentFoodList'
import currentDrinkList from './CurrentDrinkList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

class CurrentOrder extends React.Component { 
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            currentFoodListLength: 0,
            currentDrinkListLength: 0,
            hubConnection: null,
            totalPrice: 0,
        };
    }
    componentDidMount(){
        this._isMounted = true;
        setInterval(() => {
            this.checkOrderListLength();
            this.calculateTotalPrice();
        }, 50);
    }

    checkOrderListLength(){
        if(currentFoodList.length !== this.state.currentFoodListLength){
            this.setState({currentFoodListLength: currentFoodList.length});
        }
        if(currentDrinkList.length !== this.state.currentDrinkListLength){
            this.setState({currentDrinkListLength: currentDrinkList.length});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    calculateTotalPrice() {
        let total = 0;
        for(let i = 0; i < currentFoodList.length; i++) {
            total += currentFoodList[i].price;
        }

        for(let i = 0; i < currentDrinkList.length; i++) {
            total += currentDrinkList[i].price;
        }
        
        if (this._isMounted) {
            this.setState({totalPrice: total});
        }
    }

    render(){
    return(
        <div>
            <h2>This is your current order</h2>
            { currentFoodList ? (
                <Grid container spacing={2} style={{padding: 15}}>
                    { currentFoodList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Food"/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentDrinkList ? (
                <Grid container spacing={2} style={{padding: 15}}>
                    { currentDrinkList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Drink"/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentFoodList.length + currentDrinkList.length ? (
                <Grid container alignItems="center" justify="space-between" direction="row">
                <span>Subtotal: € {this.state.totalPrice.toFixed(2)}</span>
                <Button variant="contained" color="default" onClick={ () => this.props.sendOrder()}>
                    Place Order
                    </Button>
                </Grid>
            ) : null}
        </div>
    )}
}

export default CurrentOrder