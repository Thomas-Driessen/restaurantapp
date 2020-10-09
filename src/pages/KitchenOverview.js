import React from 'react';
import UpdateKitchenOverview from '../components/UpdateKitchenOverview'
import tableId from '../components/TableId'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import displayedFoodOrders from '../components/Kitchen Overview/DisplayedFoodOrders'
//import displayedDrinkOrders from '../components/Kitchen Overview/DisplayedDrinkOrders'
//import KitchenProductList from '../components/Kitchen Overview/KitchenProductList'

class KitchenOverview extends React.Component {
    constructor() {
        super();

        this.state = {
            foodOrders: [],
            drinkOrders: []
        }
    }
    
    componentDidMount() {
        setInterval(() => {
            this.updateOverview();
        }, 50);
        let mounted = false;
        fetch(`/api/orderfood/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                    if(mounted){
                        this.setState({ foodOrders: data })
                    }
            })
            .catch(console.log)

            fetch(`/api/orderdrink/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                    if(mounted){
                        this.setState({ drinkOrders: data })
                    }
            })
            .catch(console.log)

            return () => mounted = true;
    }
    
    async updateOverview() {
        //console.log(UpdateKitchenOverview.update);
        if(UpdateKitchenOverview.update) {
            await fetch(`/api/orderfood/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                this.setState({ foodOrders: data })
            })
            .catch(console.log)

            await fetch(`/api/orderdrink/${tableId}`)
                .then(res => res.json())
                .then((data) => {
                this.setState({ drinkOrders: data })
            })
            .catch(console.log)

            if(this.state.foodOrders.length !== displayedFoodOrders.length) {
                for(let i = displayedFoodOrders.length; i < this.state.foodOrders.length; i++){
                    let foodOrder = this.state.foodOrders[i];
                    foodOrder.status = 0;
                    displayedFoodOrders.push(foodOrder);
                }
            }
            UpdateKitchenOverview.update = false;
        }
    }

    loadTabels(){
        const table = document.getElementById("Orders");
        displayedFoodOrders.map( item => {
            let row = table.insertRow();
            let receved = row.insertCell(0);
            receved.innerHtml = item.id

            return "succes";
        })
    };
    render(){
        return(
            <div>
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
                {/* <KitchenProductList products ={displayedFoodOrders} productType="Food"/> */}
            </div>
        )}
}
export default KitchenOverview