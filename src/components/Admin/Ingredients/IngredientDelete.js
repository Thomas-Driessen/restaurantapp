import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from "@material-ui/core";

const Product = (props) => {
    const [del, setDelete] = React.useState(false);

    const handleDeleteOpen = () => {
        setDelete(true);
    };

    const handleDeleteClose = () => {
        setDelete(false);
    };

    const deleteIngredient = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/Ingredient/${props.ingredient.ingredientId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props.ingredient),
        }).catch(console.log);

        alert("Your changes have been saved");
        setDelete(false);
        window.location.reload(false);
    };

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                onClick={handleDeleteOpen}
            >
                <CloseIcon />
            </IconButton>

            <Dialog
                open={del}
                onClose={handleDeleteClose}
                aria-labelledby="ingredient-title"
            >
                <DialogTitle id="ingredient-title">
                    {props.ingredient.ingredientTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this ingredient?
                      </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={deleteIngredient}
                    >
                        Yes
                      </Button>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={handleDeleteClose}
                    >
                        No
                      </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default Product;
