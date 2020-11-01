import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Navigator from "./Navigator";
import ProductsList from "./ProductsList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { observer } from "mobx-react";

class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      foods: [],
      drinks: [],
      foodCategories: [],
      drinkCategories: [],
      shownProducts: [],
      productType: "",
      openAddProduct: false,
      newProduct: {
        title: "",
        category: "",
        subcategory: "",
      },
      type: {
        food: "food",
        drink: "drink",
      },
      style: {
        width: "40ch",
        display: "flex",
        flexWrap: "wrap",
      },
    };
  }

  handleClickOpen = () => {
    this.setState({ openAddProduct: true });
  };

  handleClose = () => {
    this.setState({ openAddProduct: false });
  };

  handleNewProductChange = (prop) => (event) => {
    this.setState({
      newProduct: { ...this.state.newProduct, [prop]: event.target.value },
    });
  };

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

    return () => (mounted = false);
  }

  selectFoods = (e) => {
    e.preventDefault();
    this.setState({ shownProducts: this.state.foods });
    this.setState({ productType: "Food" });
  };

  selectDrinks = (e) => {
    e.preventDefault();
    this.setState({ shownProducts: this.state.drinks });
    this.setState({ productType: "Drink" });
  };

  renderSelect(prop) {
    return prop.map((currentCategory) => (
      <MenuItem
        key={currentCategory.categoryName}
        value={currentCategory.categoryName}
      >
        {currentCategory.categoryName}
      </MenuItem>
    ));
  }

  render() {
    return (
      <div>
        <Navigator
          selectFoods={this.selectFoods}
          selectDrinks={this.selectDrinks}
        />
        <Paper style={{ paddingLeft: 230, paddingRight: 60 }}>
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickOpen}
                  >
                    Add product
                  </Button>
                  <Dialog
                    open={this.state.openAddProduct}
                    onClose={this.handleClose}
                    aria-labelledby="product-title"
                  >
                    <DialogTitle id="product-title">
                      Add a new product
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        You want to add a new product, huh?
                      </DialogContentText>

                      <FormControl
                        style={
                          this.state.style
                        }
                      >
                        <TextField label="Title" />
                      </FormControl>

                      <FormControl
                        style={
                          this.state.style
                        }
                      >
                        <Select
                          id="select-type"
                          value={this.state.newProduct.category}
                          onChange={this.handleNewProductChange("category")}
                        >
                          <MenuItem value="food">Food</MenuItem>
                          <MenuItem value="drink">Drink</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl
                        style={
                          this.state.style
                        }
                      >
                        {this.state.newProduct.category === "food" ? (
                          <Select
                            id="select-food-category"
                            value={this.state.newProduct.subcategory}
                            onChange={this.handleNewProductChange(
                              "subcategory"
                            )}
                          >
                            {this.renderSelect(this.state.foodCategories)}
                          </Select>
                        ) : null}
                      </FormControl>

                      <FormControl
                        style={
                          this.state.style
                        }
                      >
                        {this.state.newProduct.category === "drink" ? (
                          <Select
                            id="select-drink-category"
                            value={this.state.newProduct.subcategory}
                          >
                            {this.renderSelect(this.state.drinkCategories)}
                          </Select>
                        ) : null}
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button size="large" color="primary" target="_blank">
                        <SaveIcon /> Add new product
                      </Button>
                      <IconButton
                        aria-label="close"
                        color="primary"
                        onClick={this.handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div>
            {this.state.shownProducts.length ? (
              <ProductsList
                products={this.state.shownProducts}
                productType={this.state.productType}
              />
            ) : (
              <Typography color="textSecondary" align="center">
                No results found
              </Typography>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default observer(Content);
