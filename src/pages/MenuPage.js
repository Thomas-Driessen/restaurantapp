import { Typography } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import SortBar from '../components/Navigation bars/SortBar'
import ProductsList from '../components/Product List/ProductsList';
import Grid from '@material-ui/core/Grid';

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = { foods: [],
      drinks: [],
      mostLikedFoods: [],
      shownProducts: [],
      productType: "Food"
    };
  }
  componentDidMount() {
    fetch(`/api/food`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ foods: data })
    })
    .catch(console.log)

    fetch(`/api/drink`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ drinks: data })
    })
    .catch(console.log)
  }
  showFoods = (e) => {
    e.preventDefault();
    this.setState({shownProducts: this.state.foods});
    this.setState({productType: "Food"});
  }
  showDrinks = (e) => {
    e.preventDefault();
    this.setState({shownProducts: this.state.drinks});
    this.setState({productType: "Drink"});
  }
  render(){
  return(
      <div>
          <NavBar/>
          <SortBar showFoods = {this.showFoods} showDrinks = {this.showDrinks}/>
          { this.state.shownProducts.length ? (
            <ProductsList products={this.state.shownProducts} productType={this.state.productType}/>
          ) : (
            <Grid container spacing={24} style={{padding: 15}}>
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Typography variant="subtitle2" display="block">
                  Choose between Foods, Drinks and Most Liked to see our products
                </Typography>
              </Grid>
            </Grid>
            )}
      </div>
  )}
}
export default MenuPage