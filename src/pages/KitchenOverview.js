import React from 'react';
import updateKitchenOverview from '../components/updateKitchenOverview'
import tableId from '../components/TableId'
import { Typography } from '@material-ui/core';
import NavBar from '../components/Navigation bars/NavBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class KitchenOverview extends React.Component {
    constructor() {
        super();

        this.state = {
            foodOrders: [],
            drinkOrders: [],
            displayedFoodOrders: [],
            displayedDrinkOrders: [],
        }
    }
    
    componentDidMount() {
        setInterval(() => {
            this.updateOverview();
        }, 10);
    }
    
    updateOverview() {
        if(updateKitchenOverview) {
            fetch(`/api/orderfood/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                this.setState({ foodOrders: data })
            })
            .catch(console.log)

            fetch(`/api/orderdrink/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                this.setState({ drinkOrders: data })
            })
            .catch(console.log)
            
            if(this.state.foodOrders.length !== this.state.displayedFoodOrders.length) {
                for(let i = this.state.displayedFoodOrders.length; i < this.state.foodOrders.length; i++){
                    let foodOrder = this.state.foodOrders[i];
                    foodOrder.status = 0;
                    this.state.displayedFoodOrders.push(foodOrder);
                }
            }
            this.loadTabels();
            updateKitchenOverview = false;
        }
    }

    loadTabels(){
        const table = document.getElementById("Orders");
        this.state.displayedFoodOrders.foreach( item => {
            let row = table.insertRow();
            let receved = row.insertCell(0);
            receved.innerHtml = item.title
        })
    };
    render(){
        return(
            <div>
                <NavBar/>
                <Grid container spacing={0} style={{padding: 5}}>
                    <Grid item xs={12} sm={6} lg={4} xl={4} style={{padding: 25}}>
                        <h2>Todo</h2>
                        <div class="background-lightgray kitchen-overview-container">

                            {/* START - todo Placeholder item 1 */}
                            <Box mb={3}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography display="inline" variant="h4" component="h3">
                                            Pizza
                                            </Typography>
                                            <Typography ml={5} display="inline" color="textPrimary">
                                            Table 3
                                            </Typography>
                                        </Box>
                                        <Typography display="inline" color="textPrimary">
                                        Note:
                                        </Typography>
                                        <Typography gutterleft display="inline" color="textSecondary" component="p">
                                        No gluten
                                        </Typography>
                                    </CardContent>
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <Box mr={2} display="flex" alignItems="center">
                                            <Typography color="textSecondary"> 6 minutes ago </Typography>
                                        </Box>
                                        <Button variant="contained" color="primary" size="medium">Start</Button>
                                    </Box>
                                </Card>
                            </Box>
                            {/* END - todo Placeholder item 1 */}
                            {/* START - todo Placeholder item 2 */}
                            <Box mb={3}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography display="inline" variant="h4" component="h3">
                                            Root beer
                                            </Typography>
                                            <Typography ml={5} display="inline" color="textPrimary">
                                            Table 3
                                            </Typography>
                                        </Box>
                                        <Typography display="inline" color="textPrimary">
                                        Note:
                                        </Typography>
                                        <Typography gutterleft display="inline" color="textSecondary" component="p">
                                        
                                        </Typography>
                                    </CardContent>
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <Box mr={2} display="flex" alignItems="center">
                                            <Typography color="textSecondary"> 6 minutes ago </Typography>
                                        </Box>
                                        <Button variant="contained" color="primary" size="medium">Start</Button>
                                    </Box>
                                </Card>
                            </Box>
                            {/* END - todo Placeholder item 2 */}


                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={4} style={{padding: 25}}>
                        <h2>progress</h2>
                        <div class="background-lightgray kitchen-overview-container">


                            {/* START - progress Placeholder item 1 */}
                            <Box mb={3}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography display="inline" variant="h4" component="h3">
                                            Pizza
                                            </Typography>
                                            <Typography ml={5} display="inline" color="textPrimary">
                                            Table 3
                                            </Typography>
                                        </Box>
                                        <Typography display="inline" color="textPrimary">
                                        Note:
                                        </Typography>
                                        <Typography gutterleft display="inline" color="textSecondary" component="p">
                                        No gluten
                                        </Typography>
                                    </CardContent>
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <Box mr={2} display="flex" alignItems="center">
                                            <Typography color="textSecondary"> 6 minutes ago </Typography>
                                        </Box>
                                        <Button variant="contained" color="secondary" size="medium">finish</Button>
                                    </Box>
                                </Card>
                            </Box>
                            {/* END - progress Placeholder item 1 */}


                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={4} xl={4} style={{padding: 25}}>
                        <h2>done</h2>
                        <div class="background-lightgray kitchen-overview-container">


                            {/* START - done Placeholder item 1 */}
                            <Box mb={3}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography display="inline" variant="h4" component="h3">
                                            Pizza
                                            </Typography>
                                            <Typography ml={5} display="inline" color="textPrimary">
                                            Table 3
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <Box mr={2} display="flex" alignItems="center">
                                            <Typography color="textSecondary"> 6 minutes ago </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                            {/* END - done Placeholder item 1 */}


                        </div>
                    </Grid>
                </Grid>
            </div>
        )}
}
export default KitchenOverview