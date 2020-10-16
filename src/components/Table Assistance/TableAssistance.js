import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const TableAssistance = (props) => {

    var tableInfo = {};

    const FinishAssistance = () => {
        if(props.AssistanceType === "Payment"){
            tableInfo = {
                "Id": props.TableAssistance.id,
                "PayAssistance": false
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
        else if(props.AssistanceType === "Assistance"){
            tableInfo = {
                "Id": props.TableAssistance.id,
                "RequiresAssistance": false
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
        else{
            alert("There is something wrong with this Request please contact support.")
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
                </div>
            ) : null}
        </div>
    )
}
export default TableAssistance