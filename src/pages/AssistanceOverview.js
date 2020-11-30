import { Typography } from '@material-ui/core';
import React from 'react';
import AssistanceList from '../components/Table Assistance/TableAssistanceList';
import Grid from '@material-ui/core/Grid';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pay: [],
      help: [],
      AssistancePay: [],
      Assistance: [],
      hubConnection: null,
    };
  }
  componentDidMount() {
    this.ConnectToHub();
    this.fetchTableAssistanceData();
  }

  fetchTableAssistanceData() {
    let mounted = true;
    fetch(`https://cors-anywhere.herokuapp.com/http://s3-restaurant-api.herokuapp.com/api/table/tablePayAssistance`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ pay: data })
          this.setState({ AssistancePay: "Payment" });
        }
      })
      .catch(console.log)

    fetch(`https://cors-anywhere.herokuapp.com/http://s3-restaurant-api.herokuapp.com/api/table/tableAssistance`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ help: data })
          this.setState({ Assistance: "Assistance" });
        }
      })
      .catch(console.log)

    return () => mounted = false;
  }

  ConnectToHub() {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://144.91.105.50:5001/Order")
      .configureLogging(LogLevel.Information)
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

      this.state.hubConnection.on('UpdateAssistance', () => {
        this.fetchTableAssistanceData();
      });
    });
  }

  render() {
    return (
      <div style={{ padding: '3em' }}>
        { this.state.pay.length ? (
          <Typography variant="subtitle2" display="block">
            <AssistanceList TableAssistance={this.state.pay} AssistanceType={this.state.AssistancePay} />
          </Typography>
        ) : (
            <Grid container spacing={0} style={{ padding: 12 }}>
              <Typography variant="subtitle2" display="block">
                There are no tables that request payment.
                </Typography>
            </Grid>
          )}
        { this.state.help.length ? (
          <Typography variant="subtitle2" display="block">
            <AssistanceList TableAssistance={this.state.help} AssistanceType={this.state.Assistance} />
          </Typography>
        ) : (
            <Grid container spacing={0} style={{ padding: 12 }}>
              <Typography variant="subtitle2" display="block">
                There are no tables that request Assistance.
                </Typography>
            </Grid>
          )}
      </div>
    )
  }
}

export default MenuPage
