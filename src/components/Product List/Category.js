import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Product = (props) => {

    return (
        <div>
            { props.category ? (
                <div>
                    <Card className="clickable-card" onClick={() => props.selectCategory(props.category)}>
                        <CardMedia 
                            style={{ height: 400 }}
                            component="img"
                            height="250"
                            src={props.category.image}
                            alt={`Image for ${props.category.categoryName} Not Found`}
                            title={props.category.categoryName}
                        />
                        <CardContent className="clickable-card-bottom">
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.category.categoryName}
                            </Typography>
                            <svg className="feather-icon-basic" viewBox="0 0 24 24" fill="none">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </CardContent>
                    </Card>
                </div>
            ) : null}
        </div>
    )
}
export default Product