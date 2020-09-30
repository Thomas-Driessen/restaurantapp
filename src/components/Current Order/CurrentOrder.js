import React from 'react';
import currentOrderList from './CurrentOrderList'
import CurrentOrderProducts from './CurrentOrderProducts'
import Grid from '@material-ui/core/Grid';

class CurrentOrder extends React.Component { 
    constructor() {
        super();
        this.state = { currentOrderListLength: 0
        };
    }
    componentDidMount(){
        setInterval(() => {
            this.checkOrderListLength();
        }, 10);
    }
    checkOrderListLength(){
        if(currentOrderList.length !== this.state.currentOrderListLength){
            this.setState({currentOrderListLength: currentOrderList.length});
        }
    }
    render(){
    return(
        <div>
            <h2>This is your current order</h2>
             { currentOrderList ? (
                    <Grid container spacing={24} style={{padding: 15}}>
                        { currentOrderList.map(currentProduct => (
                            <Grid item xs={12} sm={6} lg={4} xl={3}>
                                <CurrentOrderProducts key={currentProduct.id} product={currentProduct}/>
                            </Grid>
                        ))}
                    </Grid>
            ) : null}
        </div>
    )}
}

export default CurrentOrder