import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class PayForOrders extends React.Component {

    callStaffPay = () => {
        var tableInfo = {
            "Id": this.props.tableId,
            "PayAssistance": true
        };
        fetch('/api/table/tablePayAssistance', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableInfo)
        }).then(response => response.json())
    }


    render() {
        return (
            <Grid container justify="center">
                <AppBar position="static" color="transparent" elevation={0} style={{ paddingLeft: 15, paddingRight: 20 }}>
                    <ToolBar disableGutters>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{
                                float: 'left',
                                minWidth: "200px",
                                minHeight: "40px",
                                borderRadius: 50
                            }}
                            size="large"
                            color="primary"
                            onClick={this.callStaffPay}
                        >
                            Pay for Orders
                    </Button>
                        <Container disableGutters>
                            <h3 style={{ float: 'right' }}>
                                Total:  <span style={{ color: "green" }}>{(this.props.priceCurrentDrinks + this.props.priceCurrentFoods + this.props.pricePreviousDrinks + this.props.pricePreviousFoods).toFixed(2)}€</span>
                            </h3>
                        </Container>
                    </ToolBar>
                </AppBar>
            </Grid>
        )
    }
}
export default PayForOrders