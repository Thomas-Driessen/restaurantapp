import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button, makeStyles } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(
  (theme) => ({
    buttonPressed: {
      background: theme.palette.primary.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  }),
  { withTheme: true }
);

const SortBar = (props) => {
  const classes = useStyles();
      return (
    <div>
      <AppBar position="static" color="transparent">
        <Container disableGutters>
          <ButtonGroup
            fullWidth
            variant="text"
            size="large"
            color="primary"
            aria-label="text primary button group"
          >
            <Button
              onClick={props.showFoods}
              className={
                props.productType === "Food" ? classes.buttonPressed : ""
              }
            >
              Food
            </Button>
            <Button
              onClick={props.showDrinks}
              className={
                props.productType === "Drink" ? classes.buttonPressed : ""
              }
            >
              Drinks
            </Button>
          </ButtonGroup>
        </Container>
      </AppBar>
    </div>
  );
};

export default SortBar;
