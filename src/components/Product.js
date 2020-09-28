import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
const Product = (props) => {
    return(
        <div>
            { props.product ? (
                <Card >
                    <CardMedia style={{height: 0, paddingTop: '20%'}}
                    component="img"
                    height="50"
                    src={`../images/${props.product.id}.jpg`}
                    title={props.product.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.product.title}
                    </Typography>
                    <Typography component="p">
                        {props.product.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" target="_blank">
                        Go To Product
                    </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
export default Product