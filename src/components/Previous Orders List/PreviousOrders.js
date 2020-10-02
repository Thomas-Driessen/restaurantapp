import React from 'react';
import Grid from '@material-ui/core/Grid';
import Order from './Order';

const PreviousOrders = (props) => {
    return(
    <div>
        <h2>These are your previous orders</h2>
    <Grid container spacing={24} style={{padding: 15}}>
        { props.previousOrderItems.map(currentItem => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Order key={currentItem.id} orderId={currentItem.drinkId} />
            </Grid>
        ))}
    </Grid>
    </div>
    )
}
export default PreviousOrders