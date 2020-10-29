import React from 'react';
import Grid from '@material-ui/core/Grid';
import Order from './Order';

class PreviousOrders extends React.Component {
    
    render(){
    return(
    <div>
        <h2 style={{paddingLeft: 20, textDecorationLine: 'underline', textDecorationColor: this.props.theme.palette.primary.main}}>
            These are your previous orders
        </h2>
        <h3 style={{paddingLeft: 20}}>
            Foods
        </h3>
        <Grid container spacing={2} style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
            { this.props.previousFoods.map(currentItem => (
                <Grid key={currentItem.id} item xs={12} sm={6}>
                    <Order key={currentItem.id} product={currentItem.food}/>
                </Grid>
            ))}
        </Grid>
        <h3 style={{paddingLeft: 20}}>
            Drinks
        </h3>
        <Grid container spacing={2} style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
            { this.props.previousDrinks.map(currentItem => (
                <Grid key={currentItem.id} item xs={12} sm={6}>
                    <Order key={currentItem.id} product={currentItem.drink}/>
                </Grid>
            ))}
        </Grid>
        <h3 style={{float:"right", paddingRight: 20}}>
            Total to be paid:  <span style={{color:"green"}}>{(this.props.totalPrice).toFixed(2)}€</span>
        </h3>
    </div>
    )}
}
export default PreviousOrders