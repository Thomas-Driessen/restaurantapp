import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';

const ProductsList = (props) => {
    return(
    <Grid container spacing={2} style={{padding: 20}}>
        { props.products.map((currentProduct, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Product 
                    key={index} 
                    product={currentProduct} 
                    productType={props.productType} 
                    foodCategories={props.foodCategories} 
                    drinkCategories={props.drinkCategories} 
                    ingredients={props.ingredients}
                />
            </Grid>
        ))}
    </Grid>
    )
}
export default ProductsList