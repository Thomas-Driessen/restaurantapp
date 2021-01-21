import { Breadcrumbs } from '@material-ui/core';
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
      landingPageFoods: [],
      drinks: [],
      mostLiked: [],
      foodLikes: [],
      drinkLikes: [],
      mostLikedFoods: [],
      shownProducts: [],
      productType: "",
      foodCategories: [],
      drinkCategories: [],
      categoriesShown: [],
      selectedCategory: "",
      categorizedProducts: [],
      sorted: false
    };
  }

  async componentDidMount() {
    document.title = "Menu | " + this.props.name
    let mounted = true;
    await fetch(`${process.env.REACT_APP_API_URL}/api/food/available`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foods: data })
        }
      })
        .catch((error) => {
          console.log("/api/food/available: " + error);
        })

        await fetch(`${process.env.REACT_APP_API_URL}/api/food`)
        .then(res => res.json())
        .then((data) => {
          if (mounted) {
            this.setState({ landingPageFoods: data })
          }
        })
          .catch((error) => {
            console.log("/api/food: " + error);
          })

    await fetch(`${process.env.REACT_APP_API_URL}/api/drink/available`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ drinks: data })
        }
      })
        .catch((error) => {
          console.log("/api/drink/available: " + error);
        })

    await fetch(`${process.env.REACT_APP_API_URL}/api/foodLikes`)
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
          foods = [];
          this.state.landingPageFoods.map(food => {
            let element = food;
            element["likes"] = data.find(e => e.food.id === food.id).likes;
            foods.push(element);
            return true;
          })
          foods = foods.filter(item => item.onMenu === true);
          foods = foods.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0));
          this.setState({ landingPageFoods: foods });
        }
      })
      .catch((error) => {
        console.log("/api/foodLikes: " + error);
      })

    await fetch(`${process.env.REACT_APP_API_URL}/api/drinkLikes`)
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
        .catch((error) => {
          console.log("/api/drinkLikes: " + error);
        })

    await fetch(`${process.env.REACT_APP_API_URL}/api/category/food`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ foodCategories: data })
        }
      })
        .catch((error) => {
          console.log("/api/category/food: " + error);
        })

    await fetch(`${process.env.REACT_APP_API_URL}/api/category/drink`)
      .then(res => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ drinkCategories: data })
        }
      })
        .catch((error) => {
          console.log("/api/category/drink: " + error);
        })

    return () => mounted = false;
  }

  showFoods = (e) => {
    e.preventDefault();
    if (this.state.foodsLikes) {
      this.setState({ shownProducts: this.state.foodsLikes.filter(item => item.onMenu === true) });
      this.setState({ categoriesShown: this.state.foodCategories });
      this.setState({ productType: "Food" });
      this.setState({ selectedCategory: "" });
    }
  }

  showDrinks = (e) => {
    e.preventDefault();
    if (this.state.drinksLikes) {
      this.setState({ shownProducts: this.state.drinksLikes.filter(item => item.onMenu === true) });
      this.setState({ categoriesShown: this.state.drinkCategories });
      this.setState({ productType: "Drink" });
      this.setState({ selectedCategory: "" });
    }
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
    return (
      <div>
        <NavBar pageName="menu" />
        <SortBar showFoods={this.showFoods} showDrinks={this.showDrinks} showMostLiked={this.showMostLiked} productType={this.state.productType} />
        <Grid container spacing={1}>
          {this.state.selectedCategory !== "" ? (
            <div className="width-100-percent" style={{ padding: 15 }}>
              <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                <span color="inherit" className="breadcrumb breadcrumb-current">
                  Menu
                </span>
                <span color="inherit" className="breadcrumb" onClick={this.resetCategory}>
                  {this.state.productType}
                </span>
                <span className="breadcrumb breadcrumb-current" naria-current="page">
                  {this.state.selectedCategory}
                </span>
              </Breadcrumbs>
              <Grid container justify="space-between">
                <IconButton aria-label="return-to-categories" onClick={this.resetCategory} color="primary">
                  <ArrowBackIcon />
                </IconButton>
                <h1>{this.state.selectedCategory}</h1>
                <Button style={{margin: 'auto 0'}} size='medium' color={this.state.sorted === true ? 'primary.dark' : 'primary'} variant='contained' onClick={this.showMostLiked}>
                  <span>Most Liked</span>
                </Button>
              </Grid>
              <ProductsList products={this.state.shownProducts.filter(product => product.category.categoryName === this.state.selectedCategory)} productType={this.state.productType} />
            </div>
          ) : (
              this.state.categoriesShown.length ? (
                <div style={{ padding: 15 }}>
                  <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                    <span color="inherit" className="breadcrumb breadcrumb-current">
                      Menu
                    </span>
                    <span className="breadcrumb breadcrumb-current" naria-current="page">
                      {this.state.productType}
                    </span>
                  </Breadcrumbs>
                  <CategoryList categories={this.state.categoriesShown} selectCategory={this.selectCategory} />
                </div>
              ) : (
                  <Grid container spacing={0} style={{ padding: 0 }}>
                    <div id="homepageIntro">
                      <h1>Welcome to our restaurant!</h1>
                    </div>
                    <div id="homepageInstructionsWrapper">
                      <h2>How it works</h2>
                      <div id="homepageInstructions">
                        <div id="instructionScanQr" className="homepage-instruction">
                          <div className="homepage-instruction-content">
                            <div className="homepage-instruction-image">
                              <img src={process.env.PUBLIC_URL + "/images/qr-code.svg"} alt="QR-code" id="qrfrontpage"/>
                            </div>
                            <span className="instruction-text">Scan QR</span>
                          </div>
                        </div>
                        <div id="instructionBrowseFood" className="homepage-instruction">
                          <div className="homepage-instruction-content">
                              <div className="homepage-instruction-image">
                              <img src={process.env.PUBLIC_URL + "/images/hamburger.svg"} alt="Hamburgerfrontpage icon" id="hamburgerfrontpage"/>
                              </div>
                            <span className="instruction-text">Browse food</span>
                          </div>
                        </div>
                        <div id="instructionPay" className="homepage-instruction">
                          <div className="homepage-instruction-content">
                            <div className="homepage-instruction-image">
                              <img src={process.env.PUBLIC_URL + "/images/credit-card.svg"} alt="Creditcardfrontpage icon" id="creditcardfrontpage"/>
                            </div>
                            <span className="instruction-text">Pay orders</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="foodRecommendations">
                      <h3>Prior foodlovers recommend...</h3>
                      <div className="popularfoods">
                        <div className="foodCard">
                          <img src={this.state.landingPageFoods.length ? this.state.landingPageFoods[0].image : null} alt="Pizza"/>
                          <span className="foodCardName">{this.state.landingPageFoods.length ? this.state.landingPageFoods[0].title : null}</span>
                        </div>
                        <div className="foodCard">
                          <img src={this.state.landingPageFoods.length ? this.state.landingPageFoods[1].image : null} alt="Pizza"/>
                          <span className="foodCardName">{this.state.landingPageFoods.length ? this.state.landingPageFoods[1].title : null}</span>
                        </div>
                        <div className="foodCard">
                          <img src={this.state.landingPageFoods.length ? this.state.landingPageFoods[2].image : null} alt="Pizza"/>
                          <span className="foodCardName">{this.state.landingPageFoods.length ? this.state.landingPageFoods[2].title : null}</span>
                        </div>
                        <div className="foodCard">
                          <img src={this.state.landingPageFoods.length ? this.state.landingPageFoods[3].image : null} alt="Pizza"/>
                          <span className="foodCardName">{this.state.landingPageFoods.length ? this.state.landingPageFoods[3].title : null}</span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                )
            )}
        </Grid>
      </div>
    )
  }
}
export default MenuPage
