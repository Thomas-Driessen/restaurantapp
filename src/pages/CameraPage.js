import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
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

    componentDidMount(){
        document.title = "Scan QR | "+this.props.name
    }

    render() {
        return (
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
