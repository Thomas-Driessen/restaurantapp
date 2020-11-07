import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  },
  blur: {
    filter: "blur(1px)",
    transition: "filter .1s",
    '&:hover': {filter:"blur(0px)"}
  }
}));

const Product = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [del, setDelete] = React.useState(false);
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
      
      const handleDeleteOpen = () => {
        setDelete(true);
      };
        
      const handleDeleteClose = () => {
        setDelete(false);
      };

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
        
      const deleteCategory = () => {
        fetch(`/api/category/${props.categoryType}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(props.category)
          }).then(response => response.json())
        }
    
    return(
        <div>
            { props.category ? (
                <div>
                    <Card >
                        <CardMedia style={{height: 400}}
                            component="img"
                            height="250"
                            src={props.category.image}
                            alt={`Image for ${props.category.categoryName} Not Found`}
                            title={props.category.categoryName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.category.categoryName}
                            </Typography>
                        </CardContent>
                            <CardActions>
                              <Grid
                                container
                                alignItems="flex-start"
                                justify="flex-end"
                                direction="row"
                              >
                              <div style={{ display: "flex", alignItems: "right" }}>
                                <Button
                                  size="large"
                                  color="primary"
                                  target="_blank"
                                  onClick={handleClickOpen}
                                >
                                  <span style={{ fontWeight: "bold" }}>Edit</span>
                                </Button>
                                <Button
                                size="large"
                                color="primary"
                                target="_blank"
                                onClick={handleDeleteOpen}
                              >
                                <span style={{ fontWeight: "bold" }}>Delete</span>
                              </Button>
                        
                        {/* Delete pop up */}
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
                        {/* Delete pop up */}

                        {/* Update pop up */}
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
                        </Grid>
                      </CardActions>
                    </Card>
                  </div>
            ) : null}
        </div>
    )
}
export default Product