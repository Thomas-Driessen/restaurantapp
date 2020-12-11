import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from "@material-ui/core";

const Product = (props) => {
    const [del, setDelete] = React.useState(false);
    const [backToMenu, setBackToMenu] = React.useState(false);

    const handleDeleteOpen = () => {
        setDelete(true);
    };

    const handleDeleteClose = () => {
        setDelete(false);
    };

    const handleBackToMenuOpen = () => {
        setBackToMenu(true);
    };

    const handleBackToMenuClose = () => {
        setBackToMenu(false);
    };

    const setItemOnMenu = (isOnMenu) => {
        let newProduct = props.product;
        let productType = isOnMenu === 1 ? props.productType : props.product.productType;
        newProduct.onMenu = isOnMenu;
        fetch(`${process.env.REACT_APP_API_URL}/api/${productType}/${newProduct.id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        }).catch(console.log);

        alert("Your changes have been saved");
        if (isOnMenu === true) {
            setBackToMenu(false);
        }
        else {
            setDelete(false);
        }
        window.location.reload(false);
    };

    return (
        <div>
            {props.product.onMenu ? (
                <IconButton
                    size="medium"
                    color="primary"
                    onClick={handleDeleteOpen}
                >
                    <RemoveIcon />
                </IconButton>
            ) : <Button
                size="large"
                color="primary"
                target="_blank"
                onClick={handleBackToMenuOpen}
            >
                    <span style={{ fontWeight: "bold" }}>Back to menu</span>
                </Button>}

            <Dialog
                open={backToMenu}
                onClose={handleBackToMenuClose}
                aria-labelledby="product-title"
            >
                <DialogTitle id="product-title">
                    {props.product.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to bring this product back to the menu?
                      </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={() => setItemOnMenu(true)}
                    >
                        Yes
                      </Button>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={handleBackToMenuClose}
                    >
                        No
                      </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={del}
                onClose={handleDeleteClose}
                aria-labelledby="product-title"
            >
                <DialogTitle id="product-title">
                    {props.product.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product?
                      </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={() => setItemOnMenu(false)}
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
