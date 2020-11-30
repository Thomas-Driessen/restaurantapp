import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";


class AddProductButton extends React.Component {
  constructor() {
    super();

    this.state = {
      openAddProduct: false,
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
      loading: false,
      style: {
        width: "40ch",
        display: "flex",
        flexWrap: "wrap",
        padding: "5px",
      },
    }
  }

  handleClickOpen = () => {
    this.setState({ openAddProduct: true });
  };

  handleClose = () => {
    this.setState({ openAddProduct: false });
  };

  handleNewProductChange = () => (event) => {
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

  saveProduct = () => {
    let error = '';
    let price = parseFloat(this.state.newProduct.price);
    let quantity = parseFloat(this.state.newProduct.quantity);
    error = isNaN(price) ? "Price is not a valid number" : error;
    error = isNaN(quantity) ? "Quantity is not a valid number" : error;
    if (error !== '') {
      alert("Price is not a valid number");
    } else {
      let product = this.RemovePropertyWithoutAltering(
        "type",
        this.state.newProduct
      );

      if (this.state.newProduct.type === "drink") {
        product = this.RemovePropertyWithoutAltering("description", product);
        for (let i = 0; i < this.props.drinkCategories.length; i = i + 1) {
          if (
            product.categoryName === this.props.drinkCategories[i].categoryName
          ) {
            product.category = this.props.drinkCategories[i];
          }
        }
      }

      if (this.state.newProduct.type === "food") {
        for (let i = 0; i < this.props.foodCategories.length; i = i + 1) {
          if (
            product.categoryName === this.props.foodCategories[i].categoryName
          ) {
            product.category = this.props.foodCategories[i];
          }
        }
      }

      product = this.RemovePropertyWithoutAltering("categoryName", product);

      product.price = price;
      product.quantity = quantity;

      fetch(`https://cors-anywhere.herokuapp.com/http://s3-restaurant-api.herokuapp.com/api/${this.state.newProduct.type}`, {
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

  RemovePropertyWithoutAltering(prop, originalObject) {
    let obj = Object.keys(originalObject).reduce((object, key) => {
      if (key !== prop) {
        object[key] = originalObject[key];
      }
      return object;
    }, {});

    return obj;
  };

  render() {
    return (
      <div>
        <Button variant="text" size="large" color="inherit" onClick={this.handleClickOpen} >
          Add Product
        </Button>
        <Dialog open={this.state.openAddProduct} onClose={this.handleClose} aria-labelledby="product-title" >
          <DialogTitle id="product-title">
            Add a new product
        </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You want to add a new product, huh?
          </DialogContentText>

            <FormControl style={this.state.style}>
              <TextField label="Title" name="title" onChange={this.handleNewProductChange("title")} />
            </FormControl>

            <FormControl style={this.state.style}>
              <InputLabel id="demo-simple-select-label">
                Type
            </InputLabel>
              <Select
                id="select-type"
                name="type"
                label="Yype"
                value={this.state.newProduct.type}
                onChange={this.handleNewProductChange("type")}
              >
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="drink">Drink</MenuItem>
              </Select>
            </FormControl>

            {this.state.newProduct.type === "food" ? (
              <FormControl style={this.state.style}>
                <InputLabel id="demo-simple-select-label">
                  Category
              </InputLabel>
                <Select
                  id="select-food-category"
                  name="categoryName"
                  value={this.state.newProduct.categoryName}
                  onChange={this.handleNewProductChange(
                    "categoryName"
                  )}
                >
                  {this.renderSelectCategories(
                    this.props.foodCategories
                  )}
                </Select>
              </FormControl>
            ) : null}

            {this.state.newProduct.type === "drink" ? (
              <FormControl style={this.state.style}>
                <InputLabel id="demo-simple-select-label">
                  Category
              </InputLabel>
                <Select
                  id="select-drink-category"
                  name="categoryName"
                  value={this.state.newProduct.categoryName}
                  onChange={this.handleNewProductChange(
                    "categoryName"
                  )}
                >
                  {this.renderSelectCategories(
                    this.props.drinkCategories
                  )}
                </Select>
              </FormControl>
            ) : null}

            <FormControl style={this.state.style}>
              <TextField label="Price" name="price"
                onChange={this.handleNewProductChange("price")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl style={this.state.style}>
              <TextField label="Quantity" name="quantity" onChange={this.handleNewProductChange("quantity")} />
            </FormControl>

            {this.state.newProduct.type === "food" ? (
              <FormControl style={this.state.style}>
                <TextField label="Description" name="description"
                  onChange={this.handleNewProductChange(
                    "description"
                  )}
                />
              </FormControl>
            ) : null}

            <FormControl style={this.state.style}>
              <input type="file" name="file" placeholder="Upload a file" onChange={this.uploadProductImage} />
            </FormControl>

            {this.state.loading ? (
              <DialogContentText>Loading...</DialogContentText>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button size="large" color="primary" target="_blank" onClick={this.saveProduct} disabled={this.state.loading} >
              <SaveIcon /> Add new product
          </Button>
            <IconButton aria-label="close" color="primary" onClick={this.handleClose} >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default AddProductButton