import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Navigator from '../components/Admin/Navigator';
import ProductsList from '../components/Admin/Products/ProductsList'
import CategoryList from "../components/Admin/Categories/CategoryList";
import IngredientsList from "../components/Admin/Ingredients/IngredientsList";
import AddProductButton from '../components/Admin/AddProductButton';
import AddCategoryButton from '../components/Admin/AddCategoryButton';
import AddIngredientButton from '../components/Admin/AddIngredientButton';
import DrinkLikesLineChart from '../components/Charts/DrinkLikesLineChart'
import FoodLikesLineChart from '../components/Charts/FoodLikesLineChart'
import DrinkOrderLineChart from "../components/Charts/DrinkSaleLineChart";
import FoodOrderLineChart from "../components/Charts/FoodSaleLineChart";

class Admin extends React.Component {
    constructor() {
        super();

        this.state = {
            switch: true,
            foods: [],
            drinks: [],
            shownCategories: [],
            foodCategories: [],
            drinkCategories: [],
            ingredients: [],
            selectedType: "",
            productType: "",
            showCharts: false
        };
    }

    componentDidMount() {
        document.title = "Admin | " + this.props.name
        let mounted = true;
        fetch(`${process.env.REACT_APP_API_URL}/api/food/getCategoriesWithFoods`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ foods: data });
                }
            })
            .catch(console.log);

        fetch(`${process.env.REACT_APP_API_URL}/api/drink/getCategoriesWithDrinks`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ drinks: data });
                }
            })
            .catch(console.log);

        fetch(`${process.env.REACT_APP_API_URL}/api/category/food`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ foodCategories: data });
                }
            })
            .catch(console.log);

        fetch(`${process.env.REACT_APP_API_URL}/api/category/drink`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ drinkCategories: data });
                }
            })
            .catch(console.log);

        fetch(`${process.env.REACT_APP_API_URL}/api/ingredient`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ ingredients: data });
                }
            })
            .catch(console.log);

        return () => (mounted = false);
    }

    selectFoods = (e) => {
        e.preventDefault();

        let foodsOnMenu = [];

        this.state.foods.map((category) => {
            let foodsCategoryCopy = { ...category };

            foodsCategoryCopy.products = foodsCategoryCopy.products.reduce(function(filtered, product) {
                if (product.onMenu) {
                    product.productType = "Food";
                    product.category = foodsCategoryCopy;
                    filtered.push(product);
                }
                return filtered;
            }, []);

            if (foodsCategoryCopy.products.length > 0)
                foodsOnMenu.push(foodsCategoryCopy)

            return foodsCategoryCopy;
        });

        this.setState({
            shownCategories: foodsOnMenu
        });
        this.setState({ selectedType: "Product" });
        //this.setState({ productType: "Food" });
    };

    showCharts = (e) => {
        e.preventDefault();
        this.setState({ selectedType: "Charts" });
    };

    selectDrinks = (e) => {
        e.preventDefault();

        let drinksOnMenu = [];

        this.state.drinks.map((category) => {
            let drinksCategoryCopy = { ...category };

            drinksCategoryCopy.products = drinksCategoryCopy.products.reduce(function(filtered, product) {
                if (product.onMenu) {
                    product.productType = "Drink";
                    product.category = drinksCategoryCopy;
                    filtered.push(product);
                }
                return filtered;
            }, []);

            if (drinksCategoryCopy.products.length > 0)
                drinksOnMenu.push(drinksCategoryCopy)

            return drinksCategoryCopy;
        });

        this.setState({
            shownCategories: drinksOnMenu
        });

        this.setState({ selectedType: "Product" });
    };

    selectNotOnMenu = (e) => {
        e.preventDefault();

        let productsNotOnMenu = [];

        this.state.foods.map((category) => {
            let foodsCategoryCopy = { ...category };

            //categoryCopy.products = categoryCopy.products.flatMap(o => !o.onMenu ? [o] : []);

            foodsCategoryCopy.products = foodsCategoryCopy.products.reduce(function(filtered, product) {
                if (!product.onMenu) {
                    product.productType = "Food";
                    product.category = foodsCategoryCopy;
                    filtered.push(product);
                }
                return filtered;
            }, []);

            if (foodsCategoryCopy.products.length > 0)
                productsNotOnMenu.push(foodsCategoryCopy)

            return foodsCategoryCopy;
        });

        this.state.drinks.map((category) => {
            let drinksCategoryCopy = { ...category };

            //categoryCopy.products = categoryCopy.products.flatMap(o => !o.onMenu ? [o] : []);

            drinksCategoryCopy.products = drinksCategoryCopy.products.reduce(function(filtered, product) {
                if (!product.onMenu) {
                    product.productType = "Drink";
                    product.category = drinksCategoryCopy;
                    filtered.push(product);
                }
                return filtered;
            }, []);

            if (drinksCategoryCopy.products.length > 0)
                productsNotOnMenu.push(drinksCategoryCopy)

            return drinksCategoryCopy;
        });

        this.setState({ shownCategories: productsNotOnMenu });
        this.setState({ selectedType: "NotOnMenu" });
        this.setState({ productType: "" });
    };

    selectFoodCategories = (e) => {
        e.preventDefault();
        this.setState({ shownCategories: this.state.foodCategories });
        this.setState({ selectedType: "Category" });
        this.setState({ productType: "Food" });
    }

    selectDrinkCategories = (e) => {
        e.preventDefault();
        this.setState({ shownCategories: this.state.drinkCategories });
        this.setState({ selectedType: "Category" });
        this.setState({ productType: "Drink" });
    }

    selectIngredients = (e) => {
        e.preventDefault();
        this.setState({ shownCategories: this.state.drinkCategories });
        this.setState({ selectedType: "Ingredients" });
        this.setState({ productType: "" });
    }

    renderProducts(selectedType, productType) {
        switch (selectedType) {
            case 'Product':
                return <ProductsList
                    categories={this.state.shownCategories}
                    productType={productType}
                    foodCategories={this.state.foodCategories}
                    drinkCategories={this.state.drinkCategories}
                    ingredients={this.state.ingredients}
                />;
            case 'Category':
                return <CategoryList
                    categories={this.state.shownCategories}
                    type={productType}
                />;
            case 'Ingredients':
                return <IngredientsList
                    ingredients={this.state.ingredients}
                />;
            case 'NotOnMenu':
                return <ProductsList
                    categories={this.state.shownCategories}
                    productType={productType}
                    foodCategories={this.state.foodCategories}
                    drinkCategories={this.state.drinkCategories}
                    ingredients={this.state.ingredients}
                />;
            case 'Charts':
                return <div>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <DrinkLikesLineChart />
                        </Grid>
                        <Grid item xs={6}>
                            <FoodLikesLineChart />
                        </Grid>
                        <Grid item xs={6}>
                               <DrinkOrderLineChart />
                        </Grid>
                        <Grid item xs={6}>
                            <FoodOrderLineChart />
                        </Grid>
                    </Grid>
                </div>;
            default:
                return null;
        }
    };

    render() {
        return (
            <div>
                <Navigator
                    selectFoods={this.selectFoods}
                    selectDrinks={this.selectDrinks}
                    selectNotOnMenu={this.selectNotOnMenu}
                    selectFoodCategories={this.selectFoodCategories}
                    selectDrinkCategories={this.selectDrinkCategories}
                    selectIngredients={this.selectIngredients}
                    selectShowCharts={this.showCharts}
                />
                <AppBar position="static">
                    <ToolBar>
                        <Container disableGutters>
                            <div style={{ float: 'right' }}>
                                <ButtonGroup>
                                    <AddProductButton
                                        foodCategories={this.state.foodCategories}
                                        drinkCategories={this.state.drinkCategories}
                                    />
                                    <AddCategoryButton />
                                    <AddIngredientButton />
                                    <Button variant="text" disabled={true} />
                                    <Button variant="text" size="large" color="inherit">
                                        Log Out
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Container>
                    </ToolBar>
                </AppBar>
                <Paper elevation='0' style={{ paddingLeft: 230, paddingRight: 60, background: '#f7f7f7' }}>
                    {this.renderProducts(this.state.selectedType, this.state.productType)}
                </Paper>
            </div>
        );
    }
}

export default Admin;
