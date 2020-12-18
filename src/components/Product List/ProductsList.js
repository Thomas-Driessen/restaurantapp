import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';

const ProductsList = (props) => {
    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            { props.products.map(currentProduct => (
                <Grid key={currentProduct.id} item sm={12} lg={6}>
                    <Product key={currentProduct.id} product={currentProduct} productType={props.productType} />
                </Grid>
            ))}
        </Grid>
    )
}
export default ProductsList