import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

const Product = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            { props.product ? (
                <div>
                <Card >
                    <CardMedia style={{height: 400}}
                    component="img"
                    height="250"
                    src={`../../images/${props.productType}/${props.product.id}.jpg`}
                    alt={`Image for ${props.product.title} Not Found`}
                    title={props.product.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="inherit" component="h2">
                        {props.product.title} <span style={{float: "right", color: "green"}}>{props.product.price}€</span>
                    </Typography>
                    <Typography component="h6">
                        {props.product.ingredients}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <div style={{display: 'flex', alignItems: 'right'}}>
                    <Button size="large" color="primary" target="_blank" onClick={handleClickOpen}>
                        <span style={{fontWeight:"bold"}}>Edit</span>
                    </Button>
                    <Button size="large" color="primary" target="_blank">
                        <span style={{fontWeight:"bold"}}>Delete</span>
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
                            <span style={{float: "right", color: "green", fontWeight: "bold"}}>{props.product.price}€</span>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <IconButton aria-label="close" color="primary" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                    </Dialog>
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