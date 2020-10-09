import React from 'react';
import updateKitchenOverview from '../components/updateKitchenOverview'
import tableId from '../components/TableId'

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
                <table>
                    <thead>
                        <tr>
                            <div>
                                <div>Receved</div>
                                <div id="receved-column"></div>
                            </div>
                            <div>Progress</div>
                            <div>Done</div>
                        </tr>
                    </thead>
                    <tbody id="Orders"></tbody>   
                </table> 
            </div>
        )}
}
export default KitchenOverview