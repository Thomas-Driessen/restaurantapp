import React from 'react';
import Grid from '@material-ui/core/Grid';
import Order from './Order'

const PreviousOrders = ({orderNumbers}) => {
    return(
    <div>
        <h2>These are your previous orders</h2>
    <Grid container spacing={24} style={{padding: 15}}>
        { orderNumbers.map(currentOrder => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Order key={currentOrder} order={currentOrder} />
        </Grid>
        ))}
    </Grid>
    </div>
    )
}
export default PreviousOrders