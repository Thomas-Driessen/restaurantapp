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
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

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
        data.append("upload_preset", `CatImages`);
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
                                <Grid container direction="row" justify="center" alignItems="center">
                                <Button size="large" color="primary" target="_blank" onClick={handleClickOpen}>
                                        <span style={{ fontWeight: "bold" }}>Edit</span>
                                    </Button>
                                    <Button size="large" color="primary" target="_blank" onClick={handleDeleteOpen} >
                                        <span style={{ fontWeight: "bold" }}>Delete</span>
                                    </Button>
                                </Grid>
                        </CardActions>
                        
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
                                <Button size="medium" color="primary">
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
                                <DialogContentText>
                                <CardMedia
                                        style={{ height: 400 }}
                                        component="img"
                                        height="250"
                                        src={props.category.image}
                                        alt={`Image for ${props.category.categoryName} Not Found`}
                                        title={props.category.categoryName}
                                    />
                                    <FormControl>
                                        {props.category.categoryName ? (
                                            <FormControl>
                                            <TextField label="Title" value={values.categoryName} onChange={handleChange("categoryName")} />
                                            </FormControl>
                                        ) : null}
                                            <FormControl>
                                            <input
                                                type="file"
                                                name="file"
                                                placeholder="Upload a file"
                                                onChange={uploadImage}
                                                />
                                            </FormControl>
                                    </FormControl>
                                    
                                        {loading ? (
                                            <DialogContentText>Loading...</DialogContentText>
                                        ) : null}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button size="medium" color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        
                    </Card>
                </div>
            ) : null}
        </div>
    )
}
export default Product