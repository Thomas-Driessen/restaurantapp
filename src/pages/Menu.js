import { Typography } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import SortBar from '../components/Navigation bars/SortBar';
import ProductsList from '../components/Product List/ProductsList';
import CategoryList from '../components/Product List/CategoryList';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';

class MenuPage extends React.Component {

  constructor() {
    super();
    this.state = {
      foods: [],
      drinks: [],
      mostLiked: [],
      foodLikes: [],
      drinkLikes: [],
      mostLikedFoods: [],
      shownProducts: [],
      productType: "Food",
      foodCategories: [],
      drinkCategories: [],
      categoriesShown: [],
      selectedCategory: "",
      categorizedProducts: [],
      sorted: false
    };
  }

  async componentDidMount() {
  componentDidMount() {
    document.title = "Menu | "+this.props.name
    let mounted = true;
    await fetch(`${process.env.REACT_APP_API_URL}/api/food/available`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foods: data })
        }
      })
      .catch(console.log)

    await fetch(`${process.env.REACT_APP_API_URL}/api/drink/available`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ drinks: data })
        }
      })
      .catch(console.log)

    fetch(`${process.env.REACT_APP_API_URL}/api/foodLikes`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          let foods = [];
          this.state.foods.map(food => {
            let element = food;
            element["likes"] = data.find(e => e.food.id === food.id).likes;
            foods.push(element);
            return true;
          })
          this.setState({ foodsLikes: foods });
        }
      })
      .catch(console.log)

    fetch(`${process.env.REACT_APP_API_URL}/api/drinkLikes`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          let drinks = [];
          this.state.drinks.map(drink => {
            let element = drink;
            element["likes"] = data.find(e => e.drink.id === drink.id).likes;
            drinks.push(element);
            return true;
          })
          this.setState({ drinksLikes: drinks });
        }
      })
      .catch(console.log)

    fetch(`${process.env.REACT_APP_API_URL}/api/category/food`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foodCategories: data })
        }
      })
      .catch(console.log)

    fetch(`${process.env.REACT_APP_API_URL}/api/category/drink`)
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
    this.setState({ shownProducts: this.state.foodsLikes.filter(item => item.onMenu === true) });
    this.setState({ categoriesShown: this.state.foodCategories });
    this.setState({ productType: "Food" });
    this.setState({ selectedCategory: "" });
  }

  showDrinks = (e) => {
    e.preventDefault();
    this.setState({ shownProducts: this.state.drinksLikes.filter(item => item.onMenu === true) });
    this.setState({ categoriesShown: this.state.drinkCategories });
    this.setState({ productType: "Drink" });
    this.setState({ selectedCategory: "" });
  }

  showMostLiked = (e) => {
    e.preventDefault();
    if (this.state.sorted) {
      this.setState({ shownProducts: this.state.shownProducts.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) });
      this.setState({ sorted: false });
    }
    else {
      this.setState({ shownProducts: this.state.shownProducts.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)) });
      this.setState({ sorted: true });
    }
  }

  selectCategory = (category) => {
    this.setState({ selectedCategory: category.categoryName });
  }

  resetCategory = (e) => {
    e.preventDefault();
    this.setState({ selectedCategory: "" });
  }

  render() {
    console.log(this.state.drinksLikes);
    return (
      <div>
        <NavBar />
        <SortBar showFoods={this.showFoods} showDrinks={this.showDrinks} showMostLiked={this.showMostLiked} />
        <Grid container spacing={0} style={{ padding: 15 }}>
          {this.state.selectedCategory !== "" ? (
            <div>
              <Grid container justify="flex-end">
                <Button size='large' color={this.state.sorted === true ? 'primary.dark' : 'primary'} variant='contained' onClick={this.showMostLiked}>
                  <span>Most Liked</span>
                </Button>
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