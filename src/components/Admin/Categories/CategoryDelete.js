import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

const Product = (props) => {
  const [del, setDelete] = React.useState(false);

  const handleDeleteOpen = () => {
    setDelete(true);
  };

  const handleDeleteClose = () => {
    setDelete(false);
  };

  const deleteCategory = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/category/${props.categoryType}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.category)
    }).then(response => response.json())
    alert("Your category has been deleted");
    setDelete(false);
  }

  return (
    <div>
      <IconButton
        size="medium"
        color="primary"
        onClick={handleDeleteOpen}
      >
        <RemoveIcon />
      </IconButton>

      <Dialog open={del} onClose={handleDeleteClose} aria-labelledby="product-title">
        <DialogTitle id="product-title">
          {props.category.categoryName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="medium" color="primary" onClick={deleteCategory}>
            Yes
          </Button>
          <Button size="medium" color="primary" onClick={handleDeleteClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Product