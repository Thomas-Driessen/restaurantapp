import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const TableAssistance = (props) => {

    const [openState, showOpenState] = React.useState(``);
    const [successMessage, showSuccessMessage] = React.useState(false);
    var tableInfo = {};

    const handleSuccessOpen = (message) => {
        showSuccessMessage(message);
        showOpenState(true);
    };

    const handleSuccessClose = () => {
        showOpenState(false);
    };

    const FinishPaymentRequest = () => {
        tableInfo = {
            "Id": props.TableAssistance.id,
            "PayAssistance": false
        };
        fetch(`${process.env.REACT_APP_API_URL}/api/table/tablePayAssistance`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableInfo)
        }).then(response => response.json())
            .then(data => {
                handleSuccessOpen(`Marked payment at table '${props.TableAssistance.tableNumber}': Finished`);
                console.log(data)
            });
    }

    const FinishAssistance = () => {
        if(props.AssistanceType === "Payment"){
            fetch(`${process.env.REACT_APP_API_URL}/api/Order/markedPayed/${props.TableAssistance.tableNumber}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    FinishPaymentRequest()
                });
        }
        else if(props.AssistanceType === "Assistance"){
            tableInfo = {
                "Id": props.TableAssistance.id,
                "RequiresAssistance": false
            };
            fetch(`${process.env.REACT_APP_API_URL}/api/table/tableAssistance`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tableInfo)
            }).then(response => response.json())
                .then(data => {
                    handleSuccessOpen(`Marked assistance at table '${props.TableAssistance.tableNumber}': Finished`);
                    console.log(data)
                });
        }
        else{
            handleSuccessOpen(`There is something wrong with this Request please contact support.`);
        }
    };
    return(
        <div>
            { props.TableAssistance ? (
                <div>
                <Card >
                    <CardMedia 
                        style={{height: 0, paddingTop: '0%'}}
                        title={props.TableAssistance.tableNumber}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="inherit" component="h2">
                            Table: {props.TableAssistance.tableNumber} 
                        </Typography>
                        <Typography gutterBottom variant="inherit" component="h2">
                            Request: {props.AssistanceType}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <div style={{display: 'flex', alignItems: 'right'}}>
                            <Button size="large" color="primary" target="_blank" onClick={FinishAssistance}>
                                Finish Request
                            </Button>
                        </div>
                        </Grid>
                    </CardActions>
                </Card>
                <Snackbar open={openState} autoHideDuration={3000} onClose={handleSuccessClose}>
                    <Alert variant="filled" severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>
                </div>
            ) : null}
        </div>
    )
}
export default TableAssistance