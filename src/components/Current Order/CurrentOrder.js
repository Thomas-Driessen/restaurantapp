import React from 'react';
import currentFoodList from './CurrentFoodList'
import currentDrinkList from './CurrentDrinkList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import tableId from '../TableId'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

class CurrentOrder extends React.Component { 
    constructor() {
        super();
        this.state = {
            currentFoodListLength: 0,
            currentDrinkListLength: 0,
            hubConnection: null,
        };
    }
    componentDidMount(){
        this.ConnectToHub();
        setInterval(() => {
            this.checkOrderListLength();
        }, 50);
    }

    ConnectToHub() {
        const hubConnection =  new HubConnectionBuilder()
          .withUrl("http://localhost:50232/Order")
          .configureLogging(LogLevel.Information)
          .build();
      
        this.setState({ hubConnection}, () => {
          this.state.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        });
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
        let order = [];
        currentDrinkList.map(currentDrink => {
            var drink ={
                tableId: tableId,
                paid: false,
                drinkId: currentDrink.id
            };
            let item = {
                title: currentDrink.title
            }
            order.push(item);
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
            let item = {
                title: currentFood.title
            }
            order.push(item);
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
        
        fetch('/sendorder', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        })
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