import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
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

const Product = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ ...props.category });
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setValues(props.category);
  }, [props.category]);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", `Categories`);
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drb2yh2dy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    setImage(file.secure_url);

    setLoading(false);
  };

  const editCategory = () => {
    let category = values;
    category.image = image ? image : category.image;

    fetch(`/api/category/${props.categoryType}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).catch(console.log);

    alert("Your changes have been saved");
    setOpen(false);
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

      <Dialog open={open} onClose={handleClose} aria-labelledby="product-title">
        <DialogTitle id="product-title">
          {props.category.categoryName}
        </DialogTitle>
        <DialogContent>
          <CardMedia
            style={{ height: 400 }}
            component="img"
            height="250"
            src={props.category.image}
            alt={`Image for ${props.category.categoryName} Not Found`}
            title={props.category.categoryName}
          />
          {props.category.categoryName ? (
            <FormControl
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
            >
              <TextField label="Title" value={values.categoryName} onChange={handleChange("categoryName")} />
            </FormControl>
          ) : null}
          <FormControl
            className={clsx(
              classes.margin,
              classes.withoutLabel,
              classes.textField
            )}
          >
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
            onClick={editCategory}
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
  )
}
export default Product