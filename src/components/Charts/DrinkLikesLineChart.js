import React, { Component } from 'react'
import { Chart } from 'react-charts'

class DrinkLikesLineChart extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            axes: [
                { primary: true, type: 'ordinal', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]
        }
    }

    componentDidMount() {
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
                    let dataArr = [];

                    entry.drinkLikes.forEach(function(drinkLike) {
                        dataArr.push([drinkLike.timeStamp, drinkLike.likes]);
                    });

                    finalObjCollection.push({label: entry.drink.title, data: dataArr});
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
                    width: '1000px',
                    height: '400px'
                }}
            >
                <Chart data={this.state.data} axes={this.state.axes} tooltip/>
            </div>
        )
    }
}

export default DrinkLikesLineChart;
