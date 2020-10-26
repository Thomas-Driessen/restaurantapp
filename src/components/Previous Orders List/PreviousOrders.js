import React from 'react';
import Grid from '@material-ui/core/Grid';
import Order from './Order';
import tableId from '../TableId'

class PreviousOrders extends React.Component {
    constructor(){
        super();
        this.state = { 
            previousDrinks: [],
            previousFoods: [],
            totalPrice: 0,
          };
    }

    componentDidMount() {
        let mounted = true;
        fetch(`/api/orderdrink/${tableId}`)
        .then(res => res.json())
        .then((data) => {
            if(mounted){
                this.setState({ previousDrinks: data })
            }
        })
        .catch(console.log)

        fetch(`/api/orderfood/${tableId}`)
        .then(res => res.json())
        .then((data) => {
            if(mounted){
                this.setState({ previousFoods: data })
            }
        })
        .catch(console.log)

        setInterval(() => {
            this.calculateTotalPrice();
        }, 3000);

        return() => mounted = false;
    }

    componentDidUpdate(previousOrderNumbers) {
        if (this.props.previousOrderNumbers !== previousOrderNumbers) {
        fetch(`/api/orderdrink/${tableId}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({ previousDrinks: data })
        })
        .catch(console.log)
        fetch(`/api/orderfood/${tableId}`)
        .then(res => res.json())
        .then((data) => {
                this.setState({ previousFoods: data })
        })
        .catch(console.log)
        }
    }

    async calculateTotalPrice() {
        let total = 0;
        for(let i = 0; i < this.state.previousFoods.length; i++) {
            try {
                const response = await fetch(`/api/food/${this.state.previousFoods[i].foodId}`)
                const json = await response.json()
                total += json.price;
            } catch(error) {
                console.log(error);
            }
        }
        for(let i = 0; i < this.state.previousDrinks.length; i++) {
            try {
                const response = await fetch(`/api/drink/${this.state.previousDrinks[i].drinkId}`)
                const json = await response.json()
                total += json.price;
            } catch(error) {
                console.log(error);
            }
        }

        this.setState({totalPrice: total})
        
    }
    
    render(){
    return(
    <div>
        <h2>These are your previous orders</h2>
        <Grid container spacing={0} style={{display: "flex", justifyContent: "flex-start", margin: "0 0 15px 0"}}>
            <b style={{margin: "0 15px 0 0"}}>Total paid</b>
            <div id="totalPaid">{ this.state.totalPrice ? '€ ' + this.state.totalPrice.toFixed(2) : 'loading...' }</div>
        </Grid>
    <Grid container spacing={0}>
        <Grid item sm={12}><h3>Foods</h3></Grid>
        { this.state.previousFoods.map(currentItem => (
            <Grid key={currentItem.id} item xs={12} sm={6}>
                <Order key={currentItem.id} orderId={currentItem.foodId} productType="food"/>
            </Grid>
        ))}
        <Grid item sm={12}><h3>Drinks</h3></Grid>
        { this.state.previousDrinks.map(currentItem => (
            <Grid key={currentItem.id} item xs={12} sm={6}>
                <Order key={currentItem.id} orderId={currentItem.drinkId} productType="drink"/>
            </Grid>
        ))}
    </Grid>
    </div>
    )}
}
export default PreviousOrders