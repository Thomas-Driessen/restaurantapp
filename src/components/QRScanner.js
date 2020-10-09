import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { withRouter } from 'react-router-dom'

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

    async handleScan(data){
        this.setState({
            result: data,
        })
        if(data != null && QRScanner.scanned === false)
        {
            QRScanner.scanned = true;

            var scannedResult = JSON.parse(data);

            console.log(data)
            await fetch('/api/table/gettable', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(scannedResult)
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.props.history.push("/menuredirect/" + data.id);
                });


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
