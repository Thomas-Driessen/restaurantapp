import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: "60ch",
    },
    ingredients: {
        '& > *': {
            width: '20ch',
            marginRight: theme.spacing(2),
        }
    },
    button: {
        float: 'right',
        marginTop: theme.spacing(2),
    }
}));

const ProductEdit = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({ ...props.product });
    const [ingredients, setIngredients] = React.useState({ ...props.product.ingredients });
    const [category, setCategory] = React.useState({ ...props.product.category });
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState("");
    const [show, setShow] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleIngredientsAmountChange = (id) => (event) => {
        let ingredientsEdit = [];
        ingredients.map(currentIngredient => {
            currentIngredient.amount = currentIngredient.ingredient.ingredientId === id ? event.target.value : currentIngredient.amount;
            ingredientsEdit.push(currentIngredient);

            return true;
        });
        setIngredients(ingredientsEdit);
    };

    const handleCategoryChange = (prop) => (event) => {
        setCategory({ ...category, [prop]: event.target.value });
    };

    React.useEffect(() => {
        setValues(props.product);
        setCategory(props.product.category);
        setIngredients(props.product.ingredients);
    }, [props.product]);

    const saveProduct = () => {
        let error = '';
        let price = parseFloat(values.price);
        ingredients.map(currentIngredient => {
            error = isNaN(currentIngredient.amount) ? 'Amount is not a valid number' : error;
            return true;
        });
        error = isNaN(price) ? 'Price is not a valid number' : error;
        if (error) {
            alert(error);
        } else {
            let product = values;
            let cat = category.categoryName;
            product.image = image ? image : props.product.image;
            product.price = price;
            product.ingredients = ingredients;

            let productType = props.productType;
            if (productType === "NotOnMenu") {
                productType = props.product.productType;
            }
            if (props.productType === "Food") {
                product.category = props.foodCategories.find(
                    (element) => element.categoryName === cat
                );
            } else {
                product.category = props.drinkCategories.find(
                    (element) => element.categoryName === cat
                );
            }
            fetch(`/api/${productType}/${props.product.id}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            }).catch(console.log);

            alert("Your changes have been saved");
            setOpen(false);
        }
    };

    const renderSelect = (type) => {
        let categories = [];
        if (type === "Food") {
            categories = props.foodCategories;
        } else {
            categories = props.drinkCategories;
        }
        return categories.map((currentCategory) => (
            <MenuItem key={currentCategory.categoryName} value={currentCategory.categoryName} >
                {currentCategory.categoryName}
            </MenuItem>
        ));
    };

    const addIngredient = (newIngredient) => {
        let ingredientsEdit = ingredients;
        let ingredient = {
            amount: 0,
            ingredient: newIngredient,
        }
        let newEntry = {
            ingredient: { ingredientId: newIngredient.ingredientId },
            amount: 0
        }
        if (props.productType === 'Food') {
            newEntry.food = { id: props.product.id };
        }
        else {
            newEntry.drink = { id: props.product.id };
        }

        fetch(`/api/Ingredient${props.productType}`, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        }).then((res) => res.json())
            .then((data) => {
                if (props.productType === 'Food') {
                    ingredient.ingredientFoodId = data.ingredientFoodId;
                }
                else {
                    ingredient.ingredientDrinkId = data.ingredientDrinkId;
                }
            })
            .catch(console.log);

        ingredientsEdit.push(ingredient);
        setIngredients(ingredientsEdit);
        setShow(false);

        alert('Ingredient added');
    }

    const deleteIngredient = (id) => {
        fetch(`/api/Ingredient${props.productType}/${id}`, {
            method: "DELETE",
            mode: "cors",
        }).catch(console.log);

        let ingredientsEdit = [];
        if (props.productType === 'Food') {
            ingredients.map(currentIngredient => {
                if (currentIngredient.ingredientFoodId !== id) {
                    ingredientsEdit.push(currentIngredient);
                }
                return true;
            });
            setIngredients(ingredientsEdit);
        }
        else {
            ingredients.map(currentIngredient => {
                if (currentIngredient.ingredientDrinkId !== id) {
                    ingredientsEdit.push(currentIngredient);
                }
                return true;
            });
            setIngredients(ingredientsEdit);
        }

        alert('Ingredient deleted');
    }

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", `${props.productType}Images`);
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/drb2yh2dy/image/upload", { method: "POST", body: data, });
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false);
    };

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="product-title"
            >
                <DialogTitle id="product-title">
                    Id: {props.product.id}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit this product's details
                      </DialogContentText>
                    <CardMedia
                        style={{ height: 400 }}
                        component="img"
                        height="250"
                        src={props.product.image}
                        alt={`Image for ${props.product.title} Not Found`}
                        title={props.product.title}
                    />
                    {props.product.title ? (
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                            <TextField
                                label="Title"
                                value={values.title}
                                onChange={handleChange("title")}
                            />
                        </FormControl>
                    ) : null}
                    {props.product.description ? (
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                            <TextField
                                label="Description"
                                value={values.description}
                                onChange={handleChange("description")}
                                multiline
                            />
                        </FormControl>
                    ) : null}

                    {ingredients.length ? ingredients.map((currentIngredient, id) => (
                        <form key={id} className={clsx(classes.margin, classes.withoutLabel)} >
                            <TextField
                                key={id + ingredients.length}
                                className={classes.ingredients}
                                label="Ingredient"
                                value={currentIngredient.ingredient ? currentIngredient.ingredient.ingredientTitle : ''}
                                multiline
                            />
                            <TextField
                                key={id + ingredients.length + 1}
                                className={classes.ingredients}
                                label={currentIngredient ? `${currentIngredient.ingredient.unit === 'g' ? 'Grams' : 'Milliliters'} needed` : ''}
                                value={currentIngredient ? currentIngredient.amount : ''}
                                onChange={currentIngredient.ingredient ? handleIngredientsAmountChange(currentIngredient.ingredient.ingredientId) : null}
                                multiline
                            />
                            <div key={id + ingredients.length + 2} className={classes.button}>
                                <IconButton
                                    size='small'
                                    key={id + ingredients.length + 3}
                                    onClick={() => deleteIngredient(props.productType === 'Food' ? currentIngredient.ingredientFoodId : currentIngredient.ingredientDrinkId)}
                                >
                                    <RemoveIcon key={id + ingredients.length + 4} />
                                </IconButton>
                            </div>
                        </form>
                    )) : null}

                    <div className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        {show ? (
                            <div>
                                <span>
                                    Search:
                                </span>
                            </div>
                        ) : (
                                <span>Add ingredients:</span>)}
                        <div style={{ float: 'right' }}>
                            <IconButton
                                size='small'
                                onClick={handleShow}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>

                    {show ? (<div>
                        {props.ingredients.map((currentIngredient, index) => {
                            let found = false;
                            ingredients.map(ingredient => {
                                if (ingredient.ingredient.ingredientTitle === currentIngredient.ingredientTitle) {
                                    found = true;
                                }
                                return true;
                            })
                            if (!found) {
                                return < Button key={index} onClick={() => addIngredient(currentIngredient)}>
                                    {currentIngredient.ingredientTitle}
                                </Button>
                            }
                            return true;
                        })}
                    </div>) : null}

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                        <Select
                            id="select-food-category"
                            value={category.categoryName}
                            onChange={handleCategoryChange("categoryName")}
                        >
                            {renderSelect(props.productType)}
                        </Select>
                    </FormControl>
                    {props.product.price ? (
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                            <TextField
                                label="Price"
                                value={values.price}
                                onChange={handleChange("price")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            €
                                        </InputAdornment>
                                    ),
                                }}
                                style={{ display: "inline-block", width: "6ch" }}
                            />
                        </FormControl>
                    ) : null}
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                        <input
                            type="file"
                            name="file"
                            placeholder="Upload a file"
                            onChange={uploadImage}
                        />
                    </FormControl>
                    {loading ? (
                        <DialogContentText>Loading...</DialogContentText>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button
                        size="large"
                        color="primary"
                        target="_blank"
                        onClick={saveProduct}
                        disabled={loading}
                    >
                        <SaveIcon /> Save
                      </Button>
                    <IconButton
                        aria-label="close"
                        color="primary"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div >
    );
};
export default ProductEdit;
