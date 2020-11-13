import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Navigator from './Navigator';
import ProductsList from './ProductsList'
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
import CategoryList from "./CategoryList";
import IngredientsList from "./IngredientsList";
import AddProductButton from './AddProductButton';

class Content extends React.Component {
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
      openAddProduct: false,
      openAddCategory: false,
      loading: false,
      newProduct: {
        title: "",
        type: "",
        categoryName: "",
        ingredients: "",
        price: 0,
        quantity: 0,
        description: "",
        image: "",
      },
      newCategory: {
        type: "",
        categoryName: "",
        image: "",
      },
      style: {
        width: "40ch",
        display: "flex",
        flexWrap: "wrap",
        padding: "5px",
      },
    };
  }

  handleClickOpen = () => {
    this.setState({ openAddProduct: true });
  };

  handleClose = () => {
    this.setState({ openAddProduct: false });
  };

  handleCategoryAddOpen = () => {
    this.setState({ openAddCategory: true });
  };

  handleCategoryAddClose = () => {
    this.setState({ openAddCategory: false });
  };

  handleNewProductChange = (prop) => (event) => {
    const { name, value } = event.target;
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        [name]: value,
        categoryName:
          name === "type"
            ? ""
            : name === "categoryName"
              ? value
              : this.state.newProduct.categoryName,
      },
    });
  };

  handleNewCategoryChange = (prop) => (event) => {
    const { name, value } = event.target;
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [name]: value,
        type:
          name === "type"
            ? value
            : this.state.newCategory.type,
      },
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

    fetch(`/api/ingredients`)
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

  renderSelectCategories(prop) {
    return prop.map((currentCategory) => (
      <MenuItem
        key={currentCategory.categoryName}
        value={currentCategory.categoryName}
      >
        {currentCategory.categoryName}
      </MenuItem>
    ));
  }

  addCategory = () => {
      fetch(`/api/category/${this.state.newCategory.type}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.newCategory)
      }).catch(console.log);

    alert("Your changes have been saved");
    this.setState({ openAddCategory: false });
  };

  saveProduct = () => {
    let price = parseFloat(this.state.newProduct.price);
    let quantity = parseFloat(this.state.newProduct.quantity);
    if (isNaN(price) || isNaN(quantity)) {
      alert("Price is not a valid number");
    } else {
      let product = this.RemovePropertyWithoutAltering(
        "type",
        this.state.newProduct
      );

      if (this.state.newProduct.type === "drink") {
        product = this.RemovePropertyWithoutAltering("description", product);
        for (let i = 0; i < this.state.drinkCategories.length; i = i + 1) {
          if (
            product.categoryName === this.state.drinkCategories[i].categoryName
          ) {
            product.category = this.state.drinkCategories[i];
          }
        }
      }

      if (this.state.newProduct.type === "food") {
        for (let i = 0; i < this.state.foodCategories.length; i = i + 1) {
          if (
            product.categoryName === this.state.foodCategories[i].categoryName
          ) {
            product.category = this.state.foodCategories[i];
          }
        }
      }

      product = this.RemovePropertyWithoutAltering("categoryName", product);

      product.price = price;
      product.quantity = quantity;

      fetch(`/api/${this.state.newProduct.type}`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      }).catch(console.log);

      alert("Your changes have been saved");
      this.setState({ openAddProduct: false });
    }
  };

  RemovePropertyWithoutAltering(prop, originalObject) {
    let obj = Object.keys(originalObject).reduce((object, key) => {
      if (key !== prop) {
        object[key] = originalObject[key];
      }
      return object;
    }, {});

    return obj;
  };

  uploadCategoryImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", `Categories`);
    this.setState({ loading: true });

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drb2yh2dy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    this.setState({
      newCategory: {
        ...this.state.newCategory,
        image: file.secure_url,
      },
    });
    this.setState({ loading: false });
  };

  uploadProductImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", `${this.state.newProduct.type}Images`);
    this.setState({ loading: true });

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drb2yh2dy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    this.setState({
      newProduct: {
        ...this.state.newProduct,
        image: file.secure_url,
      },
    });
    this.setState({ loading: false });
  };

  renderProducts(selectedType, productType) {
    console.log(productType);
    switch (selectedType) {
      case 'Product':
        return <ProductsList
          products={this.state.shownProducts}
          productType={productType}
          foodCategories={this.state.foodCategories}
          drinkCategories={this.state.drinkCategories}
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
                  <AddProductButton
                    foodCategories={this.state.foodCategories}
                    drinkCategories={this.state.drinkCategories}
                  />
                  <Button variant="contained" color="primary" onClick={this.handleCategoryAddOpen} >
                    Add Category
                  </Button>

                  {/* Begin add category dialog */}
                  <Dialog open={this.state.openAddCategory} onClose={this.handleCategoryAddClose} aria-labelledby="product-title" >
                    <DialogTitle id="product-title">
                      Add a new category
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        You want to add a new category, huh?
                      </DialogContentText>

                      <FormControl style={this.state.style}>
                        <TextField label="Category name" name="categoryName" onChange={this.handleNewCategoryChange("categoryName")} />
                      </FormControl>

                      <FormControl style={this.state.style}>
                        <Select id="select-type" name="type" value={this.state.newCategory.type} onChange={this.handleNewCategoryChange("type")} >
                          <MenuItem value="food">Food Category</MenuItem>
                          <MenuItem value="drink">Drink Category</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl style={this.state.style}>
                        <input type="file" name="file" placeholder="Upload a file" onChange={this.uploadProductImage} />
                      </FormControl>

                      {this.state.loading ? (
                        <DialogContentText>Loading...</DialogContentText>
                      ) : null}
                    </DialogContent>
                    <DialogActions>
                      <Button size="large" color="primary" target="_blank" onClick={this.addCategory} disabled={this.state.loading} >
                        <SaveIcon /> Add new Category
                      </Button>
                      <IconButton aria-label="close" color="primary" onClick={this.handleCategoryAddClose} >
                        <CloseIcon />
                      </IconButton>
                    </DialogActions>
                  </Dialog>
                  {/* End add category dialog */}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div>
            {this.renderProducts(this.state.selectedType, this.state.productType)}
          </div>
        </Paper>
      </div>
    );
  }
}

export default Content;
