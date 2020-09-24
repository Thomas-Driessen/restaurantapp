import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import productData from '../products';
const ProductsList = () => {
    return(
    <Grid container spacing={24} style={{padding: 24}}>
        { productData.map(currentProduct => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Product product={currentProduct} />
            </Grid>
        ))}
    </Grid>
    )
}
export default ProductsList