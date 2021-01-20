import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import KitchenIcon from '@material-ui/icons/Kitchen';
import BarChartIcon from '@material-ui/icons/BarChart';

class Navigator extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurantNameData: {title: 'Restaurant'},
            restaurantNameButtonDisable: true,
            newName: null
        }
    }
    componentDidMount() {
        let mounted = true;
        if (mounted) {
            this.getRestaurantName()
        }
        return () => mounted = false;
    }

    getRestaurantName = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/RestaurantName`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({restaurantNameData: data})
            });
    }

    renderSaveButton = (changeEvent) =>{
        if(this.state.restaurantNameButtonDisable === true){
            this.setState({restaurantNameButtonDisable: false});
        }
        this.setState({newName: changeEvent.target.value});
    }

    saveRestaurantName = () =>{
        var newRestaurantName = {
            "id": this.state.restaurantNameData.id,
            "title": this.state.newName
        };
        fetch(`${process.env.REACT_APP_API_URL}/api/RestaurantName`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRestaurantName)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            });
        this.setState({restaurantNameButtonDisable: true});
    }

    render() {
        return (
            <Drawer variant="permanent">
                <List>
                    <ListItem>
                        <Input 
                            placeholder={this.state.restaurantNameData.title}
                            type='text'
                            onChange={this.renderSaveButton}
                        />
                        <Button onClick={this.saveRestaurantName} disabled={this.state.restaurantNameButtonDisable}>
                            Save
                        </Button>
                    </ListItem>
                    <ListItem>

                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectFoods}>
                            <FastFoodIcon /> Foods
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectDrinks}>
                            <LocalCafeIcon /> Drinks
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectFoodCategories}>
                            <CategoryIcon /> Food Categories
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectDrinkCategories}>
                            <CategoryIcon /> Drink Categories
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectIngredients}>
                            <KitchenIcon /> Ingredients
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectNotOnMenu}>
                            <MenuBookIcon /> Not On Menu
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectShowCharts}>
                            <BarChartIcon /> Charts
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default Navigator;
