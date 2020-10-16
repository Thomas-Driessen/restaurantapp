import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
//import SortBar from '../components/Navigation bars/SortBar'
//import ProductsList from '../components/Product List/ProductsList';
import QRScanner from "../components/QRScanner";
import {
    Switch,
    Route,
} from "react-router-dom";

class CameraPage extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/camera" />
                </Switch>
                <NavBar />
                <QRScanner />

            </div>
        )
    }
}

export default CameraPage
