import React from "react";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete'

const useStyles = makeStyles(() => ({
  blur: {
    filter: "grayscale(80%)",
    transition: "filter .1s",
    '&:hover': { filter: "grayscale(0%)" }
  }
}));

const Product = (props) => {
  const classes = useStyles();

  function renderIngredients() {
    let ingredients = [];
    props.product.ingredients.map(currentIngredient => (
      ingredients.push(currentIngredient.ingredient.ingredientTitle)
    ));

    return ingredients.toString();
  }

  return (
    <div>
      {props.product ? (
        <div>
          <Card className={clsx({ [classes.blur]: !props.product.onMenu })}>
            <CardMedia
              style={{ height: 400 }}
              component="img"
              height="250"
              src={props.product.image}
              alt={`Image for ${props.product.title} Not Found`}
              title={props.product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="inherit" component="h2">
                {props.product.title}{" "}
                <span style={{ float: "right", color: "green" }}>
                  {props.product.price}€
                </span>
              </Typography>
              <Typography component="h6">
                {renderIngredients()}
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
                  <ProductEdit
                    product={props.product}
                    foodCategories={props.foodCategories}
                    drinkCategories={props.drinkCategories}
                    productType={props.productType}
                    ingredients={props.ingredients}
                  />
                  <ProductDelete
                    product={props.product}
                  />
                </div>
              </Grid>
            </CardActions>
          </Card>
        </div>
      ) : null}
    </div>
  );
};
export default Product;
