import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';


const CurrentOrderProducts = (props) => {

    function renderIngredients() {
        let ingredients = [];
        props.product.ingredients.map(currentIngredient => (
            ingredients.push(currentIngredient.ingredient.ingredientTitle)
        ));

        return ingredients.toString();
    }

    return (
        <div>
            { props.product ? (
                <div>
                    <Card >
                        <CardContent>
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.product.count}x {props.product.title} <span style={{ float: "right", color: "green" }}>{props.product.price*props.product.count}€</span>
                            </Typography>
                            <Typography component="h6">
                                {renderIngredients()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <IconButton aria-label="add to order" onClick={() => props.add(props.product)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton aria-label="remove from order" onClick={() => props.remove(props.product)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                        </CardActions>
                    </Card>
                </div>
            ) : null}
        </div>
    )
}
export default CurrentOrderProducts