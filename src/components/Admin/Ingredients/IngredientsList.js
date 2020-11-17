import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
const IngredientsList = (props) => {
    return (
        <Grid container spacing={1} style={{ padding: 10 }}>
            { props.ingredients.map((currentIngredient, index) => (
                <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                    <Grid item>
                        <p>Ingredient: {currentIngredient.ingredientTitle}</p>
                        <p>Price per 100g: {currentIngredient.price}</p>
                        <p>Quantity: {currentIngredient.ingredientQuantity}</p>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}
export default IngredientsList