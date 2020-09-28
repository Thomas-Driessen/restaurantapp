import React from 'react';
import NavBar from '../components/NavBar';
import PreviousOrders from '../components/PreviousOrders'

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
          <NavBar />
          <PreviousOrders orderNumbers={this.state.previousOrderNumbers}/>
      </div>
  )}
}
export default ViewOrder