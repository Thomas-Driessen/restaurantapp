import React, { Component } from 'react'
import Chart from "chart.js";

class DrinkLikesLineChart extends Component {

    chartRef = React.createRef();

    constructor() {
        super();
        this.state = {
            axesLabels: [],
            chartData: [],
            myChart: {}
        }
    }

    componentDidMount() {
        let _this = this;
        fetch(`${process.env.REACT_APP_API_URL}/api/drinklikes/chartdata`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {

                let perDrinkDataSet = [];

                data.data.forEach(function (entry) {
                    perDrinkDataSet.push(entry);
                })

                _this.setState({
                    axesLabels: data.timeStamps,
                    chartData: perDrinkDataSet
                })

                const myChartRef = _this.chartRef.current.getContext("2d");

                new Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: _this.state.axesLabels,
                        datasets: _this.state.chartData
                    },
                    options: {
                        //Customize chart options
                    }
                });

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div
            >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default DrinkLikesLineChart;
