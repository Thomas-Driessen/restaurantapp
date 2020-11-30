import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";


class AddCategoryButton extends React.Component {
    constructor() {
        super();

        this.state = {
            openAddCategory: false,
            loading: false,
            newCategory: {
                type: "",
                categoryName: "",
                image: "",
            },
            style: {
                width: "40ch",
                display: "flex",
                flexWrap: "wrap",
                padding: "5px",
            },
        }
    }

    handleCategoryAddOpen = () => {
        this.setState({ openAddCategory: true });
    };

    handleCategoryAddClose = () => {
        this.setState({ openAddCategory: false });
    };

    uploadCategoryImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", `Categories`);
        this.setState({ loading: true });

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/drb2yh2dy/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const file = await res.json();

        this.setState({
            newCategory: {
                ...this.state.newCategory,
                image: file.secure_url,
            },
        });
        this.setState({ loading: false });
    };

    handleNewCategoryChange = () => (event) => {
        const { name, value } = event.target;
        this.setState({
            newCategory: {
                ...this.state.newCategory,
                [name]: value,
                type:
                    name === "type"
                        ? value
                        : this.state.newCategory.type,
            },
        });
    };

    saveCategory = () => {
        fetch(`https://cors-anywhere.herokuapp.com/http://s3-restaurant-api.herokuapp.com/api/category/${this.state.newCategory.type}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.newCategory)
        }).catch(console.log);

        alert("Your changes have been saved");
        this.setState({ openAddCategory: false });
    };

    render() {
        return (
            <div>
                <Button variant="text" size="large" color="inherit" onClick={this.handleCategoryAddOpen} >
                    Add Category
                </Button>
                <Dialog open={this.state.openAddCategory} onClose={this.handleCategoryAddClose} aria-labelledby="product-title" >
                    <DialogTitle id="product-title">
                        Add a new category
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You want to add a new category, huh?
                      </DialogContentText>

                        <FormControl style={this.state.style}>
                            <TextField label="Category name" name="categoryName" onChange={this.handleNewCategoryChange("categoryName")} />
                        </FormControl>

                        <FormControl style={this.state.style}>
                            <Select id="select-type" name="type" value={this.state.newCategory.type} onChange={this.handleNewCategoryChange("type")} >
                                <MenuItem value="food">Food Category</MenuItem>
                                <MenuItem value="drink">Drink Category</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={this.state.style}>
                            <input type="file" name="file" placeholder="Upload a file" onChange={this.uploadCategoryImage} />
                        </FormControl>

                        {this.state.loading ? (
                            <DialogContentText>Loading...</DialogContentText>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" color="primary" target="_blank" onClick={this.saveCategory} disabled={this.state.loading} >
                            <SaveIcon /> Add new Category
                      </Button>
                        <IconButton aria-label="close" color="primary" onClick={this.handleCategoryAddClose} >
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default AddCategoryButton