import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
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
            shownProducts: [],
            ingredients: [],
            selectedType: "",
            productType: "",
        };
    }

    componentDidMount() {
        let mounted = true;
        fetch(`/api/food`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ foods: data });
                }
            })
            .catch(console.log);

        fetch(`/api/drink`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ drinks: data });
                }
            })
            .catch(console.log);

        fetch(`/api/category/food`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ foodCategories: data });
                }
            })
            .catch(console.log);

        fetch(`/api/category/drink`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    this.setState({ drinkCategories: data });
                }
            })
            .catch(console.log);

        fetch(`/api/ingredient`)
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
        this.setState({
            shownProducts: this.state.foods.filter((item) => item.onMenu === true),
        });
        this.setState({ selectedType: "Product" });
        this.setState({ productType: "Food" });
    };

    selectDrinks = (e) => {
        e.preventDefault();
        this.setState({
            shownProducts: this.state.drinks.filter((item) => item.onMenu === true),
        });
        this.setState({ selectedType: "Product" });
        this.setState({ productType: "Drink" });
    };

    selectNotOnMenu = (e) => {
        e.preventDefault();
        let productsNotOnMenu = [];
        this.state.foods.map((item) => {
            let product = item;
            product.productType = 'Food';
            productsNotOnMenu.push(product);
            return product;
        });
        this.state.drinks.map((item) => {
            let product = item;
            product.productType = 'Drink';
            productsNotOnMenu.push(product);
            return product;
        });

        productsNotOnMenu = productsNotOnMenu.filter(
            (item) => item.onMenu === false
        );

        this.setState({ shownProducts: productsNotOnMenu });
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
                    products={this.state.shownProducts}
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
                    products={this.state.shownProducts}
                    productType={productType}
                    foodCategories={this.state.foodCategories}
                    drinkCategories={this.state.drinkCategories}
                    ingredients={this.state.ingredients}
                />;
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
                <Paper style={{ paddingLeft: 230, paddingRight: 60 }}>
                    {this.renderProducts(this.state.selectedType, this.state.productType)}
                </Paper>
            </div>
        );
    }
}

export default Admin;
