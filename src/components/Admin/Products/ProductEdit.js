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

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: "50ch",
    }
}));

const ProductEdit = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({ ...props.product });
    const [ingredients, setIngredients] = React.useState(() => {
        const initialState = renderIngredients();
        return initialState;
    });
    const [category, setCategory] = React.useState({ ...props.product.category });
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleIngredientsChange = () => (event) => {
        setIngredients(event.target.value);
    };

    const handleCategoryChange = (prop) => (event) => {
        setCategory({ ...category, [prop]: event.target.value });
    };

    React.useEffect(() => {
        setValues(props.product);
        setCategory(props.product.category);
    }, [props.product]);

    const saveProduct = () => {
        let error = '';
        let price = parseFloat(values.price);
        let newIngredients = ingredients.split(',');
        console.log(props.ingredients);
        newIngredients.map(currentIngredient => (
            error = !props.ingredients.some(e => e.ingredientTitle === currentIngredient) ? `Ingredient ${currentIngredient} does not exist` : error
        ));
        error = isNaN(price) ? 'Price is not a valid number' : error;
        if (error) {
            alert(error);
        } else {
            let product = values;
            let cat = category.categoryName;
            product.image = image ? image : props.product.image;
            product.price = price;

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

    function renderIngredients() {
        let ingredients = [];
        props.product.ingredients.map(currentIngredient => (
            ingredients.push(currentIngredient.ingredient.ingredientTitle)
        ));

        return ingredients.toString();
    }

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

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} >
                        <TextField
                            label="Ingredients"
                            value={ingredients ? ingredients : ""}
                            onChange={handleIngredientsChange()}
                            multiline
                        />
                    </FormControl>

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
        </div>
    );
};
export default ProductEdit;
