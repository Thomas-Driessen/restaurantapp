import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import KitchenIcon from '@material-ui/icons/Kitchen';
import PaletteIcon from '@material-ui/icons/PaletteIcon';

class Navigator extends React.Component {

    render() {
        return (
            <Drawer variant="permanent">
                <List>
                    <ListItem>
                        Restaurant
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
                        <Button>
                            <PaletteIcon /> Theme
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.selectShowCharts}>
                            <PaletteIcon /> Charts
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default Navigator;
