import React from 'react';
import currentFoodList from './CurrentFoodList'
import currentDrinkList from './CurrentDrinkList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

class CurrentOrder extends React.Component { 
    constructor() {
        super();
        this.state = {
            hubConnection: null,
            priceFoods: 0,
            priceDrinks: 0
        };
    }
    componentDidMount(){
        let sum = currentDrinkList.reduce((totalPrice, drink) => totalPrice + drink.price, 0);
        this.setState({priceDrinks: sum});
        sum = currentFoodList.reduce((totalPrice, food) => totalPrice + food.price, 0);
        this.setState({priceFoods: sum});
    }

    removeFood = (product) => {
        let index = currentFoodList.indexOf(product);
        currentFoodList.splice(index, 1);
        sessionStorage.setItem("currentFoodList", JSON.stringify(currentFoodList));

        let sum = currentFoodList.reduce((totalPrice, food) => totalPrice + food.price, 0);
        this.setState({priceFoods: sum});
    }

    removeDrink = (product) => {
        let index = currentDrinkList.indexOf(product);
        currentDrinkList.splice(index, 1);
        sessionStorage.setItem("currentDrinkList", JSON.stringify(currentDrinkList));

        let sum = currentDrinkList.reduce((totalPrice, drink) => totalPrice + drink.price, 0);
        this.setState({priceDrinks: sum});
    }

    render(){
    return(
        <div>
            <h2>This is your current order</h2>
            { currentFoodList ? (
                <Grid container spacing={2} style={{padding: 15}}>
                    { currentFoodList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Food" remove={this.removeFood}/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentDrinkList ? (
                <Grid container spacing={2} style={{padding: 15}}>
                    { currentDrinkList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Drink" remove={this.removeDrink}/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentFoodList.length + currentDrinkList.length ? (
                <Grid container alignItems="center" justify="space-between" direction="row">
                <span>Subtotal: € {(this.state.priceDrinks + this.state.priceFoods).toFixed(2)}</span>
                <Button variant="contained" color="default" onClick={ () => this.props.sendOrder()}>
                    Place Order
                    </Button>
                </Grid>
            ) : null}
        </div>
    )}
}

export default CurrentOrder