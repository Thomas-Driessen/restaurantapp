import React from 'react';
import Grid from '@material-ui/core/Grid';
import KitchenProduct from './KitchenProduct';

class ProductsList extends React.Component {

    render(){
    return(
    <Grid container spacing={0} style={{padding: 15}}>
        { this.props.products.map(currentProduct => (
            <Grid key={currentProduct.id} item xs={12} sm={6} lg={4} xl={3}>
                <KitchenProduct key={currentProduct.id} productId={currentProduct.foodId} productType={this.props.productType}/>
            </Grid>
        ))}
    </Grid>
    )}
}
export default ProductsList