import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IngredientEdit from "./IngredientEdit";
import IngredientDelete from "./IngredientDelete";

const Ingredient = (props) => {

    return (
        <div>
            {props.ingredient ? (
                <div>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="inherit" component="h2">
                                {props.ingredient.ingredientTitle}{" "}
                                <span style={{ float: "right" }}>
                                    <span style={{ color: "green" }}> {props.ingredient.price}€ </span> / 100g
                                </span>
                            </Typography>
                            <Typography component="h6">
                                Quantity: {props.ingredient.ingredientQuantity}
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
                                    <IngredientEdit
                                        ingredient={props.ingredient}
                                    />
                                    <IngredientDelete
                                        ingredient={props.ingredient}
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
export default Ingredient;
