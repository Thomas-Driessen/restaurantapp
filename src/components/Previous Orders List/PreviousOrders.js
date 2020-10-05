import React from 'react';
import Grid from '@material-ui/core/Grid';
import Order from './Order';
import tableId from '../TableId'

class PreviousOrders extends React.Component {
    constructor(){
        super();
        this.state = { previousDrinks: [],
            previousFoods: []
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

        return() => mounted = false;
    }
    render(){
    return(
    <div>
        <h2>These are your previous orders</h2>
    <Grid container spacing={0} style={{padding: 15}}>
        { this.state.previousFoods.map(currentItem => (
            <Grid key={currentItem.id} item xs={12} sm={6} lg={4} xl={3}>
                <Order key={currentItem.id} orderId={currentItem.foodId} productType="food"/>
            </Grid>
        ))}
        { this.state.previousDrinks.map(currentItem => (
            <Grid key={currentItem.id} item xs={12} sm={6} lg={4} xl={3}>
                <Order key={currentItem.id} orderId={currentItem.drinkId} productType="drink"/>
            </Grid>
        ))}
    </Grid>
    </div>
    )}
}
export default PreviousOrders