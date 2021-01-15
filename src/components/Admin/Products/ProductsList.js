import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import Product from './Product';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const ProductsList = (props) => {
    return(
        <Grid container spacing={1} style={{padding: 10, paddingTop: 10}}>
            { props.products.map(currentCategory => (
                <Card style={{padding: 10, paddingTop: 10}}>
                    <CardContent>
                        <div>
                            <Typography variant="inherit" component="h2">
                                {currentCategory.categoryName}
                            </Typography>
                            <Grid container spacing={1} xs={12}>
                                {currentCategory.products.map(currentProduct => (
                                    <Grid item xs style={{padding: 10}}>
                                        <Product key={currentProduct.id}
                                                 product={currentProduct}
                                                 category={currentCategory}
                                                 foodCategories={props.foodCategories}
                                                 drinkCategories={props.drinkCategories}
                                                 ingredients={currentProduct.ingredients}
                                                 productType={props.productType} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    )
}
export default ProductsList