import React from 'react';
import NavBar from '../components/NavBar';
import SortBar from '../components/SortBar'
import ProductsList from '../components/ProductsList';

class MenuPage extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
    componentDidMount() {
      fetch('/api/food')
      .then(res => res.json())
      .then((data) => {
        this.setState({ products: data })
      })
      .catch(console.log)
    }
    render(){
    return(
        <div>
            <NavBar />
            <SortBar />
            <ProductsList products={this.state.products} />
            
        </div>
    )
  }
}
export default MenuPage