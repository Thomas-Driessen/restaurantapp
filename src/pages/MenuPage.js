import React from 'react';
import NavBar from '../components/NavBar';
import SortBar from '../components/SortBar'
import ProductsList from '../components/ProductsList';

const MenuPage = () => {
    return(
        <div>
            <NavBar />
            <SortBar />
            <ProductsList />
        </div>
    )
}
export default MenuPage