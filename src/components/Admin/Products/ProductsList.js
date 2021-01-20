import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import Typography from "@material-ui/core/Typography";

const ProductsList = (props) => {
    return(
        <Grid container spacing={1} style={{padding: 10, paddingTop: 10}}>
            { props.categories.map(currentCategory => (
                <div style={{width: "100%", padding: 10, paddingTop: 10}}>
                    <Typography variant="inherit" component="h2">
                        {currentCategory.categoryName}
                    </Typography>
                    <Grid key={currentCategory.id} container spacing={1}>
                        {currentCategory.products.map(currentProduct => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={currentProduct.id} style={{padding: 10}}>
                                <Product key={currentProduct.id}
                                         product={currentProduct}
                                         category={currentCategory}
                                         foodCategories={props.foodCategories}
                                         drinkCategories={props.drinkCategories}
                                         ingredients={props.ingredients}
                                         productType={props.productType} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ))}
        </Grid>
    )
}
export default ProductsList