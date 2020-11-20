import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
        width: "60ch",
    }
}));

const ProductEdit = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({ ...props.ingredient });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    React.useEffect(() => {
        setValues(props.ingredient);
    }, [props.ingredient]);

    const saveProduct = () => {
        let error = '';
        let price = parseFloat(values.price);
        let quantity = parseFloat(values.ingredientQuantity);
        error = isNaN(price) ? 'Price is not a valid number' : error;
        error = isNaN(quantity) ? 'Quantity is not a valid number' : error;
        if (error) {
            alert(error);
        } else {
            let ingredient = values;
            ingredient.price = price;
            ingredient.ingredientQuantity = quantity;

            fetch(`/api/Ingredient/${props.ingredient.ingredientId}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ingredient),
            }).catch(console.log);

            alert("Your changes have been saved");
            setOpen(false);
        }
    };

    return (
        <div>
            <IconButton
                aria-label="edit"
                color="primary"
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ingredient-title"
            >
                <DialogTitle id="ingredient-title">
                    Id: {props.ingredient.ingredientId}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit this ingredient's details
                      </DialogContentText>
                    {props.ingredient.ingredientTitle ? (
                        <FormControl
                            className={clsx(
                                classes.margin,
                                classes.withoutLabel,
                                classes.textField
                            )}
                        >
                            <TextField
                                label="Title"
                                value={values.ingredientTitle}
                                onChange={handleChange("ingredientTitle")}
                            />
                        </FormControl>
                    ) : null}

                    {props.ingredient.ingredientQuantity ? (
                        <FormControl
                            className={clsx(
                                classes.margin,
                                classes.withoutLabel,
                                classes.textField
                            )}
                        >
                            <TextField
                                label="Quantity"
                                value={values.ingredientQuantity}
                                onChange={handleChange("ingredientQuantity")}
                                multiline
                            />
                        </FormControl>
                    ) : null}

                    {props.ingredient.price ? (
                        <FormControl
                            className={clsx(
                                classes.margin,
                                classes.withoutLabel,
                                classes.textField
                            )}
                        >
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
                </DialogContent>
                <DialogActions>
                    <Button
                        size="large"
                        color="primary"
                        target="_blank"
                        onClick={saveProduct}
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
