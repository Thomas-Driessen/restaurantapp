import React from 'react';
import NavBar from '../components/NavBar';
import SortBar from '../components/SortBar'
import ProductsList from '../components/ProductsList';

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
          <NavBar />
          <SortBar showFoods = {this.showFoods} showDrinks = {this.showDrinks}/>
          <ProductsList products={this.state.shownProducts} />
      </div>
  )}
}
export default MenuPage