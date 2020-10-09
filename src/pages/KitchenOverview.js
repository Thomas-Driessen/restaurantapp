import React from 'react';
import UpdateKitchenOverview from '../components/UpdateKitchenOverview'
import tableId from '../components/TableId'
import displayedFoodOrders from '../components/Kitchen Overview/DisplayedFoodOrders'
import displayedDrinkOrders from '../components/Kitchen Overview/DisplayedDrinkOrders'
import KitchenProductList from '../components/Kitchen Overview/KitchenProductList'

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
        console.log(UpdateKitchenOverview.update);
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
                <KitchenProductList products ={displayedFoodOrders} productType="Food"/>
            </div>
        )}
}
export default KitchenOverview