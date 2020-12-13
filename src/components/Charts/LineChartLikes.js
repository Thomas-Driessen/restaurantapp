import React, { Component } from 'react'
import { Chart } from 'react-charts'

class LineChartLikes extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            axes: [
                { primary: true, type: 'ordinal', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]
        }
        this.MyChart();
    }

    MyChart = () => {
        let _this = this;
        fetch(`${process.env.REACT_APP_API_URL}/api/drinklikes`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);

                let finalObjCollection = [];

                data.forEach(function(entry) {
                    let dataCollection = [];
                    dataCollection.push([entry.timeStamp, entry.likes]);

                    finalObjCollection.push({label: entry.timeStamp, data: dataCollection});
                });

                console.log(finalObjCollection)
                _this.setState({
                    data: finalObjCollection
                })

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div
                style={{
                    width: '400px',
                    height: '300px'
                }}
            >
                <Chart data={this.state.data} axes={this.state.axes} tooltip/>
            </div>
        )
    }
}

export default LineChartLikes;
