import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

class Order extends React.Component {
    constructor(){
        super();
        this.state = {
            drink: []
        }
    }
    componentDidMount() {
        fetch(`/api/drink/${this.props.orderId}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({drink: data});
        })
        .catch(console.log)
    }
    render(){
        console.log(this.props.orderId);
    return(
        <div>
            { this.state.drink ? (    
                <Card>
                    <Typography gutterBottom variant="headline" component="h2">
                        {this.state.drink.title}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h2" textAlign="right">
                        {this.state.drink.price}€
                    </Typography>
                </Card>
            ) : null}
        </div>
    )}
}
export default Order