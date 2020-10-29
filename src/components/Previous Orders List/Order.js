import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

class Order extends React.Component {

    render(){
    return(
        <div>
            { this.props.product ? (
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="inherit" component="h2">
                            {this.props.product.title}<span style={{float: "right", color: "green"}}>{this.props.product.price}€</span>
                        </Typography>
                    </CardContent>
                </Card>
            ) : null}
        </div>
    )}
}
export default Order