import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Navigator from './Navigator';
import ProductsList from './ProductsList'
import CategoryList from './CategoryList'

class Content extends React.Component {
    constructor(){
        super();

        this.state={
            foods: [],
            drinks: [],
            foodCategories: [],
            drinkCategories: [],
            shownProducts: [],
            shownCategories:[],
            productType: '',
            categoryType: '',
        }
    }

    componentDidMount(){
        let mounted = true;
    fetch(`/api/food`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
      this.setState({ foods: data })
      }
    })
    .catch(console.log)

    fetch(`/api/drink`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
        this.setState({ drinks: data })
      }
    })
    .catch(console.log)

    fetch(`/api/category/food`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
        this.setState({ foodCategories: data })
      }
    })
    .catch(console.log)

    fetch(`/api/category/drink`)
    .then(res => res.json())
    .then((data) => {
      if(mounted){
        this.setState({ drinkCategories: data })
      }
    })
    .catch(console.log)

    return () => mounted = false;
    }

    selectFoods = (e) => {
        e.preventDefault();
        this.setState({shownProducts: this.state.foods});
        this.setState({productType: "Food"});
        this.setState({categoryType: ""});
    }

    selectDrinks = (e) => {
        e.preventDefault();
        this.setState({shownProducts: this.state.drinks});
        this.setState({productType: "Drink"});
        this.setState({categoryType: ""});
    }

    selectCategoryDrinks = (e) => {
        e.preventDefault();
        this.setState({shownCategories: this.state.drinkCategories});
        this.setState({productType: ""});
        this.setState({categoryType: "DrinkC"});
    }

    selectCategoryFood = (e) => {
      e.preventDefault();
      this.setState({shownCategories: this.state.foodCategories});
      this.setState({productType: ""});
      this.setState({categoryType: "FoodC"});
  }
    
    render(){
    return (
        <div>
            <Navigator selectFoods={this.selectFoods} selectDrinks={this.selectDrinks} selectCategoryDrinks={this.selectCategoryDrinks} selectCategoryFood={this.selectCategoryFood}/>
            <Paper style={{paddingLeft: 230, paddingRight: 60}}>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <Grid item>
                    <SearchIcon color="inherit" />
                    </Grid>
                    <Grid item xs>
                    <TextField
                        fullWidth
                        placeholder="Search by title, ingredients, category"
                        InputProps={{
                        disableUnderline: true,
                        }}
                    />
                    </Grid>
                    <Grid item xs>
                    <Button variant="contained" color="primary">
                        Add product
                    </Button>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <div>
                { this.state.productType != '' ? (
                      <ProductsList products={this.state.shownProducts} productType={this.state.productType} foodCategories={this.state.foodCategories} drinkCategories={this.state.drinkCategories}/>
                  ) : this.state.categoryType != '' ? (
                      <CategoryList categories={this.state.shownCategories} categoryType={this.state.productType}/>
                  ) : (
                      <Typography color="textSecondary" align="center">
                          No results found
                      </Typography>
                  )
                }
            </div>
            </Paper>
        </div>
  )}
}

export default Content;