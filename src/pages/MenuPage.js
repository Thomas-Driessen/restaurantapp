import React from 'react';
import NavBar from '../components/NavBar';
import SortBar from '../components/SortBar'
import ProductsList from '../components/ProductsList';

class CameraPage extends React.Component {
    constructor() {
      super();
      this.state = { products: [] };
    }

    async lockTable() {
        var reserVation = {"table": {
            "Id": localStorage.getItem("tableId")
            }}

        await fetch('/api/reservation', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reserVation)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('The table not found or already reserved.')
                //return Promise.reject(response);
            }
        }).then((responseJson) => {
            // Do something with the response
            console.log("Success: " + responseJson.json())
            alert("The table has been locked.");
        }).catch((error) => {
            console.log(error)
            alert(error);
        });
    }

    componentDidMount() {
      fetch('/api/food')
      .then(res => res.json())
      .then((data) => {
        this.setState({ products: data })
      })
      .catch(console.log);

      var tableInStorage = localStorage.getItem("tableId");

      if (tableInStorage != null)
      {
          console.log(tableInStorage);
          renderReserveTableButton();
      }
    }

    render(){
        return(
            <div>
                <NavBar />
                <SortBar />
                <ProductsList products={this.state.products} />
                <button onClick={this.lockTable}>  Lock the table?
                </button>
            </div>
        )
    }
}
export default CameraPage
