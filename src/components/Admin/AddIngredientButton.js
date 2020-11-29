import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class AddIngredientButton extends React.Component {
  constructor() {
    super();

    this.state = {
      openAddIngredient: false,
      loading: false,
      newIngredient: {
        ingredientTitle: "",
        ingredientQuantity: 0,
        price: 0,
        unit: "",
      },
      style: {
        width: "40ch",
        display: "flex",
        flexWrap: "wrap",
        padding: "5px",
      },
      units: ["g", "ml"],
    };
  }

  handleIngredientAddOpen = () => {
    this.setState({ openAddIngredient: true });
  };

  handleIngredientAddClose = () => {
    this.setState({ openAddIngredient: false });
  };

  handleNewIngredientChange = () => (event) => {
    const { name, value } = event.target;
    this.setState({
      newIngredient: {
        ...this.state.newIngredient,
        [name]: value,
      },
    });
  };

  renderSelectCategories(prop) {
    return prop.map((currentUnit) => (
      <MenuItem key={currentUnit} value={currentUnit}>
        {currentUnit}
      </MenuItem>
    ));
  }

  saveIngredient = () => {
    let price = parseFloat(this.state.newIngredient.price);
    let quantity = parseFloat(this.state.newIngredient.ingredientQuantity);
    if (isNaN(price) || isNaN(quantity)) {
      alert("Price is not a valid number");
    } else {
      fetch("/api/Ingredient", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.newIngredient),
      }).catch(console.log);

      alert("Your changes have been saved");
      this.setState({ openAddIngredient: false });
    }
  };

  render() {
    return (
      <div>
        <Button
          variant="text"
          size="large"
          color="inherit"
          onClick={this.handleIngredientAddOpen}
        >
          Add Ingredient
        </Button>
        <Dialog
          open={this.state.openAddIngredient}
          onClose={this.handleIngredientAddClose}
          aria-labelledby="product-title"
        >
          <DialogTitle id="ingredient-title">Add a new ingredient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You want to add a new ingredient, huh?
            </DialogContentText>

            <FormControl style={this.state.style}>
              <TextField
                label="Ingredient name"
                name="ingredientTitle"
                onChange={this.handleNewIngredientChange("ingredientTitle")}
              />
            </FormControl>

            <FormControl style={this.state.style}>
              <TextField
                label="Ingredient quantity"
                name="ingredientQuantity"
                onChange={this.handleNewIngredientChange("ingredientQuantity")}
              />
            </FormControl>

            <FormControl style={this.state.style}>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                id="select-ingredient-unit"
                name="unit"
                label="unit"
                value={this.state.newIngredient.unit}
                onChange={this.handleNewIngredientChange("unit")}
              >
                {this.renderSelectCategories(this.state.units)}
              </Select>
            </FormControl>

            <FormControl style={this.state.style}>
              <TextField
                label="Ingredient price"
                name="price"
                onChange={this.handleNewIngredientChange("price")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              color="primary"
              target="_blank"
              onClick={this.saveIngredient}
            >
              <SaveIcon /> Add new Ingredient
            </Button>
            <IconButton
              aria-label="close"
              color="primary"
              onClick={this.handleIngredientAddClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default AddIngredientButton;
