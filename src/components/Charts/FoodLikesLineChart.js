import React, { Component } from 'react'
import { Chart } from 'react-charts'

class FoodLikesLineChart extends Component {

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
        fetch(`${process.env.REACT_APP_API_URL}/api/foodlikes`, {
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

                    entry.foodLikes.forEach(function(foodLike) {
                        dataArr.push([foodLike.timeStamp, foodLike.likes]);
                    });

                    finalObjCollection.push({label: entry.food.title, data: dataArr});
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

export default FoodLikesLineChart;
