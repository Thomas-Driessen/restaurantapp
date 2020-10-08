import React from 'react';
import NavBar from '../components/NavBar';
import SortBar from '../components/SortBar'
import ProductsList from '../components/ProductsList';
import QRScanner from "../components/QRScanner";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
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
