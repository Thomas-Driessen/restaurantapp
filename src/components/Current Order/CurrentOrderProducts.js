import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import currentFoodList from './CurrentFoodList';
import currentDrinkList from './CurrentDrinkList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    details: {
      marginRight: theme.spacing(34)
    },
    price: {
        textAlign: "right",
        color: "green",
        fontWeight: "bold",
        fontSize: "20px"
    }
  }));

const CurrentOrderProducts = (props) => {
    const classes = useStyles();
    function removeFromOrder(e){
        e.preventDefault();
        var index;
        if(props.productType === "Food") {
        index = currentFoodList.indexOf(props.product);
        currentFoodList.splice(index, 1);
        }
        else{
            index = currentDrinkList.indexOf(props.product);
            currentDrinkList.splice(index, 1);
        }
    };
    return(
        <div>
            { props.product ? (
                <div>
                <Card >
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.product.title}
                    </Typography>
                    <Typography component="h6">
                        {props.product.description}
                    </Typography>
                    <Typography gutterBottom className={classes.price}>
                        {props.product.price}€
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <IconButton aria-label="remove from order" onClick={removeFromOrder}>
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