import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { withRouter, Redirect } from 'react-router-dom'

class QRScanner extends Component {
    static scanned = false;

    constructor(props){
        super(props)
        this.state = {
            delay: 100,
            result: 'No result'
        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data){
        this.setState({
            result: data,
        })
        if(data != null && QRScanner.scanned === false)
        {
            QRScanner.scanned = true;
            console.log(JSON.parse(data).tableNumber);
            this.props.history.push("/menuredirect/" + JSON.parse(data).tableNumber);
        }
    }

    handleError(err){
        console.error(err)
    }

    render(){
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return(
            <div>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />

                <p>{this.state.result}</p>
            </div>
        )
    }
}

export default withRouter(QRScanner);
