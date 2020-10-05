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
        let mounted = true;
        fetch(`/api/${this.props.productType}/${this.props.orderId}`)
        .then(res => res.json())
        .then((data) => {
            if(mounted){
                this.setState({ drink: data })
            }
        })
        .catch(console.log)

        return() => mounted = false;
    }
    render(){
    return(
        <div>
            { this.state.drink ? (    
                <Card>
                    <Typography gutterBottom variant="inherit" component="h2">
                        {this.state.drink.title}
                    </Typography>
                    <Typography gutterBottom variant="inherit" component="h2" align="right">
                        {this.state.drink.price}€
                    </Typography>
                </Card>
            ) : null}
        </div>
    )}
}
export default Order