import React from 'react';
import Grid from '@material-ui/core/Grid';

const IngredientsList = (props) => {
    return (
        <Grid container spacing={1} style={{ padding: 10 }}>
            { props.ingredients.map((currentIngredient, index) => (
                <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                    <p>
                        {currentIngredient.name}
                    </p>
                </Grid>
            ))}
        </Grid>
    )
}
export default IngredientsList