import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import PreviousOrders from '../components/Previous Orders List/PreviousOrders'
import CurrentOrder from '../components/Current Order/CurrentOrder'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import tableId from '../components/TableId'

class ViewOrder extends React.Component {
  constructor() {
    super();
    this.state = { previousOrderItems: [],
    };
  }
  componentDidMount() {
    fetch(`/api/orderdrink/${tableId}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ previousOrderItems: data })
    })
    .catch(console.log)
  }
  render(){
  return(
      <div>
          <NavBar/>
          <Grid container spacing={24} style={{padding: 25}}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Button color="secondary"variant="outlined">
                  Pay for orders
                </Button>
              <CurrentOrder />
              <PreviousOrders previousOrderItems={this.state.previousOrderItems}/>
            </Grid>
          </Grid>
      </div>
  )}
}
export default ViewOrder