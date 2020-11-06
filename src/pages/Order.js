import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import PreviousOrders from '../components/Previous Orders List/PreviousOrders'
import CurrentOrder from '../components/Current Order/CurrentOrder'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import currentFoodList from '../components/Current Order/CurrentFoodList';
import currentDrinkList from '../components/Current Order/CurrentDrinkList';
import tableNumber from '../components/TableNumber';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

class ViewOrder extends React.Component {
  constructor() {
    super();
    this.state = { tableNumber: 1,
      previousDrinks: [],
      previousFoods: [],
      pricePreviousDrinks: 0,
      pricePreviousFoods: 0,
      priceCurrentDrinks: 0,
      priceCurrentFoods: 0,
      tableId: sessionStorage.getItem("tableId")
    };
  }

  componentDidMount() {
    let mounted = true;
    let sum = 0;
    fetch(`/api/orderdrink/${tableNumber}`)
    .then(res => res.json())
    .then((data) => {
        if(mounted){
            sum = data.reduce((totalPrice, product) => totalPrice + product.price, 0);
            this.setState({pricePreviousDrinks: sum});
            this.setState({ previousDrinks: data });
        }
    })
    .catch(console.log)

    fetch(`/api/orderfood/${tableNumber}`)
    .then(res => res.json())
    .then((data) => {
        if(mounted){
            sum = data.reduce((totalPrice, product) => totalPrice + product.price, 0);
            this.setState({pricePreviousFoods: sum});
            this.setState({ previousFoods: data })
        }
    })
    .catch(console.log)

    sum = currentDrinkList.reduce((totalPrice, drink) => totalPrice + drink.price, 0);
    this.setState({priceCurrentDrinks: sum});
    sum = currentFoodList.reduce((totalPrice, food) => totalPrice + food.price, 0);
    this.setState({priceCurrentFoods: sum});

    return() => mounted = false;
  }

  removeFood = (product) => {
    let index = currentFoodList.indexOf(product);
    currentFoodList.splice(index, 1);
    sessionStorage.setItem("currentFoodList", JSON.stringify(currentFoodList));

    let sum = currentFoodList.reduce((totalPrice, food) => totalPrice + food.price, 0);
    this.setState({priceCurrentFoods: sum});
  }

  removeDrink = (product) => {
    let index = currentDrinkList.indexOf(product);
    currentDrinkList.splice(index, 1);
    sessionStorage.setItem("currentDrinkList", JSON.stringify(currentDrinkList));

    let sum = currentDrinkList.reduce((totalPrice, drink) => totalPrice + drink.price, 0);
    this.setState({priceCurrentDrinks: sum});
  }

  sendOrder(){
    this.postOrder();
    this.updatePreviousOrders();
  }

  updatePreviousOrders(){
    fetch(`/api/orderdrink/${tableNumber}`)
    .then(res => res.json())
    .then((data) => {
        let sum = data.reduce((totalPrice, product) => totalPrice + product.price, 0);
        this.setState({pricePreviousDrinks: sum});
        this.setState({ previousDrinks: data })
    })
    .catch(console.log)
    fetch(`/api/orderfood/${tableNumber}`)
    .then(res => res.json())
    .then((data) => {
        let sum = data.reduce((totalPrice, product) => totalPrice + product.price, 0);
        this.setState({pricePreviousFoods: sum});
        this.setState({ previousFoods: data })
    })
    .catch(console.log)
  }

  postOrder(){
    let order = [];
    currentDrinkList.map(currentDrink => {
        var drink ={
            tableId: tableNumber,
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
            tableId: tableNumber,
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
    this.setState({priceCurrentDrinks: 0});
    this.setState({priceCurrentFoods: 0});
    
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

  callStaffPay = () => {
    var tableInfo = {
        "Id": this.state.tableId,
        "PayAssistance": true
    };
    fetch('/api/table/tablePayAssistance', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tableInfo)
    }).then(response => response.json())
        .then(data => {
            console.log(data)
        });
  }

  render(){
  return(
      <div>
          <NavBar/>
          <Grid container spacing={0} style={{padding: 15}}>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Grid container justify="center">
              <AppBar position="static" color="transparent"  elevation={0} style={{paddingLeft: 15, paddingRight: 20}}>
                        <ToolBar disableGutters>
                            <Button variant="contained" disableElevation style={{float: 'left', minWidth:"200px", minHeight:"40px", borderRadius: 50}} size="large" color="primary" onClick={this.callStaffPay()}>
                                Pay for Orders
                            </Button>
                            <Container disableGutters>
                            <h3 style={{float: 'right'}}>
                                Total:  <span style={{color:"green"}}>{(this.state.priceCurrentDrinks + this.state.priceCurrentFoods + this.state.pricePreviousDrinks + this.state.pricePreviousFoods).toFixed(2)}€</span>
                            </h3>
                            </Container>
                        </ToolBar>
                    </AppBar>
              </Grid>
              <CurrentOrder theme={this.props.theme} totalPrice={this.state.priceCurrentDrinks + this.state.priceCurrentFoods} sendOrder={ () => this.sendOrder()} removeDrink={this.removeDrink} removeFood={this.removeFood}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <PreviousOrders theme={this.props.theme} totalPrice={this.state.pricePreviousDrinks + this.state.pricePreviousFoods} previousFoods={this.state.previousFoods} previousDrinks={this.state.previousDrinks}/>
            </Grid>
          </Grid>
      </div>
  )};
}
export default ViewOrder