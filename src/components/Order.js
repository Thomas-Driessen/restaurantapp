import React from 'react'
import Grid from '@material-ui/core/Grid';

class Order extends React.Component {
    componentDidMount() {
        fetch(`/api/order/${this.props.order}`)
        .then(res => res.json())
        .then((data) => {
          this.props.orderItems = data;
        })
        .catch(console.log)
    }
    render(){
    return(
        <div>
            { this.props.orderItems ? (    
            <Grid container spacing={24} style={{padding: 15}}>
                { this.props.orderItems.map(currentItem => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <p>{currentItem.title}  {currentItem.price}</p>
                </Grid>
                ))}
            </Grid>
            ) : null}
        </div>
    )}
}
export default Order