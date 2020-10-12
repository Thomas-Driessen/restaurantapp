import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import PreviousOrders from '../components/Previous Orders List/PreviousOrders'
import CurrentOrder from '../components/Current Order/CurrentOrder'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import currentFoodList from '../components/Current Order/CurrentFoodList'
import currentDrinkList from '../components/Current Order/CurrentDrinkList'
import tableId from '../components/TableId'

class ViewOrder extends React.Component {
  constructor() {
    super();
    this.state = { tableNumber: 1,
      updatePastOrders: 0
    };
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
    sessionStorage.removeItem("currentDrinkList");
    sessionStorage.removeItem("currentFoodList");
    
    fetch('/sendorder', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
    
    this.setState({ previousOrderNumbers: this.state.previousOrderNumbers + 1 })  
  }

  render(){
  return(
      <div>
          <NavBar/>
          <Grid container spacing={0} style={{padding: 25}}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Button color="secondary"variant="outlined">
                  Pay for orders
                </Button>
              <CurrentOrder sendOrder={ () => this.sendOrder()}/>
              <PreviousOrders previousOrderNumbers={this.state.previousOrderNumbers}/>
            </Grid>
          </Grid>
      </div>
  )};
}
export default ViewOrder