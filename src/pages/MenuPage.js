import React from 'react';
import NavBar from '../components/Navigation bars/NavBar';
import SortBar from '../components/Navigation bars/SortBar'
import ProductsList from '../components/Product List/ProductsList';

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = { foods: [],
      drinks: [],
      mostLikedFoods: [],
      shownProducts: [],
      productType: "Food"
    };
  }
  componentDidMount() {
    fetch(`/api/food`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ foods: data })
    })
    .catch(console.log)

    fetch(`/api/drink`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ drinks: data })
    })
    .catch(console.log)
  }
  showFoods = (e) => {
    e.preventDefault();
    this.setState({shownProducts: this.state.foods});
  }
  showDrinks = (e) => {
    e.preventDefault();
    this.setState({shownProducts: this.state.drinks});
  }
  render(){
  return(
      <div>
          <NavBar page = "Menu"/>
          <SortBar showFoods = {this.showFoods} showDrinks = {this.showDrinks}/>
          { this.state.shownProducts !== [] ? (
            <ProductsList products={this.state.shownProducts} />
          ) : (
            <p>Choose between Foods, Drinks and Most Liked to see our products</p>
            )}
      </div>
  )}
}
export default MenuPage