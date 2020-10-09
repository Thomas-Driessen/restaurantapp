import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';


class Product extends React.Component {

    constructor(){
        super();

        this.state = {
            product: true
        }
    }

    componentDidMount() {
        let mounted = true;
        fetch(`/api/${this.props.productType}/${this.props.productId}`)
        .then(res => res.json())
        .then((data) => {
            if(mounted){
                this.setState({ product: data })
            }
        })
        .catch(console.log)

        return() => mounted = false;
    }

    pushToNextColumn = (e) => {
        e.preventDefault();
    }

    render(){
    return(
        <div>
            { this.state.product ? (
                <div>
                <Card >
                    <CardContent>
                    <Typography gutterBottom variant="inherit" component="h2">
                        {this.state.product.title}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <div style={{display: 'flex', alignItems: 'right'}}>
                    <IconButton aria-label="push" onClick={this.pushToNextColumn}>
                        <AddIcon />
                    </IconButton>
                    </div>
                    </Grid>
                    </CardActions>
                </Card>
                </div>
            ) : null}
        </div>
    )}
}
export default Product