import React from "react";
import NavBar from "../components/Navigation bars/NavBar";
import PreviousOrders from "../components/Previous Orders List/PreviousOrders";
import CurrentOrder from "../components/Current Order/CurrentOrder";
import Grid from "@material-ui/core/Grid";
import currentFoodList from "../components/Current Order/CurrentFoodList";
import currentDrinkList from "../components/Current Order/CurrentDrinkList";
import PayForOrders from "../components/Current Order/PayForOrders";

class ViewOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      tableNumber: 1,
      previousDrinks: [],
      previousFoods: [],
      pricePreviousDrinks: 0,
      pricePreviousFoods: 0,
      priceCurrentDrinks: 0,
      priceCurrentFoods: 0,
      tableId: sessionStorage.getItem("tableId"),
    };
  }

  async componentDidMount() {
    document.title = "My Order | " + this.props.name;
    let mounted = true;
    let sum = 0;
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/table/tableNumber/${this.state.tableId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          this.setState({ tableNumber: data.tableNumber });
        }
      })
      .catch(console.log);
    
      this.updatePreviousOrders(mounted);

    sum = currentDrinkList.reduce(
      (totalPrice, drink) => totalPrice + drink.price,
      0
    );
    this.setState({ priceCurrentDrinks: sum });
    sum = currentFoodList.reduce(
      (totalPrice, food) => totalPrice + food.price,
      0
    );
    this.setState({ priceCurrentFoods: sum });

    return () => (mounted = false);
  }

  countIdsInArray(id, array) {
    let count = 0;
    array.forEach((element) => {
      if (element.id === id) {
        count++;
      }
    });
    return count;
  }

  removeFood = (product) => {
    let index = currentFoodList.indexOf(product);
    this.setState({
      priceCurrentFoods:
        this.state.priceCurrentFoods - currentFoodList[index].price,
    });
    currentFoodList.splice(index, 1);
    sessionStorage.setItem("currentFoodList", JSON.stringify(currentFoodList));
  };

  removeDrink = (product) => {
    let index = currentDrinkList.indexOf(product);
    this.setState({
      priceCurrentDrinks:
        this.state.priceCurrentDrinks - currentDrinkList[index].price,
    });
    currentDrinkList.splice(index, 1);
    sessionStorage.setItem(
      "currentDrinkList",
      JSON.stringify(currentDrinkList)
    );
  };

  sendOrder() {
    this.postOrder();
    this.updatePreviousOrders(true);
  }

  arrayContainsFoodOrDrink() {}

  updatePreviousOrders(mounted) {
    let sum = 0;
    fetch(
      `${process.env.REACT_APP_API_URL}/api/orderdrink/${this.state.tableNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data) {
          sum = data.reduce(
            (totalPrice, product) => totalPrice + product.price,
            0
          );
          let prevUniqueDrinks = [];
          data.forEach((element) => {
            if (this.countIdsInArray(element.id, prevUniqueDrinks) === 0) {
              let count = this.countIdsInArray(element.id, data);
              element.count = count;
              prevUniqueDrinks.push(element);
            }
          });
          this.setState({ pricePreviousDrinks: sum });
          this.setState({ previousDrinks: prevUniqueDrinks });        }
      })
      .catch(console.log);

    fetch(
      `${process.env.REACT_APP_API_URL}/api/orderfood/${this.state.tableNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data) {
          sum = data.reduce(
            (totalPrice, product) => totalPrice + product.price,
            0
          );
          let prevUniqueFoods = [];
          data.forEach((element) => {
            if (this.countIdsInArray(element.id, prevUniqueFoods) === 0) {
              let count = this.countIdsInArray(element.id, data);
              element.count = count;
              prevUniqueFoods.push(element);
            }
          });
          this.setState({ pricePreviousFoods: sum });
          this.setState({ previousFoods: prevUniqueFoods });
        }
      })
      .catch(console.log);
  }

  postOrder() {
    let order = [];
    currentDrinkList.map((currentDrink) => {
      var drink = {
        tableId: this.state.tableNumber,
        paid: false,
        drink: {
          id: currentDrink.id
        }
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/orderdrink`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drink),
      });
      let item = {
        title: currentDrink.title,
      };
      order.push(item);
      return "Succes";
    });

    currentFoodList.map((currentFood) => {
      var food = {
        tableId: this.state.tableNumber,
        paid: false,
        food: {
          id: currentFood.id
        }
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/orderfood`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
      });
      let item = {
        title: currentFood.title,
      };
      order.push(item);
      return "Succes";
    });

    currentDrinkList.splice(0, currentDrinkList.length);
    currentFoodList.splice(0, currentFoodList.length);
    sessionStorage.removeItem("currentDrinkList");
    sessionStorage.removeItem("currentFoodList");
    this.setState({ priceCurrentDrinks: 0 });
    this.setState({ priceCurrentFoods: 0 });

    fetch(`${process.env.REACT_APP_API_URL}/sendorder`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  }

  render() {
    return (
      <div>
        <NavBar pageName="order" />
        <Grid container spacing={0} style={{ padding: 15 }}>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <PayForOrders
              priceCurrentDrinks={this.state.priceCurrentDrinks}
              priceCurrentFoods={this.state.priceCurrentFoods}
              pricePreviousDrinks={this.state.pricePreviousDrinks}
              pricePreviousFoods={this.state.pricePreviousFoods}
              tableId={this.state.tableId}
            />
            <CurrentOrder
              totalPrice={
                this.state.priceCurrentDrinks + this.state.priceCurrentFoods
              }
              sendOrder={() => this.sendOrder()}
              removeDrink={this.removeDrink}
              removeFood={this.removeFood}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <PreviousOrders
              totalPrice={
                this.state.pricePreviousDrinks + this.state.pricePreviousFoods
              }
              previousFoods={this.state.previousFoods}
              previousDrinks={this.state.previousDrinks}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default ViewOrder;
