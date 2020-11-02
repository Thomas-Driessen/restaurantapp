import { Typography } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import AssistanceList from '../components/Table Assistance/TableAssistanceList';
import Grid from '@material-ui/core/Grid';
import tableNumber from '../components/TableNumber';
import { Button } from '@material-ui/core';

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      pay: [],
      help: [],
      AssistancePay: [],
      Assistance: []
    };
  }
  componentDidMount() {
    let mounted = true;
    fetch(`/api/table/gettablepayassistance`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
      this.setState({pay: data })
      this.setState({AssistancePay: "Payment"});
      }
    })
    .catch(console.log)

    fetch(`/api/table/gettableassistance`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
        this.setState({help: data })
        this.setState({Assistance: "Assistance"});
      }
    })
    .catch(console.log)

    return () => mounted = false;
  }
  
  callStaff = () => {
    var tableInfo = {
        "Id": tableNumber,
        "RequiresAssistance": true
    };
    fetch('/api/table/settableassistance', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tableInfo)
    }).then(response => response.json())
        .then(data => {
            console.log(data)
        });
  }

  callStaffPay = () => {
    var tableInfo = {
        "Id": tableNumber,
        "PayAssistance": true
    };
    fetch('/api/table/settablepayassistance', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tableInfo)
    }).then(response => response.json())
        .then(data => {
            console.log(data)
        });
  }
  render(){
  return(
      <div>
          <NavBar/>
          <Button  onClick = {this.callStaff} variant="contained" color="default">
            Call Waiter
          </Button>
          <Button  onClick = {this.callStaffPay} variant="contained" color="default">
            Request Payment
          </Button>
          { this.state.pay.length ? (
            <Typography variant="subtitle2" display="block">
              <AssistanceList TableAssistance={this.state.pay} AssistanceType={this.state.AssistancePay}/>
            </Typography>
          ) : (
            <Grid container spacing={0} style={{padding: 12}}>
                <Typography variant="subtitle2" display="block">
                  There are no tables that request payment.
                </Typography>
            </Grid>
            )}
            { this.state.help.length ? (
            <Typography variant="subtitle2" display="block">
              <AssistanceList TableAssistance={this.state.help} AssistanceType={this.state.Assistance}/>
            </Typography>
          ) : (
            <Grid container spacing={0} style={{padding: 12}}>
                <Typography variant="subtitle2" display="block">
                  There are no tables that request Assistance.
                </Typography>
            </Grid>
            )}
      </div>
  )}
}
export default MenuPage