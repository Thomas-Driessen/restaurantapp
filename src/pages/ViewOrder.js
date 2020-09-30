import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import PreviousOrders from '../components/Previous Orders List/PreviousOrders'
import CurrentOrder from '../components/Current Order/CurrentOrder'
import { Button } from '@material-ui/core';

class ViewOrder extends React.Component {
  constructor() {
    super();
    this.state = { tableNumber: 1,
      previousOrderNumbers: []
    };
  }
  componentDidMount() {
    fetch(`/api/order`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ previousOrderNumbers: data })
    })
    .catch(console.log)
  }
  render(){
  return(
      <div>
          <NavBar page="Order"/>
          <Button color="secondary"variant="outlined">
            Pay for orders
          </Button>
          <CurrentOrder />
          <PreviousOrders orderNumbers={this.state.previousOrderNumbers}/>
      </div>
  )}
}
export default ViewOrder