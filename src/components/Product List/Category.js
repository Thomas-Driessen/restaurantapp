import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Product = (props) => {

    return(
        <div>
            { props.category ? (
                <div>
                    <Card >
                        <CardMedia style={{height: 400}}
                            component="img"
                            height="250"
                            src={`../../images/Categories/${props.category}.jpg`}
                            alt={`Image for ${props.category} Not Found`}
                            title={props.category}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.category}
                            </Typography>
                        </CardContent>
                            <CardActions>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Button size="large" color="primary" target="_blank" onClick={() => props.selectCategory(props.category)}>
                                        Select Category
                                    </Button>
                                </Grid>
                            </CardActions>
                    </Card>
                </div>
            ) : null}
        </div>
    )
}
export default Product