import React, {Component} from 'react'
import Chart from "chart.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class FoodLikesLineChart extends Component {

    chartRef = React.createRef();

    constructor() {
        super();
        this.state = {
            axesLabels: [],
            chartData: [],
            myChart: {},
            dates: [],
            selectedYear: 0,
            selectedMonth: 0
        }
    }

    componentDidMount() {
        let _this = this;

        fetch(`${process.env.REACT_APP_API_URL}/api/foodlikes/getAvailableDates`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                let lastElement = data[data.length - 1];

                _this.setState({
                    dates: data,
                    selectedYear: lastElement.year,
                    selectedMonth: lastElement.months[lastElement.months.length - 1]
                });

                _this.getChartData(lastElement.year, lastElement.months[lastElement.months.length - 1])
            })
            .catch(error => {
                console.log(error);
            });
    }

    getChartData = (year, month) => {
        let _this = this;

        if (year === null || year === 0)
            year = this.state.selectedYear

        if (month === null || month === 0)
        {
            let months = this.state.dates.find(e => e.year === year).months
            month = months[months.length - 1]
            this.setState({selectedMonth: month})
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/foodlikes/chartdata`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({year: year, month: month})
        }).then(response => response.json())
            .then(data => {

                let perFoodDataSet = [];

                data.data.forEach(function (entry) {
                    entry.borderColor = _this.getRandomColor();
                    perFoodDataSet.push(entry);
                })

                _this.setState({
                    axesLabels: data.timeStamps,
                    chartData: perFoodDataSet
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

    getRandomColor = () => {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    handleYearChange = (prop) => {
        prop.preventDefault();
        this.setState({selectedYear: prop.target.value});
        this.getChartData(prop.target.value, null);
    }

    handleMonthChange = (prop) => {
        prop.preventDefault();
        this.setState({selectedMonth: prop.target.value});
        this.getChartData(null, prop.target.value);
    }

    render() {
        return (
            <div>
                <h3>Food Popularity</h3>
                <FormControl className={"selectedYear"}>
                    <InputLabel id="availableYears">Year</InputLabel>
                    <Select
                        labelId="availableYears"
                        id="demo-simple-select"
                        value={this.state.selectedYear}
                        onChange={this.handleYearChange}
                    >
                        {
                            this.state.dates.map(date => (
                                <MenuItem key={date.year} value={date.year}>{date.year}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                {this.state.selectedYear ? (
                    <FormControl className={"selectedMonth"}>
                        <InputLabel id="availableMonths">Month</InputLabel>
                        <Select
                            labelId="availableMonths"
                            id="demo-simple-select"
                            value={this.state.selectedMonth}
                            onChange={this.handleMonthChange}
                        >
                            {this.state.dates.find(e => e.year === this.state.selectedYear).months.map(month => (
                                <MenuItem key={month} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : null}

                <canvas id="myChart" ref={this.chartRef}/>
            </div>
        )
    }
}

export default FoodLikesLineChart;
