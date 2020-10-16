import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import currentFoodList from '../Current Order/CurrentFoodList';
import currentDrinkList from '../Current Order/CurrentDrinkList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    price: {
        textAlign: "right",
        color: "green",
        fontWeight: "bold",
        fontSize: "20px"
    }
  }));

const Product = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function addToOrder(e){
        e.preventDefault();
        if(props.productType === "Food") {
            currentFoodList.push(props.product);
            sessionStorage.setItem("currentFoodList", JSON.stringify(currentFoodList));
        }
        else{
            currentDrinkList.push(props.product);
            sessionStorage.setItem("currentDrinkList", JSON.stringify(currentDrinkList));
        }
    };
    return(
        <div>
            { props.product ? (
                <div>
                <Card >
                    <CardMedia style={{height: 400, paddingTop: '20%'}}
                    component="img"
                    height="250"
                    src={`../../images/${props.productType}/${props.product.id}.jpg`}
                    alt={`Image for ${props.product.title} Not Found`}
                    title={props.product.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="inherit" component="h2">
                        {props.product.title}
                    </Typography>
                    <Typography component="h6">
                        {props.product.description}
                    </Typography>
                    <Typography className={classes.price}>
                        {props.product.price}€
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <div style={{display: 'flex', alignItems: 'right'}}>
                    <Button size="large" color="primary" target="_blank" onClick={handleClickOpen}>
                        View Details
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="product-title"
                        aria-describedby="product-description"
                    >
                        <DialogTitle id="product-title">{props.product.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="product-description">
                                {props.product.description}
                            </DialogContentText>
                            <DialogContentText id="product-description" className={classes.price}>
                                {props.product.price}€
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="add to order" onClick={addToOrder}>
                        <AddIcon />
                    </IconButton>
                    </div>
                    </Grid>
                    </CardActions>
                </Card>
                </div>
            ) : null}
        </div>
    )
}
export default Product