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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import currentFoodList from '../Current Order/CurrentFoodList';
import currentDrinkList from '../Current Order/CurrentDrinkList';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

const Product = (props) => {
    const likes = localStorage.getItem('likes') ? localStorage.getItem('likes') : [];
    const [open, setOpen] = React.useState(false);
    const [like, setLike] = React.useState(likes ? likes.indexOf(props.id) > -1 ? true : false : false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addLike = (e) => {
        e.preventDefault();
        let index = likes ? likes.indexOf(props.id) : -1;

        if(index > -1){
            likes.splice(index, 1);
            setLike(false);
        }
        else{
            likes.push(props.id);
            setLike(true);
        }

        localStorage.setItem('likes', likes);
    }
    
    function addToOrder(e) {
        e.preventDefault();
        if (props.productType === "Food") {
            currentFoodList.push(props.product);
            sessionStorage.setItem("currentFoodList", JSON.stringify(currentFoodList));
        }
        else {
            currentDrinkList.push(props.product);
            sessionStorage.setItem("currentDrinkList", JSON.stringify(currentDrinkList));
        }
    };

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
                        <CardMedia 
                            style={{ height: 400 }}
                            component="img"
                            height="250"
                            src={props.product.image}
                            alt={`Image for ${props.product.title} Not Found`}
                            title={props.product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.product.title} <span style={{ float: "right", color: "green" }}>{props.product.price}€</span>
                            </Typography>
                            <Typography component="h6">
                                {renderIngredients()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid 
                                container 
                                alignItems="flex-start" 
                                justify="flex-end" 
                                direction="row"
                            >
                                <div style={{ display: 'flex', alignItems: 'right' }}>
                                    <Button size="large" color="primary" target="_blank" onClick={handleClickOpen}>
                                        <span style={{ fontWeight: "bold" }}>View Details</span>
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
                                            <DialogContentText id="product-description">
                                                <span style={{ float: "right", color: "green", fontWeight: "bold" }}>{props.product.price}€</span>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <IconButton aria-label="close" color="primary" onClick={handleClose}>
                                                <CloseIcon />
                                            </IconButton>
                                        </DialogActions>
                                    </Dialog>
                                    {sessionStorage.getItem("tableId") ? (
                                        <div>
                                            <IconButton aria-label="add to favorites" color="primary" onClick={addLike}>
                                                <FavoriteIcon style={{color: like ? 'red' : 'inherit'}}/>
                                            </IconButton>
                                            <IconButton aria-label="add to order" color="primary" onClick={addToOrder}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    ) : (
                                            null
                                        )}
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