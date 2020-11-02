import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';

class Navigator extends React.Component{
    
    render(){
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem>
          Restaurant
        </ListItem>
        <ListItem>
            <Button>
                <HomeIcon/> Dashboard
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
            <Button onClick={this.props.selectCategoryDrinks}>
                <CategoryIcon /> Drink Categories
            </Button>
        </ListItem>
        <ListItem>
            <Button onClick={this.props.selectCategoryFood}>
                <CategoryIcon /> Food Categories
            </Button>
        </ListItem>
        <ListItem>
            <Button>
                <MenuBookIcon /> Not On Menu
            </Button>
        </ListItem>
      </List>
    </Drawer>
  )}
}

export default Navigator;