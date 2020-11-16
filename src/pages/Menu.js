import { Typography } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import SortBar from '../components/Navigation bars/SortBar';
import ProductsList from '../components/Product List/ProductsList';
import CategoryList from '../components/Product List/CategoryList';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class MenuPage extends React.Component {

  constructor() {
    super();
    this.state = {
      foods: [],
      drinks: [],
      mostLikedFoods: [],
      shownProducts: [],
      productType: "Food",
      foodCategories: [],
      drinkCategories: [],
      categoriesShown: [],
      selectedCategory: "",
      categorizedProducts: []
    };
  }

  componentDidMount() {
    let mounted = true;
    fetch(`/api/food`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foods: data })
        }
      })
      .catch(console.log)

    fetch(`/api/drink`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ drinks: data })
        }
      })
      .catch(console.log)

    fetch(`/api/category/food`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foodCategories: data })
        }
      })
      .catch(console.log)

    fetch(`/api/category/drink`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ drinkCategories: data })
        }
      })
      .catch(console.log)

    return () => mounted = false;
  }

  showFoods = (e) => {
    e.preventDefault();
    this.setState({ shownProducts: this.state.foods.filter(item => item.onMenu === true) });
    this.setState({ categoriesShown: this.state.foodCategories });
    this.setState({ productType: "Food" });
    this.setState({ selectedCategory: "" });
  }

  showDrinks = (e) => {
    e.preventDefault();
    this.setState({ shownProducts: this.state.drinks.filter(item => item.onMenu === true) });
    this.setState({ categoriesShown: this.state.drinkCategories });
    this.setState({ productType: "Drink" });
    this.setState({ selectedCategory: "" });
  }

  selectCategory = (category) => {
    this.setState({ selectedCategory: category.categoryName });
  }

  resetCategory = (e) => {
    e.preventDefault();
    this.setState({ selectedCategory: "" });
  }

  render() {
    return (
      <div>
        <NavBar />
        <SortBar showFoods={this.showFoods} showDrinks={this.showDrinks} />
        <Grid container spacing={0} style={{ padding: 15 }}>
          {this.state.selectedCategory !== "" ? (
            <div>
              <Grid container justify="flex-end">
                <IconButton aria-label="return-to-categories" onClick={this.resetCategory} color="primary">
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <ProductsList products={this.state.shownProducts.filter(product => product.category.categoryName === this.state.selectedCategory)} productType={this.state.productType} />
            </div>
          ) : (
              this.state.categoriesShown.length ? (
                <CategoryList categories={this.state.categoriesShown} selectCategory={this.selectCategory} />
              ) : (
                  <Grid container spacing={0} style={{ padding: 12 }}>
                    <Typography variant="subtitle2" display="block">
                      Choose between Foods, Drinks and Most Liked to see our products
                    </Typography>
                  </Grid>
                )
            )}
        </Grid>
      </div>
    )
  }
}
export default MenuPage