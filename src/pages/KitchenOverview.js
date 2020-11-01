import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import SplitItems from '../components/Kitchen Overview/SplitItems';
import toDo from '../components/Kitchen Overview/ToDo';

class KitchenOverview extends React.Component {
    constructor() {
        super();

        this.state = {
            order: [],
            hubConnection: null,
        }
    }
    
    componentDidMount() {
        this.ConnectToHub();
        let mounted = true;

        if(mounted) {
            let toDos = localStorage.getItem("toDo") ? JSON.parse(localStorage.getItem("toDo") || []) : [];
            toDos.map(item => {
                toDo.push(item);
                return true;
            })
        }

        return () => mounted = false;
    }

    ConnectToHub() {
        const hubConnection =  new HubConnectionBuilder()
          .withUrl("https://localhost:5001/Order")
          .configureLogging(LogLevel.Information)
          .build();
      
        this.setState({ hubConnection}, () => {
            this.state.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('OrderSent', (order) => { 
                this.setState({ order });
            });
        });
    }

    componentDidUpdate(order){
        if(this.state.order !== order){
            this.state.order.map(item => {
                toDo.push(item);
                return true;
            })

            if(this.state.order.length) {
                localStorage.setItem("toDo", JSON.stringify(toDo));
            }
        }
    }

    render(){
        return(
            <div>
                <SplitItems order={this.state.order}/>
            </div>
        )}
}
export default KitchenOverview