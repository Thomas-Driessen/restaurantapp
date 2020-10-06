import React from 'react';
import currentFoodList from './CurrentFoodList'
import currentDrinkList from './CurrentDrinkList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import tableId from '../TableId'

class CurrentOrder extends React.Component { 
    constructor() {
        super();
        this.state = { 
            currentFoodListLength: 0,
            currentDrinkListLength: 0,
        };
    }
    componentDidMount(){
        setInterval(() => {
            this.checkOrderListLength();
        }, 10);
    }
    checkOrderListLength(){
        if(currentFoodList.length !== this.state.currentFoodListLength){
            this.setState({currentFoodListLength: currentFoodList.length});
        }
        if(currentDrinkList.length !== this.state.currentDrinkListLength){
            this.setState({currentDrinkListLength: currentDrinkList.length});
        }
    }
    sendOrder(){
        currentDrinkList.map(currentDrink => {
            var drink ={
                tableId: tableId,
                paid: false,
                drinkId: currentDrink.id
            };
        fetch('/api/orderdrink', {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(drink)
        })
        return "Succes";
        })
        currentFoodList.map(currentFood => {
            var food ={
                tableId: tableId,
                paid: false,
                foodId: currentFood.id
            };
        fetch('/api/orderfood', {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(food)
        })
        return "Succes";
        })
        currentDrinkList.splice(0,currentDrinkList.length);
        currentFoodList.splice(0,currentFoodList.length);
    }
    render(){
    return(
        <div>
            <h2>This is your current order</h2>
            { currentFoodList ? (
                <Grid container spacing={1} style={{padding: 15}}>
                    { currentFoodList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Food"/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentDrinkList ? (
                <Grid container spacing={1} style={{padding: 15}}>
                    { currentDrinkList.map((currentProduct, index) => (
                        <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                            <CurrentOrderProducts key={index} product={currentProduct} productType="Drink"/>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
            { currentFoodList.length + currentDrinkList.length ? (
                 <Grid container alignItems="center" justify="center" direction="row">
                <Button variant="contained" color="default" onClick={this.sendOrder}>
                    Place Order
                    </Button>
                </Grid>
            ) : null}
        </div>
    )}
}

export default CurrentOrder